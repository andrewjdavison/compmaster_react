'use strict';
var TableController = rootRequire('controllers/table');
var Scoresheet = rootRequire('models/scoresheet');
var Entry = rootRequire('models/entry');
var Flight= rootRequire('models/flight');
var Category= rootRequire('models/category');
var Subcategory= rootRequire('models/subcategory');
var Scoretemplate = rootRequire('models/scoretemplate');
var responder = rootRequire('common/responder');

class ScoresheetController extends TableController {
  constructor(){
    var scoresheet = new Scoresheet();
    super(scoresheet);
  }

  getFormIds(req, res){
    if(req.query.hasOwnProperty('compInstId')){
      var scoresheets = new Scoresheet();

      var search = {compInstId: req.query.compInstId};
      var formList=[];
      scoresheets.find(search)
      .then((results)=>{
        results.forEach((result)=>{
          console.log(result);
          formList.push({id: result.id, formId: result.scanId});
        });
        console.log(formList);
        var responseData = {};
        responseData['scoresheetformids'] =formList;
        responder.httpRespond(res, {code: responder.OK, detail:responseData});
      });
    } else {
      responder.httpRespond(res, {code:responder.INVALID_PARAM, detail:[]});
    }
  }

  getFormStats(req, res){

    if(req.query.hasOwnProperty('compInstId')){
      var scoresheets = new Scoresheet();
      var flightModel = new Flight();
      var entryModel = new Entry();
      var subcategoryModel = new Subcategory();
      var categoryModel = new Category();

      var search = {compInstId: req.query.compInstId};
      var formList=[];
      var scoresheets;
      var flights;
      var scoresheetsSubmitted=0;
      var totalSheetsMissing=0;
      var entriesMissingSheets=[];
      var entries;
      var flightJudges={};
      var entrySheetCount={};
      var categories={};
      var subcategories={};

      scoresheets.find(search)
      .then((result)=>{
        scoresheets=result;

        return flightModel.find(search);
      })
      .then((result)=>{
        flights = result;
        return entryModel.find(search);
      })
      .then((result)=>{
        entries = result;
        return categoryModel.find(search);
      })
      .then((result)=>{
        for(let i=0;i<result.length;i++){
          categories[result[i].id] = result[i].categoryName;
        }
        return subcategoryModel.find(search);
      })
      .then((result)=>{
        for(let i=0;i<result.length;i++){
          subcategories[result[i].id] = result[i].subcategoryName;
        }

        for(let i=0;i<scoresheets.length;i++){
          scoresheetsSubmitted++;
          var entryId = scoresheets[i].entryId;
          var sheetId = scoresheets[i].id;
          if(typeof entrySheetCount[entryId] ==='undefined'){
            entrySheetCount[entryId]=1;
          } else {
            entrySheetCount[entryId]++;
          }
        }

       for(let i=0;i<flights.length;i++){
          flightJudges[flights[i].id]=flights[i].judges;
       }

       for(let i=0;i<entries.length;i++){
         if(entries[i].cancelled || !entries[i].paid){
            delete entrySheetCount[entries[i]];
         } else {
           if(typeof entrySheetCount[entries[i].id] === 'undefined'){
             entrySheetCount[entries[i].id] = 0;
           }
           if(entrySheetCount[entries[i].id] < flightJudges[entries[i].flightId]){
             var sheetsMissing=flightJudges[entries[i].flightId] - entrySheetCount[entries[i].id];
             totalSheetsMissing+=sheetsMissing;
             entriesMissingSheets.push({
               id: entries[i].id,
               entryNum: entries[i].entryNumber,
               category: categories[entries[i].categoryId],
               subcategory: subcategories[entries[i].subcategoryId],
               sheetsMissing: sheetsMissing,
             });
           }
         }
       }

        var responseData = {};
        responseData['entriesMissingSheets'] =entriesMissingSheets;
        responseData['missingSheets'] = totalSheetsMissing;
        responseData['scoresheetsSubmitted'] = scoresheetsSubmitted;
        responseData['entrySheetCount'] = entrySheetCount;
        responseData['flightJudges'] = flightJudges;

        responder.httpRespond(res, {code: responder.OK, detail:responseData});
      });
    } else {
      responder.httpRespond(res, {code:responder.INVALID_PARAM, detail:[]});
    }


  }


  // Doublecheck the total

  updateTotalScore(entryId)
  {
    var scoresheet = new Scoresheet();;
    var scoresheets;
    let maxScore=0;
    let entry=new Entry();
    let scoretemplate=new Scoretemplate();
    let judges=0;

    return entry.findOne({id: entryId})
    .then((result)=>{
      let scoretemplateId=result.scoreTemplateId;
      return scoretemplate.findOne({id: scoretemplateId});
    })
    .then((result)=>{
      judges=result.judges;
      return scoresheet.find({entryId: entryId});
    })
    .then((result)=>{
      let totalScore=0;
      let finalScore=0;
      let count=0;
      for(let i=0;i<result.length;i++){
        totalScore+=result[i].total;
        count++;
      }
      entry.totalScore = totalScore/count*judges;
      return entry.save();
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  //
  // Post method needs to update the total score for this entry if it succeeds

  postMiddleware(req, interimResult){
    if(interimResult){
//      this.updateTotalScore(interimResult.entryId);
    }
    return interimResult;
  }

}

module.exports = ScoresheetController;
