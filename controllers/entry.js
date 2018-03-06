'use strict';
var _  = require('lodash');
var TableController = rootRequire('controllers/table');
var Entry = rootRequire('models/entry');
var responder = rootRequire('common/responder');
var util = rootRequire('common/util');
var constants = rootRequire('common/const');
var Category = rootRequire('models/category');
var Subcategory = rootRequire('models/subcategory');
var CompInst = rootRequire('models/compinst');
var Questionpage = rootRequire('models/questionpage');
var Entryresponse = rootRequire('models/entryresponse');
var Scoresheet = rootRequire('models/scoresheet');
var Question = rootRequire('models/question');
var db = rootRequire('common/db');
var moment = require('moment');


class EntryController extends TableController {
  constructor(){
    var entry = new Entry();
    super(entry);
  }

  createNewEntry(req, res){
    // Create an empty entry with sensible defaults and return the construct.

    if('compInstId' in req.query){

      var compInst = new CompInst();
      var compInstId = req.query.compInstId;
      var competition;
      var userId = req.user.userid;

      var search = {id: compInstId};
      var query;

      // Load the competition data

//      console.log('Creating a new entry');
//      console.log('User: '+ userId);
//      console.log('CompInstId: '+compInstId);

      var now=new Date();
      var entryCloseDate;
      var specialAccess=false;
      var categoryId;
      var subcategoryId;
      var entryNum;
      var entryId;

      return compInst.find(search)
      .then((result)=>{
        if(result.length==0){
          throw(1);
        }
        competition=result[0];
        //look for any special access conditions...

        query="SELECT * from `compauth` WHERE userId='"+userId+
              "' AND compInstId='"+compInstId+"';";
        return db.query(query);
      })
      .then((result)=>{
        var rightsRequired = constants.Permission.entryMod;


        if((result[0].length>0)&&(result[0][0].level & rightsRequired)){
          specialAccess=true;
        }

        // Check the entry Date
        entryCloseDate=new Date(competition.entryCloseDate);

        if((now > entryCloseDate)&(!specialAccess)){
          throw(2);
        }
        // Create a new entry for this competition.
        query="UPDATE compinst SET entries=last_insert_id(entries+1) where id = '"+compInstId+"';";
        return db.query(query)
      })
      .then((result)=>{
        entryNum = result[0].insertId;
        // Now load a default category and subcategory.
        query = "SELECT * FROM category WHERE compInstId='"+compInstId+"' ORDER BY `displayOrder`;";
        return db.query(query);
      })
      .then((result)=>{
        if(result[0][0].length ==0){
          throw 3;
        }
        categoryId = result[0][0].id;
//        console.log('CAtId: '+categoryId);
        query = "SELECT * FROM subcategory WHERE compInstId='"+compInstId+"' AND `categoryId`='"+categoryId+"' ORDER BY `subcategoryOrder`;";
        return db.query(query);
      })
      .then((result)=>{
        subcategoryId = result[0][0].id;

        query = "SELECT * FROM flight WHERE `categoryId`='"+categoryId+"' LIMIT 1;";
        return db.query(query);
      })
      .then((result)=> {
        var flightId = result[0][0].id;

        query = "INSERT INTO `entry` (compInstId, entryNumber, paymentPending, paid,"+
                " entryDate, entryType,entrantId, cancelled, categoryId, subcategoryId, flightId) "+
                " VALUES ( '"+compInstId+"','"+entryNum+"','0','0','"+
                moment(new Date()).format('YYYY-MM-DD HH:mm:ss')+"','0','"+userId+"','0', '"+categoryId+"', '"+subcategoryId+"', '"+flightId+"')";
        return db.query(query);
      })
      .then((result)=>{
        entryId=result[0].insertId;
        req.params.id=entryId;
        // Now create default responses for all the questions


        query = "SELECT * from question where `compInstId`='"+compInstId+"';";
        return db.query(query);
      })
      .then((result)=>{
//        console.log(result[0]);
        var promises=[];

        for(var i=0;i<result[0].length;i++){
          query = "INSERT INTO `entryresponse` (compInstId, entryId, questionId, response) "+
                  "VALUES ('"+compInstId+"', '"+entryId+"', '"+result[0][i].id+"', '"+result[0][i].defaultValue+"');";
//          console.log(query);
          promises.push(db.query(query));
        }
        return Promise.all(promises);
      })
      .then((result)=>{
        return this.findOne(req, res);
      })
      .catch((err)=>{
        if(err==1){
          responder.httpRespond(res, {code:responder.COMPETITION_NOT_FOUND});
        }
        if(err==2){
          responder.httpRespond(res, {code:responder.COMPETITION_CLOSED});
        }
        console.log(err);

      })
    } else {
        responder.httpRespond(res, {code:responder.COMPETITION_NOT_FOUND});
    }
  }

