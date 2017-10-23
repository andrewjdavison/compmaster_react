'use strict';
var TableController = rootRequire('controllers/table');
var Entryresponse = rootRequire('models/entryresponse');
var responder = rootRequire('common/responder');
var Question = rootRequire('models/question');

class EntryresponseController extends TableController {
  constructor(){
    var entryresponse = new Entryresponse();
    super(entryresponse);
  }

  findAllForEntry(req, res){
    //TODO: Check authorization
    //TODO: check for parameter

    var search={entryId: req.query.entryId};

    // If compInstId is present, return all the responses for a competition...

    if(req.query.hasOwnProperty('compInstId')){
      search = {compInstId: req.query.compInstId};
    }

    //console.log(search);
    return this.proto.find(search)
    .then((result)=>{
      //console.log(result);
      // add an array containing the question so it gets picked up by
      // ember data


      var responseData={entryresponses:result};
      responder.httpRespond(res, {code: responder.OK, detail:responseData});
    })
    .catch((err)=>{
      console.log(err);
      responder.httpRespond(res, {code: responder.DB_ERR, detail:[err]});
    })

  }


  findOneMiddleware(req, interimResult){
    var search  = {id: req.params.entryId};
    var question = new Question();

    console.log('Interim Entry Response');
    console.log(interimResult);

    return question.findOne({id: interimResult.questionId})
    .then((result)=>{
      interimResult.questions=[result.id];
      return interimResult;
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  put(req, res){
    //console.log('Saving Entryresponse');
    super.put(req, res);
  }


}

module.exports = EntryresponseController;
