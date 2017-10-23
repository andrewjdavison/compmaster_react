'use strict';
var TableController = rootRequire('controllers/table');
var Award = rootRequire('models/award');
var responder = rootRequire('common/responder');

class AwardController extends TableController {
  constructor(){
    var award = new Award();
    super(award);
  }

  newAward(req, res){
    if(req.query.hasOwnProperty('compInstId')){
      var responseData={};
      var award = new Award();

      award.compInstId = req.query.compInstId;
      award.displayOrder=-1;
      award.name="New Award";
      award.description="";
      award.winner="";
      award.sponsor1=0;
      award.sponsor2=0;
      award.sponsor3=0;
      return award.save()
      .then((result)=>{
        console.log(result);
        responseData['awards'] = [result];
        responder.httpRespond(res, {code: responder.OK, detail: responseData});
      })
      .catch((err)=>{
        responseData['error'] = err;
        responder.httpRespond(res, {code: responder.DB_ERR, detail: responseData});
      });
    } else {
      responser.httpRespond(res, {code: responder.INVALID_PARAM});
    }
  }

  findCompAwards(req, res){
    if(req.query.hasOwnProperty('compInstId')){
      var search={compInstId: req.query.compInstId};
      return this.proto.find(search)
      .then((result)=>{
        var responseData={};
        responseData['awards'] = result;
        responder.httpRespond(res, {code: responder.OK, detail:responseData});
      })
      .catch((err)=>{
        console.log('Error');
        console.log(err);
        var responseData={};
        responseData['error']=err;
        responder.httpRespond(res, {code:responder.DB_ERR});
      });
    } else {
      responder.httpRespons(res, {code: responder.INVALID_PARAM});
    }
  }
}

module.exports = AwardController;
