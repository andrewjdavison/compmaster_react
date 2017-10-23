'use strict';
var TableController = rootRequire('controllers/table');
var Scoresheet = rootRequire('models/scoresheet');

class ScoresheetController extends TableController {
  constructor(){
    var scoresheet = new Scoresheet();
    super(scoresheet);
  }
}

module.exports = ScoresheetController;
