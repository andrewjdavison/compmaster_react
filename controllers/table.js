"use strict";

var config = require('config');
var responder = rootRequire('common/responder');

class TableController {

  constructor(proto){
    this.proto = proto;
    if("pluralName" in this.proto){
      this.pluralName = this.proto.pluralName;
    } else{
      this.pluralName = this.proto.tableName+'s';
    }
  }

  promiseToFindOne(req,res) {
    var search={id: req.params.id};
    return this.proto.findOne(search)
    .catch((err)=>{
      console.log(err);
    });
  }

  sendResult(result, response) {
    var responseData={};
    var pluralName;
    if('pluralName' in response){
      pluralName = response.pluralName;
    } else {
      pluralName = this.pluralName;
    }
    responseData[pluralName] = result;
    responder.httpRespond(response, {code: responder.OK, detail: responseData});
  }

  findOne(req,res, middleware) {
    this.promiseToFindOne(req, res)
    .then((result)=>{
      if(this.findOneMiddleware){
        return this.findOneMiddleware(req, result);
      } else {
        return result;
      }
    })
    .then((result)=>{
      this.sendResult([result], res);
    })
  }

  //-----------------------------------------------------

  promiseToFind(req, res) {
    var search=null;
    var sort=0;
    var returnFields=0;

    if(Object.keys(req.query).length>0){
      search = req.query;
    }

    if(Object.keys(req.params).length>0){
//      console.log(req.params);
      search=req.params;
    }

    if('sort' in req){
//      console.log('Sorting this search on '+req.sort.field+', ascending='+req.sort.asc);
      sort = req.sort;
    }
    if('returnFields' in req){
      returnFields = req.returnFields;
    }

    return this.proto.find(search,sort, returnFields)
    .catch((err)=>{
      console.log(err);
    });
  }

  find(req, res){
    this.promiseToFind(req, res)
    .then((result)=>{
      if(this.findMiddleware){
//        console.log('Invoking find middleware');
        return this.findMiddleware(req,result);
      } else {
        return result;
      }
    })
    .then((result)=>{
      this.sendResult(result, res);
    })
    .catch((err)=>{
      console.log(err);
    });

  }

  /*
  find(req, res){
    var model=null;
    if(Object.keys(req.params).length > 0)
      model=req.params;
    //console.log('Length of params'+req.query.length);
    return this.proto.find(null)
    .then((result)=> {
      var responseData={};
      responseData[this.pluralName] = result;
      responder.httpRespond(res, {code: responder.OK, detail: responseData});
    })
    .catch((err)=>{
      console.log(err);
    });
  }
 */

  /*
   * PUT user
   *
   * Update a  user record
   */

  put(req, res){
    this.proto.id=('id' in req.params)?req.params.id:null;
//    console.log('Putting ID: '+req.params.id);
    var tableName='';
    var keyCount=0;
    for(var key of Object.keys(req.body)){
      tableName = key;
      keyCount++;
    }
    if(keyCount>1){
      responder.httpRespond(res,{code:responder.TOO_MANY_RECORDS, detail:{}});
    } else {
      var data = req.body;
//      console.log(req.body);
      for(var key of Object.keys(this.proto.schema)) {
        this.proto[key] = (key in data) ? data[key]:null;
//        console.log('Key: '+key + ', Value: '+this.proto[key]);
      }
      this.proto.set(this.proto);
      return this.proto.save(req.body[tableName])
      .then((result)=> {
        if(this.putMiddleware){
          return this.putMiddleware(req, result);
        } else {
          return result;
        }
      })
      .then((result)=>{
        if(this.putMiddleware){
  //        console.log('Invoking find middleware');
          return this.putMiddleware(req,result);
        } else {
          return result;
        }
      })
      .then((result)=>{
        var responseData={};
        responseData[this.pluralName] = result;
        responder.httpRespond(res, {code: responder.OK, detail: responseData});
      })
      .catch((err)=>{
        console.log(err);
        responder.httpRespond(res, {code: responder.DB_ERR, detail: err});
      });
    }
  }

  post(req, res) {
    console.log('REMEMBER: Post got changed to interrogate the named element!');
    this.proto.id=('id' in req.body)?req.body.id:null;
    for (var key of Object.keys(this.proto.schema)){
      console.log('Set '+key+ ' to '+req.body[this.proto.tableName][key]);
      this.proto[key] = (key in req.body[this.proto.tableName]) ? req.body[this.proto.tableName][key]:null;
    }
    this.proto.save()
    .then((result)=>{
      if(this.postMiddleware){
//        console.log('Invoking find middleware');
        return this.postMiddleware(req,result);
      } else {
        return result;
      }
    })
    .then((result)=>{
      var responseData={};
      responseData[this.pluralName] = result;
      responder.httpRespond(res, {code: responder.OK, detail:responseData});
    })
    .catch((err)=>{
      console.log(err);
      responder.httpRespond(res, {code: responder.DB_ERR});
    });

  }

}

module.exports = TableController;
