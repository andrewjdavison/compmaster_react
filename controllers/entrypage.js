'use strict';
var TableController = rootRequire('controllers/table');
var Entrypage = rootRequire('models/entrypage');

class EntrypageController extends TableController {
  constructor(){
    var entrypage = new Entrypage();
    super(entrypage);
  }
}

module.exports = EntrypageController;
