'use strict';
var TableController = rootRequire('controllers/table');
var State = rootRequire('models/state');

var responder = rootRequire('common/responder');

class StateController extends TableController {
  constructor(){
    var state = new State();
    var pluralName = "states";
    super(state);
  }

  find(req, res){
    var search={countryId: req.params.id};
    return this.proto.find(search)
    .then((result)=> {
      var responseData={};
      responseData[this.pluralName] = result;
      responder.httpRespond(res, {code: responder.OK, detail: responseData});
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  findOne(req, res){
    var search={id: req.params.id};
    return this.proto.find(search)
    .then((result)=> {
      var responseData={};
      responseData['cstates'] = result;
      responder.httpRespond(res, {code: responder.OK, detail: responseData});
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}


module.exports = StateController;
