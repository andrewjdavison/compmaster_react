'use strict';
var TableController = rootRequire('controllers/table');
var Questionpage = rootRequire('models/questionpage');

class QuestionpageController extends TableController {
  constructor(){
    var questionpage = new Questionpage();
    super(questionpage);
  }
}

module.exports = QuestionpageController;
