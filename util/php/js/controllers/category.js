'use strict';
var TableController = rootRequire('controllers/table');
var Category = rootRequire('models/category');

class CategoryController extends TableController {
  constructor(){
    var category = new Category();
    super(category);
  }
}

module.exports = CategoryController;
