'use strict';
var TableController = rootRequire('controllers/table');
var Subcategory = rootRequire('models/subcategory');

class SubcategoryController extends TableController {
  constructor(){
    var subcategory = new Subcategory();
    super(subcategory);
  }
}

module.exports = SubcategoryController;
