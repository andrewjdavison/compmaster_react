'use strict';
var TableController = rootRequire('controllers/table');
var Club = rootRequire('models/club');

class ClubController extends TableController {
  constructor(){
    var club = new Club();
    super(club);
  }
}

module.exports = ClubController;
