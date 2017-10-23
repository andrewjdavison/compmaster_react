'use strict';
var TableController = rootRequire('controllers/table');
var Entry = rootRequire('models/entry');

class EntryController extends TableController {
  constructor(){
    var entry = new Entry();
    super(entry);
  }
}

module.exports = EntryController;
