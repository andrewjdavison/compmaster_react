'use strict';
var TableController = rootRequire('controllers/table');
var Questionpage = rootRequire('models/questionpage');
var Question = rootRequire('models/question');
var Response = rootRequire('models/entryresponse');
var responder = rootRequire('common/responder');

class QuestionpageController extends TableController {
  constructor(){
    var questionpage = new Questionpage();
    super(questionpage);
  }

  newQuestionpage(req, res){
    if('id' in req.params){
      var questionpage = new Questionpage();
      questionpage.label="New";
      questionpage.formOrder=-1;
      questionpage.catID=0;
      questionpage.compInstId=req.params.id;
      return questionpage.save()
      .then((result)=>{
        var responseData={};
        responseData['questionpages'] = [result];
        responder.httpRespond(res, {code: responder.OK, detail: responseData});
      });
    } else {
      responder.httpRespond(res, {code: responder.OK, detail: responseData});
    }
  }


  // Add the list of questions associated with a questionpage

  findOneMiddleware(req, interimResult){
    var questions = new Question();
    var promises=[];

    if(interimResult){
      interimResult.questions=[];

      return questions.find({compInstId: interimResult.compInstId, questionPage: interimResult.id}, {field:'formOrder', asc:true})
      .then((result)=>{
        for(var i=0;i<result.length;i++){
          interimResult.questions.push(result[i].id);
        }
        return interimResult;
      })

      .catch((err)=>{
        console.log('Error while Assembling Questions.');
        console.log(err);
      })

    } else {
      return interimResult;
    }
  }

  /*
   *
   * Find all the question pages that belong to an entry or a  competition
   *
   */

  findCompetitionPages(req, res){
    console.log('Getting competition question pages');
    //console.log(req.body);
    console.log(req.query);
    //console.log(req.params);
    // TODO: Check authorization

    var search;

    if('compInstId' in req.query){
      search = {compInstId: req.query.compInstId};
    } else {
      throw new Error('No compInstId specified');
    }
    //console.log(search);
    //console.log('===================');

    var allQuestions;
    var allResponses;
    var responses = new Response();
    var questions = new Question();
    var qPages=[];
    var qPage;
    return this.proto.find(search)
    .then((result)=>{
      // Now fetch all the questions that belong to the comp
      qPages=result;
      return questions.find(search);
    })
    .then((results)=>{
      allQuestions = results;
      if('entryId' in req.query){
        var search={entryId: req.query.entryId};
        var response = new Response();
        return response.find(search);
      } else {
        return null;
      }
    })
    .then((results)=>{
      console.log('Have all the responses now...');
      allResponses=results;

      // And assemble it into an ember-data format
      qPages.sort(function(a,b){
                 return a.formOrder-b.formOrder;
      });
      qPages.map(function(qpage){
        var fullQuestions = allQuestions.filter((q)=>{
          if(q.questionPage == qpage.id) return true;
        });
        fullQuestions.sort((a,b)=>{
          return a.formOrder - b.formOrder;
        });
        console.log('Questions have been filtered and sorted');
        qpage.questions=[];
        qpage.responses=[];

        // Extract the questions for this page, and then
        // grab any responses that have already been submitted.

        for(let i=0;i<fullQuestions.length;i++){
          qpage.questions.push(fullQuestions[i].id);
          if(allResponses){
            console.log('Looking for responses to question id' + fullQuestions[i].id);
            for(let j=0;j<allResponses.length;j++){
              if(allResponses[j].questionId == fullQuestions[i].id){
                qpage.responses.push(allResponses[j].id);
              }
            };
            /*
            var thisResponse = allResponses.filter((r)=>{
              console.log('================================');
              console.log(r);
              console.log('--------------------------------');
              console.log(fullQuestions[i]);
              if(r.questionId == fullQuestions[i].id) return true;
            });
            console.log(thisResponse[0]);
            qpage.responses.push(thisResponse[0].id);
            */
          }
        }
      });
      return qPages;
    })
    .then((qPages)=>{
 //     console.log('4');
      // Now load any responses if the entryId was passed in...
      if('entryId' in req.query){
        //console.log('Searching for entry responses');
      }



      return qPages;
    })
    .then((result)=>{

      var responseData={questionpages:qPages};
      responder.httpRespond(res, {code: responder.OK, detail:responseData});
    })
    .catch((err)=>{
      console.log(err);
      responder.httpRespond(res, {code: responder.DB_ERR, detail:[err]});
    });
  }

  addQuestions(midResult){
    var id=midResult.id;
    var question = new Question();

    return question.find({questionPage: id})
    .then((result)=>{
      result.sort((a,b)=>{
        return a.formOrder - b.formOrder;
      });
      midResult.questions=[];
      for(var i=0;i<result.length;i++){
        midResult.questions.push(result[i].id);
      }
      return midResult;
    })
  }

  findOne(req, res){
    super.findOne(req, res, this.addQuestions);
  }

  find(req, res){
    res.sort={field:'formOrder', asc:1};
    super.find(req, res);
  }
}

module.exports = QuestionpageController;
