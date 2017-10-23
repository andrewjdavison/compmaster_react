'use strict';
var TableController = rootRequire('controllers/table');
var Sponsor = rootRequire('models/sponsor');
var CompSponsor = rootRequire('models/compsponsor');
var responder = rootRequire('common/responder');

class SponsorController extends TableController {
  constructor(){
    var sponsor = new Sponsor();
    super(sponsor);
  }

  newSponsor(req, res){
    if(req.query.hasOwnProperty('compInstId')){
      var responseData={};
      var sponsor=new Sponsor();
      sponsor.name="New Sponsor";
      sponsor.blurb="";
      sponsor.smLink="";
      sponsor.lgLink="";
      sponsor.smImg="";
      sponsor.lgImg="";
      sponsor.useLink=0;
      sponsor.clickthrough="";

      return sponsor.save()
      .then((result)=>{
        console.log(result);
        responseData['sponsors'] = [result];

        var compSponsor= new CompSponsor();
        compSponsor.compInstId=req.query.compInstId;
        compSponsor.sponsorId=result.id;
        compSponsor.sponsorCategory=0;
        compSponsor.sponsorType=0;
        return compSponsor.save();
      })
      .then((result)=>{
        console.log(result);
        responder.httpRespond(res, {code: responder.OK, detail: responseData});
      })
      .catch((err)=>{
        responseData['error'] = err;
        responder.httpRespond(res, {code: responder.DB_ERR, detail: responseData});
      });

      /*
      var compSponsor = new CompSponsor();
      compSponsor.compInstId=req.query.compInstId;
      compInstId
      */


    } else {
      responder.httpRespond(res, {code: responder.INVALID_PARAM});
    }
  }

  findCompSponsors(req, res){
    console.log('Looking for sponsor');
    if(req.query.hasOwnProperty('compInstId')){
      var search={compInstId: req.query.compInstId};
      return this.proto.find(search)
      .then((result)=>{
        var responseData={};
        responseData['sponsors']=result;
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
      responder.httpRespond(res, {code: responder.INVALID_PARAM});
    }
  }
}

module.exports = SponsorController;

