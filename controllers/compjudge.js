'use strict';
var TableController = rootRequire('controllers/table');
var Compjudge = rootRequire('models/compjudge');

class CompjudgeController extends TableController {
  constructor(){
    var compjudge = new Compjudge();
    super(compjudge);
  }
}

module.exports = CompjudgeController;
