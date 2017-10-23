'use strict';
var TableController = rootRequire('controllers/table');
var Question = rootRequire('models/question');

class QuestionController extends TableController {
  constructor(){
    var question = new Question();
    super(question);
  }
}

module.exports = QuestionController;
