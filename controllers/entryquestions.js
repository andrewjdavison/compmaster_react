'use strict';
var TableController = rootRequire('controllers/table');
var Compquestions = rootRequire('models/compquestions');

class CompquestionsController extends TableController {
  constructor(){
    var compquestions = new Compquestions();
    super(compquestions);
  }
}

module.exports = CompquestionsController;
