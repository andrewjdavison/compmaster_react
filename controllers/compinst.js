'use strict';
var TableController = rootRequire('controllers/table');
var Compinst = rootRequire('models/compinst');
var Blurb = rootRequire('models/blurb');
var Category= rootRequire('models/category');
var QuestionPage = rootRequire('models/questionpage');
var Question = rootRequire('models/question');

class CompinstController extends TableController {
  constructor(){
    var compinst = new Compinst();
    var filter={};
    super(compinst);
  }

  findOneMiddleware(req, interimResult){
    return this.findMiddleware(req,[interimResult])
    .then((result)=>{
//      console.log(result);
      return result[0];

    })
  }


  findMiddleware(req, interimResult){
    // Fetch all the blurbs and add these to the result...

    var blurbs = new Blurb();
    var category = new Category();
    var questionpage = new QuestionPage();
    var question = new Question();
    var promises=[];
    var promises2=[];
    var promises3=[];
    var promises4=[];
    var index={};

    if(interimResult){
//      console.log(interimResult);

      for(var i=0;i<interimResult.length;i++){
        promises.push(blurbs.find({compInstId: interimResult[i].id}));
        promises2.push(category.find({compInstId: interimResult[i].id}));
        promises3.push(questionpage.find({compInstId: interimResult[i].id}));
        promises4.push(question.find({compInstId: interimResult[i].id}));
        index[interimResult[i].id]=i;
        interimResult[i].blurbs=[];
        interimResult[i].categories=[];
        interimResult[i].questionpages=[];
        interimResult[i].questions=[];
      }
      return Promise.all(promises)
      .then((result)=>{
//        console.log("Assembling Blurbs");
        for(var i=0;i<result.length;i++){
          var blurbs = result[i];
          for(var j=0;j<blurbs.length;j++){
            var ind = index[blurbs[j].compInstId];
            interimResult[ind].blurbs.push(blurbs[j].id);
          }
        }
        return Promise.all(promises2);
      })
      .then((result)=>{
//        console.log("Assembling Categories");
//        console.log(result);
//        console.log('--------------------------');
        for(var i=0;i<result.length;i++){
          var cats = result[i];
          for(var j=0;j<cats.length;j++){
            var ind = index[cats[j].compInstId];
            interimResult[ind].categories.push(cats[j].id);
          }
        }
        return Promise.all(promises3);
      })
      .then((result)=>{
        for(var i=0;i<result.length;i++){
          var questionpages = result[i];
          for(var j=0;j<questionpages.length;j++){
            var ind = index[questionpages[j].compInstId];
            interimResult[ind].questionpages.push(questionpages[j].id);
          }
        }
        return Promise.all(promises4);
      })
      .then((result)=>{
        for(var i=0;i<result.length;i++){
          var questions = result[i];
          for(var j=0;j<questions.length;j++){
            var ind = index[questions[j].compInstId];
            interimResult[ind].questions.push(questions[j].id);
          }
        }
        return interimResult;
      })
      .catch((err)=>{
        console.log(err);
      });
    } else {
      return {};
    }

  }

  // API: activecomps
  //
  // Authorization:
  //  get: all
  //  post: none
  //  put: none

  findActiveComps(req, res){
    // Set the filter and then execute a find...
    var blurbs = new Blurb();

    req.params.compstate={op:'<', data:8};
    res.pluralName="activecompetitions";
    this.find(req, res);
  }

}

module.exports = CompinstController;
