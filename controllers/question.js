'use strict';
var TableController = rootRequire('controllers/table');
var Question = rootRequire('models/question');
var responder = rootRequire('common/responder');

class QuestionController extends TableController {
  constructor(){
    var question = new Question();
    super(question);
  }

  newQuestion(req, res){
    if('pageId' in req.query){
      var question = new Question();
      question.label="New Question";
      question.formOrder=-1;
      question.questionType=1;
      question.compInstId = req.query.compInstId;
      question.questionPage = req.query.pageId;
      return question.save()
      .then((result)=>{
        var responseData={};
        responseData['questions'] = [result];
        console.log(responseData);
        responder.httpRespond(res, {code: responder.OK, detail: responseData});
      })
      .catch((err)=>{
        console.log('Error saving new question');
       console.log(err);
      });

    } else {
      responder.httpRespond(res, {code: responder.INVALID_PARAM});
    }
  }

  findOne(req, res){
    var search = {id: req.params.id};
    return this.proto.findOne(search)
    .then((result)=>{
      // Going to explicitly create booleans for the question type to simplify entryform rendering.
      if(result.questionType==1) result.checkbox=true;
      if(result.questionType==2) result.textfield=true;
      if(result.questionType==3) result.textarea=true;
      if(result.questionType==4) {
          result.select=true;
          result.options=['option 1','option 2','option 3'];
          // then strip out all the options for the select
      }
      var responseData={};
      responseData[this.pluralName] = [result];
      responder.httpRespond(res, {code:responder.OK, detail: responseData});


    })
    .catch((err)=>{
      console.log(err);
    });
  }

  findCompetitionQuestions(req, res){

    var search;

    if('compInstId' in req.query){
      search={compInstId: req.query.compInstId};
    } else {
      throw new Error('No compInstId specified');
    }

    var allquestions;

    return this.proto.find(search, {field: "formOrder" , asc:1})
    .then((result)=>{
      var responseData = {questions: result};
      responder.httpRespond(res, {code: responder.OK, detail:responseData});
    })
    .catch((err)=>{
      console.log(err);
      responder.httpRespond(res, {code:responder.DB_ERR, detail:[err]});
    });
  }

}

module.exports = QuestionController;
