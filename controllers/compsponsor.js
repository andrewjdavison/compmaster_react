'use strict';
var TableController = rootRequire('controllers/table');
var Compsponsor = rootRequire('models/compsponsor');
var responder = rootRequire('common/responder');

class CompsponsorController extends TableController {
  constructor(){
    var compsponsor = new Compsponsor();
    super(compsponsor);
  }

  findCompSponsors(req, res){
    console.log('Looking for sponsor');
    if(req.query.hasOwnProperty('compInstId') || req.query.hasOwnProperty('sponsorId')){
      var search={};
      if(req.query.compInstId){
        search={compInstId: req.query.compInstId};
      } else {
        search={sponsorId: req.query.sponsorId};
      }
      return this.proto.find(search)
      .then((result)=>{
        var responseData={};
        responseData['compsponsors']=result;
        responder.httpRespond(res, {code: responder.OK, detail:responseData});
      })
      .catch((err)=>{
        console.log(err);
        var responseData={};
        responseData['error']=err;
        responder.httpRespond(res, {code:responder.DB_ERR});
      });

    } else {
      responder.httpRespond(res, {code: responder.INVALID_PARAM});
    }
  }
}

module.exports = CompsponsorController;