  findOne(req, res){
    //TODO: Authorise

    var search = {id: req.params.id};
    var entry;
    var qPages;
    var questions = new Question();
    var responses = new Entryresponse();
    var allQuestions;
    var allResponses;
    var questionpages;

    return this.proto.findOne(search)
    .then((result)=>{
      entry = result;
      entry.questionpages = [];
      // Now grab the questions and responses associated with this entry
      questionpages = new Questionpage();
      return questionpages.find({compInstId: entry.compInstId})
    })
    .then((result)=>{
      for(var i=0;i<result.length;i++){
          entry.questionpages.push(result[i].id);
      }

      // Now find the responses

      return responses.find({entryId: entry.id});
    })
    .then((result)=>{
      entry.entryresponses=[];
      for(var i=0;i<result.length;i++){
        entry.entryresponses.push(result[i].id);
      }

      var responseData={};
      responseData['entries'] = [entry];
      responder.httpRespond(res, {code: responder.OK, detail: responseData});
    })
    .catch((err)=>{
      console.log(err);
      responder.httpRespond(res, {code: responder.DB_ERR, detail:[err]});
    })

  }

  find(req, res){

    // Ok. If the create field is present in the query, then this is actually a request to create an entry,
    // so get the create method to handle this.

    var search=req.query;

    if('create' in req.query){
      return this.createNewEntry(req, res);
    }

    // Make sure that this is going to return either entry data that the user owns or they
    // have access to through adminidtrative rights...

    if(util.checkAuth(req, req.query.entrantId, constants.PermClass.admin &constants.PermClass.compAdmin)){
//      console.log('Authorised entry read');
    } else {
      responder.httpRespond(res, {code: responder.UNAUTHORIZED});
    }


    return this.proto.find(search)
    .then((result)=> {
      for(var i=0;i<result.length;i++){
        result[i].categories = [result[i].categoryId];
        result[i].subcategories = [result[i].subcategoryId];
      }
      var responseData={};
      responseData[this.pluralName] = result;
      responder.httpRespond(res, {code: responder.OK, detail: responseData});
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  findEntrySummary(req,res){
    if(util.checkAuth(req, req.query.entrantId, constants.PermClass.admin &constants.PermClass.compAdmin)){
    } else {
      responder.httpRespond(res, {code: responder.UNAUTHORIZED});
    }

    var entry;
    var category = new Category();
    var subcategory = new Subcategory();
    var compInst = new CompInst();
    var scoresheet = new Scoresheet();
    var scoresheets=[];

    return this.proto.findOne({id: req.params.id})
    .then((result)=>{
      entry = result;
      return category.load(entry.categoryId);
    })
    .then((result)=>{
      return compInst.findOne(entry.id);
    })
    .then((result)=>{
      return scoresheet.find({entryId: req.params.id});
    })
    .then((result)=>{
      for(var i=0;i<result.length;i++){
        scoresheets.push(result[i].id);
      }
      return subcategory.load(entry.subcategoryId);
    })
    .then(()=>{
      var entryData={
        id: entry.id,
        compInstId: entry.compInstId,
        compInstName: compInst.name,
        entryNumber: entry.entryNumber,
        categoryName: category.categoryName,
        subcategoryName: subcategory.subcategoryName,
        paid: entry.paid?'Paid':'Unpaid',
        rank: entry.rank,
        totalScore: entry.totalScore,
        scoresheets: scoresheets,
        scoreTemplate: entry.scoreTemplateId

      };
      var responseData={};
      responseData['entrysummaries'] = [entryData];
      responder.httpRespond(res, {code: responder.OK, detail: responseData});
    })
    .catch((err)=>{
      console.log(err);
      responder.httpRespond(res, {code: responder.DB_ERR,detail: {}});
    })
  }



  /*
   *
   * Find all entries for an entrant, grouped by competition
   *
   * Returns only the entrySummary
   *
   */
  findCompEntries(req, res){
    if(util.checkAuth(req, req.query.entrantId, constants.PermClass.admin &constants.PermClass.compAdmin)){
//      console.log('Authorised entry read');
    } else {
      responder.httpRespond(res, {code: responder.UNAUTHORIZED});
    }
    if(req.query.hasOwnProperty('entrantId')){

      /*
      if (!('compstate' in req.query)){
        req.query.compstate=0;
      }
      */
      var search={entrantId: req.query.entrantId};//,compstate: req.query.compstate};
  //    console.log('-----------------------------');
  //    console.log(req.query.compstate);

      var entries;
      var compInst = new CompInst();
      var compEntries={};

      return this.proto.find(search)
      .then((result)=>{
        entries=result;
        // Take the entry results, and drop them into competition containers
        //
        for(var i=0;i<entries.length;i++){
          var compInstId=entries[i].compInstId;
          if(typeof compEntries[compInstId] == 'undefined'){
            compEntries[''+compInstId+'']={
              id: compInstId,
              entrysummaries:[]};
          }
          compEntries[''+compInstId+''].entrysummaries.push(entries[i].id);
        }

        // Then create a promise to get all the compInstance data...

        var promises=[];

        for(var compId in compEntries){
          console.log('Additin promise for compId: ' + compId);
          promises.push(compInst.findOne({id:compId}));
        }
        return Promise.all(promises);
      })
      .then((result)=>{
        console.log(result);
        console.log("Result size: " + result.length);
        console.log("Result 0 is ");
        console.log(result[0]);

        var responseData={compentries:[]};
        for(var i=0;i<result.length;i++){
          var compData = {};
          console.log(i);
          console.log(result[i]);
          compData.id = result[i].id;
          compData.name=result[i].name;
          compData.scoreTemplate = result[i].scoresheetId;
          compData.entrysummaries=compEntries[''+result[i].id].entrysummaries;
          compData.categoryLabel=result[i].categoryLabel;
          compData.subcategoryLabel=result[i].subcategoryLabel;
          compData.startDate = result[i].startDate;
            //compEntries[''+result[i].id].entrysummaries=null;
          //TOTO: Filter out anything that was not asked for....
          if ('compstate' in req.query){
            if(Array.isArray(req.query.compstate)){
  //            console.log('found an array');
  //            console.log(result[i].compstate);
  //            console.log(req.query.compstate.length);
              var compstate=[];
              for(var j=0;j<req.query.compstate.length;j++){
                if(typeof req.query.compstate[j] == 'string'){
                  compstate.push(parseInt(req.query.compstate[j]));
                }
              }
  //            console.log('compstate');
  //            console.log(compstate);
              if(!_.includes(compstate, result[i].compstate)){
  //              console.log('Non Match');
                continue;
              }
            } else {
              if(result[i].compstate !== req.query.compstate){
                continue;
              }
            }
          }
          responseData.compentries.push(compData);

        }

        responder.httpRespond(res, {code: responder.OK, detail:responseData});
      })
      .catch((err)=>{
        console.log(err);
      });
    } else {
      responder.httpRespond(res, {code: responder.INVALID_PARAM});

    }

  }


}

module.exports = EntryController;
