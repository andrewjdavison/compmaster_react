'use strict';

var ScoresheetModel = rootRequire('models/scoresheet');
var CompetitionModel = rootRequire('models/compinst');
var SponsorModel = rootRequire('models/sponsor');
var responder = rootRequire('common/responder');
var EntryModel = rootRequire('models/entry');
var CategoryModel = rootRequire('models/category');
var ScoretemplateModel = rootRequire('models/scoretemplate');

class ResultsController {
  constructor(){
  }

  setTieValues(category, entries, scoresheetTemplate){
  }


  calculateResults(competition){
    /*
    For every category inside the competition...
    Pull out the tie breakers and put them into the entries
    put the entry scores into an array...
    sort the array on tie10, tie 9, tie 8...
    Assign the rankings to each entry...
    Set the validResults flag...
    */

    var scoresheetModel = new ScoresheetModel();
    var entryModel = new EntryModel();
    var categoryModel = new CategoryModel();
    var scoretemplateModel = new ScoretemplateModel();

    var scoresheets=[];
    if(competition==null){
      return false;
    }
    let categories={};
    let scoreTemplates={};

    return categoryModel.find({compInstId: competition.id})
    .then((result)=>{
      for(let i=0;i<result.length;i++){
        categories[result[i].id] = {category : result[i], entries:[]};
      }
      return entryModel.find({compInstId: competition.id});
    })
    .then((result)=>{
      console.log('got my entries');
      for(let i=0;i<result.length;i++){
        categories[result[i].categoryId].entries.push(result[i]);
      }
      console.log('OK Look at me!');
      var promises=[];

      for(var catId in categories){
        if(categories.hasOwnProperty(catId)){
          // Sort for ranking purposes...
          for(let i=10;i>0;i--){
            categories[catId].entries.sort((a,b)=>{
              return  a['tie'+i] < b['tie'+i];
            });
          }
          categories[catId].entries.sort((a,b)=>{
            return a.totalScore < b.totalScore;
          });
          // Worst case there is a manual tie-break...
          categories[catId].entries.sort((a,b)=>{
            return a.tiebreaker < b.tiebreaker;
          });
          console.log('Entries for category: '+categories[catId].category.categoryName);
          for(let j=0;j<categories[catId].entries.length;j++){
            let thisEntry = categories[catId].entries[j];
            categories[catId].entries[j].rank=j+1;
            console.log('Rank: '+ thisEntry.rank + ", Entry #: "+thisEntry.entryNumber+' ['+thisEntry.totalScore+']  '+thisEntry.tie1+', '+thisEntry.tie2);
            promises.push(entryModel.save(thisEntry));
          }
        }
      }
      return Promise.all(promises);
    })
    .then((results)=>{
      return true;
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  getResults(req, res){
    var competitionModel = new CompetitionModel();
    var  competition=null;
    var competitions;
    var sponsorModel = new SponsorModel();
    var entryModel = new EntryModel();
    var sponsors;
    var entries;

    let search = {resultsPublished:1};
    competitionModel.find(search)
    .then((result)=>{
      let calcTarget = null
      competitions = result;
      let promises=[];
      for(let i=0;i<competitions.length;i++){
        // If scores haven't been calculated yet, go back and calculate them before proceeding
        if(competitions[i].validResults){
          calcTarget=null; // The calcResults promise will just resolve without doing anything for this competition.
        } else {
          console.log('Going to try to calculate results for comp: '+competitions[i].name);
          calcTarget = competitions[i];
        }
        promises.push(this.calculateResults(calcTarget));
      }
      return Promise.all(promises);
    })
    .then((result)=>{
      for(let i=0;i<result.length;i++){
        if(!result[i]){
          // There was no work to do...
          return null;
        } else {
          return competitionModel.save(competitions[i]);
        }
      }
    })
    .then((result)=>{
//          throw new Error("Argh!");
      // Grab the relevant sponsor data and entry data now...

    })
    .then((result)=>{
      var responseData = {results: competitions};
      responder.httpRespond(res, {code: responder.OK, detail:responseData});
    })
    .catch((err)=>{
      console.log(err);
      responder.httpRespond(res, {code: responder.DB_ERR, detail:{error:err}});
    });

    // If results have not been calculated, then do that first...

  }

  getCompResult(req, res){
    if(req.query.hasOwnProperty('compInstId')){
      var competitionModel = new CompetitionModel();
      var search={id: req.query.compInstId};
      var competition;
      var sponsorModel = new SponsorModel();
      var entryModel = new EntryModel();
      var categoryModel = new CategoryModel();

      var sponsors;
      var entries;
      var categories;
      var promises=[];

      competitionModel.find(search)
      .then((result)=>{
        competition = result[0];
        console.log(competition.resultsPublished);
        if(competition.resultsPublished){
          if(competition.validResults){
            return true;
          } else {
            console.log('calculating');
            return this.calculateResults(competition);
          }
        } else {
          throw {code:responder.RESULT_NOT_PUBLISHED};
        }
      })
      .then((result)=>{
        console.log('Yehaaa!');
        competition.validResults=1;
        return competitionModel.save(competition);
      })
      .then((result)=>{
        // OK now we need to assemble all the data...
        return categoryModel.find({compInstId: competition.id});
      })
      .then((result)=>{
        categories = result;

        for(let i=0;i<categories.length;i++){
          promises.push(entryModel.find({categoryId: categories[i].id, cancelled: 0, paid:1}, {asc:true,field: 'rank'}));
        }
        return Promise.all(promises);
      })
      .then((result)=>{
        for(let i=0;i<categories.length;i++){
          categories[i].entries=result[i];
        }

        var responseData={categories};
        responder.httpRespond(res, {code:responder.OK, detail: responseData});
      })
      .catch((err)=>{
        responder.httpErrorRespond(res, err);
      });

    } else {
      responder.httpRespond(res, {code: responder.INVALID_PARAM});
    }
  }
};

module.exports = ResultsController;
