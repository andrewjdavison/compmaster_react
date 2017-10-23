'use strict';
var responder = rootRequire('common/responder');
var TableController = rootRequire('controllers/table');
var Category = rootRequire('models/category');
var Subcategory = rootRequire('models/subcategory');

class CategoryController extends TableController {
  constructor(){
    var category = new Category();
    super(category);
  }
  /*
  put(req, res) {
  //  console.log('saving category');
//    console.log(req.body.category.compinstId);
    console.log(req.body);
//    if(req.body.category.compInstId < 0){
//      console.log('=============================');
//      console.log('Looks like a delete to me!');
//      console.log('=============================');
//    }
    super.put(req, res);
  }
  */

  findOne(req, res) {
//    console.log('Wow');
//    console.log(req);
    if(req.query == 'new'){
//      console.log('Creating a new one!');
    }
    super.find(req, res);
  }

  newCategory(req, res){
//    console.log('New Category');

    if('id' in req.params){
//      console.log('Asked for a new one!');
      var category = new Category();
      category.compInstId = req.params.id;
      category.categoryName="New";
      category.categoryCode="";
      category.firstPrize="";
      category.secondPrize="";
      category.thirdPrize="";
      category.displayOrder=0;
      category.scoreTemplate = 0;
      return category.save()
      .then((result)=>{
        var responseData={};
        responseData['categories'] = [result];
        responder.httpRespond(res, {code: responder.OK, detail: responseData});

      });
    } else {
      responder.httpRespond(res, {code: responder.INVALID_PARAM});
    }
  }

  findCompCategories(req, res) {

    var csearch;
    var ssearch;
    var categories;
    var subcategory = new Subcategory();
    var subcategories;
    var auth = require('./authorizer');


    if('compInstId' in req.query){
      csearch={compInstId: req.query.compInstId};
      ssearch={compInstId: req.query.compInstId};
    } else if ('id' in req.params){
      csearch={id: req.params.id};
      ssearch={categoryId: req.params.id};
    }

    return this.proto.find(csearch, {field: 'displayOrder', asc:1})
    .then((result)=>{
      categories = result;
      return subcategory.find(ssearch);
    })
    .then((result)=>{
      subcategories=result;

       // Now match up the categories with their subcategories
      for(var i=0;i<categories.length;i++){
        var subArray = subcategories.filter(function(obj){
            return obj.categoryId == categories[i].id;
        });
        categories[i].subcategories=[];
        for(var j=0;j<subArray.length;j++){
          categories[i].subcategories.push(subArray[j].id);
        }
      }
      var responseData={};
      responseData['categories'] = categories;
      responder.httpRespond(res, {code: responder.OK, detail: responseData});
    });
  }
}

module.exports = CategoryController;
