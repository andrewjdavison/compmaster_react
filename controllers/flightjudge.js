'use strict';
var responder = rootRequire('common/responder');
var TableController = rootRequire('controllers/table');
var Flightjudge = rootRequire('models/flightjudge');

class FlightjudgeController extends TableController {
  constructor(){
    var flightjudge = new Flightjudge();
    super(flightjudge);
  }

  newFlightjudge(req, res){
    if(('id' in req.params)&&
      (req.query.hasOwnProperty('flightId')) &&
        (req.query.hasOwnProperty('judgeId'))){
      var flightjudge = new Flightjudge;
      flightjudge.compInstId = req.params.id;
      flightjudge.flightId = req.query.flightId;
      flightjudge.judgeId = req.query.judgeId;
      return flightjudge.save()
      .then((result)=>{
        var responseData={};
        responseData['flightjudges'] = [result];
        responder.httpRespond(res, {code: responder.OK, detail: responseData});
      })
      .catch((err)=>{
        console.log(err);
        var responseData={};

        responseData['error'] = err;
        responder.httpRespond(res, {code: responder.DB_ERR, detail: responseData});
      });
    } else {
      responder.httpRespond(res, {code: responder.INVALID_PARAM});
    }
  }

  findCompFlightjudges(req, res){
    if(req.query.hasOwnProperty('compInstId')){
      var search={compInstId: req.query.compInstId};
      return this.proto.find(search)
      .then((result)=>{
//        console.log(result);
        var responseData={};
        responseData['flightjudges'] = result;
        responder.httpRespond(res, {code: responder.OK, detail: responseData});
      })
      .catch((err)=>{
        console.log(err);
        var responseData={};
        responseData['error'] = err;
        responder.httpRespond(res, {code: responder.DB_ERR});
      });

    } else {
     responder.httpRespond(res, {code: responder.INVALID_PARAM});
    }
  }
}

module.exports = FlightjudgeController;
