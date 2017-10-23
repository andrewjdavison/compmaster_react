'use strict';
var TableController = rootRequire('controllers/table');
var Subcategory = rootRequire('models/subcategory');
var responder = rootRequire('common/responder');

class SubcategoryController extends TableController {
  constructor(){
    var subcategory = new Subcategory();
    super(subcategory);
  }

  newSubcategory(req, res){
//    console.log("catId: ",req.params.categoryId);
    if('categoryId' in req.query){
//     console.log('Creating new subcategory');
      var subcategory = new Subcategory();
      subcategory.categoryId=req.query.categoryId;
      subcategory.compInstId = req.query.compInstId;
      subcategory.subcategoryName="New";
      subcategory.subcategoryCode="";
      return subcategory.save()
      .then((result)=>{
//        console.log(result);
        var responseData={};
        responseData['subcategories'] = [result];
        responder.httpRespond(res, {code: responder.OK, detail: responseData});
      })
      .catch((err)=>{
        console.log(err);
      });
    } else {
     responder.httpRespond(res, {code : responder.INVALID_PARAM});
    }
  }

  findCompSubcategories(req, res){
    var search;
    if('categoryId' in req.query){
      search={categoryId: req.query.categoryId};
    } else if('id' in req.params){
      search={id: req.params.id};
    } else{
      search={compInstId: req.query.compInstId};
    }
    return this.proto.find(search,{field: 'subcategoryOrder', asc:1})
    .then((result)=>{
      var responseData={};
      responseData['subcategories'] = result;
      responder.httpRespond(res, {code:responder.OK, detail: responseData});
    });
  }

  /*
  put(req, res){
    console.log(req.body);
    super.put(req, res);
  }
  */

}

module.exports = SubcategoryController;
