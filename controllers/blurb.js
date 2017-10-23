'use strict';
var TableController = rootRequire('controllers/table');
var Blurb= rootRequire('models/blurb');
var responder = rootRequire('common/responder');
var _ = require('lodash');


class BlurbController extends TableController {
  constructor(){
    var blurb= new Blurb();
    super(blurb);
  }

  find(req, res){
    req.sort={field: 'displayOrder', asc:1};
    super.find(req, res);
  }

  findMiddleware(req, interimResult){
    if(interimResult){
      for(var i=0;i<interimResult.length;i++){
        interimResult[i].content = _.unescape(interimResult[i].content);
      }
    }
    return interimResult;
  }

  put(req, res){
    // Make sure that the content string has been escaped
//    req.body.blurb.content = _.escape(req.body.blurb.content);
    console.log(req.body.blurb);
    super.put(req,res);
  }

  newBlurb(req, res){
    if('id' in req.params){
      var blurb = new Blurb();
      blurb.compInstId = req.params.id;
      blurb.title='New Section';
      blurb.content='';
      blurb.displayOrder=-1;
      return blurb.save()
      .then((result)=>{
        var responseData={};
        responseData['blurbs'] = [result];
        responder.httpRespond(res, {code: responder.OK, detail: responseData});
      });
    } else {
      responder.httpRespond(res, {code: responder.INVALID_PARAM});
    }
  }
}

module.exports = BlurbController;
