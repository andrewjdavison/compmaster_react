'use strict';

var TableController = rootRequire('controllers/table');
var responder = rootRequire('common/responder');
var Judge = rootRequire('models/staff');
var User = rootRequire('models/user');
var Staff = rootRequire('models/staff');

class JudgeController extends TableController {

  constructor(){
    var judge = new Judge();
    super(judge);
    this.pluralName="judges";
  }

  //--------------------------
  // The find middleware converts the
  // userId field to an array so that
  // the EmberDS model for judges
  // will fetch the users data.

  findMiddleware(req, interimResult){
    var promises=[];
    var user=new User();
    if(interimResult){
      for(var i=0;i<interimResult.length;i++){
        interimResult[i].users=[interimResult[i].userId];
        let userId=interimResult[i].userId;
        promises.push(user.find({id:userId}));
      }
      return Promise.all(promises)
      .then((res)=>{
        for(let i=0;i<res.length;i++){
          let thisUser=res[i][0];
          for(let j=0;j<interimResult.length;j++)
            if(interimResult[j].userId == thisUser.id){
              interimResult[j].firstName=thisUser.firstName;
              interimResult[j].lastName=thisUser.lastName;
            }
        }
        return interimResult;
      })
      .catch((err)=>{
        console.log(err);
        throw err;
      });

    }
  }

  putMiddleware(req, interimResult){
    if(interimResult){
      interimResult.users=[interimResult.userId];
    }
    return interimResult;
  }

  findOne(req, res){
    console.log('Looking for a judge');
    super.findOne(req, res);
  }

  find(req, res){
    if(req.query.hasOwnProperty('compInstId')){
      req.params.compInstId=req.query.compInstId;
      res.pluralName="judges";
      super.find(req, res);
    } else {
      responder.httpRespond(res, {code: responder.INVALID_PARAM});
      return;
    }
  }

  put(req, res){
    req.pluralName='judges';
    // We need to change the list of users (which will contain a single element) into an integer...

    req.body.judge.userId = req.body.judge.users[0];
    super.put(req, res);
  }

  newJudge(req, res){
    var responseData=[];
    if(req.body.hasOwnProperty('judge')&&
       req.body.judge.hasOwnProperty('firstName') &&
       req.body.judge.hasOwnProperty('lastName') &&
       req.body.judge.hasOwnProperty('email')){

      var promises=[];
      var userId=0;
      var user = new User();

      // See if we can find the user first...

      user.find({email: req.body.judge.email})
      .then((result)=>{
        if(result.length>0){
          console.log('This user existed');
          return result[0];
        } else {
          let newUser = new User();
          newUser.firstName = req.body.judge.firstName;
          newUser.lastName = req.body.judge.lastName;
          newUser.email = req.body.judge.email;
          return newUser.save();
        }
      })
      .then((result)=>{
        console.log(result);
        // Now add to the judge list...
        userId = result.id;

        //Fetch all the judges so we know what ID to assign them...

        var staff = new Staff();
        return staff.find({compInstId: req.body.judge.compInstId, role:1});
      })
      .then((result)=>{
        let maxId=0;

        for(var i=0;i<result.length;i++){
          if(result[i].staffId > maxId){
            maxId = result[i].staffId;
          }
        }
        console.log('Next ID is ' + maxId);
        var newStaff = new Staff();
        newStaff.compInstId = req.body.judge.compInstId;
        newStaff.userId = userId;
        newStaff.role=1;
        newStaff.staffId = maxId+1;
        newStaff.notes='';
        return newStaff.save();
      })
      .then((result)=>{
        console.log('\n\n');
        console.log(result);
        responseData = [result];
        responder.httpRespond(res, {code: responder.OK, detail: responseData});
      })
         /*
      if(req.body.judge.hasOwnProperty('userId') &&
         req.body.judge.userId != null){
       console.log('Existing user');
         promises.push(Promise.resolve());
      } else {
        let newUser = new User();
        newUser.firstName = req.body.judge.firstName;
        newUser.lastName = req.body.judge.lastName;
        newUser.email = req.body.judge.email;
        promises.push( newUser.save());
      }
      Promise.all(promises)
      .then((result)=>{
        if(result){
          userId = req.body.judge.userId;
        } else {
          console.log('----------------');
          console.log(result);
          userId = result.id;
        }

        console.log('Adding user '+ userId+' to the judge list for this competition');

        responseData = [result];
        // NOw put them into the
        return result;
      })
      .then((result)=>{

        httpRespond(res, {code: responder.OK, detail: responseData});
      })
         */
      .catch((err)=>{
        var responseData={message:"failed to create user"};
        httpRespond(res, {code:responder.DB_ERR, detail: responseData});
      });
    } else {
      responder.httpRespond(res, {code: responder.INVALID_PARAM, detail:[]});
    }
  }
}

module.exports = JudgeController;
