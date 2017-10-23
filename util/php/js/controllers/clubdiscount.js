'use strict';
var TableController = rootRequire('controllers/table');
var Clubdiscount = rootRequire('models/clubdiscount');

class ClubdiscountController extends TableController {
  constructor(){
    var clubdiscount = new Clubdiscount();
    super(clubdiscount);
  }
}

module.exports = ClubdiscountController;
