'use strict';
var TableController = rootRequire('controllers/table');
var Scoretemplate = rootRequire('models/scoretemplate');

class ScoretemplateController extends TableController {
  constructor(){
    var scoretemplate = new Scoretemplate();
    super(scoretemplate);
  }
}

module.exports = ScoretemplateController;
