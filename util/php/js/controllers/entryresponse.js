'use strict';
var TableController = rootRequire('controllers/table');
var Entryresponse = rootRequire('models/entryresponse');

class EntryresponseController extends TableController {
  constructor(){
    var entryresponse = new Entryresponse();
    super(entryresponse);
  }
}

module.exports = EntryresponseController;
