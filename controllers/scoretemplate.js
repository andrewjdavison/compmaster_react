'use strict';
var TableController = rootRequire('controllers/table');
var Scoretemplate = rootRequire('models/scoretemplate');

class ScoretemplateController extends TableController {
  constructor(){
    var scoretemplate = new Scoretemplate();
    super(scoretemplate);
  }

  find(req, res){
    req.sort={field: 'scoresheetName', asc:1};
    super.find(req, res);
  }
}

module.exports = ScoretemplateController;
