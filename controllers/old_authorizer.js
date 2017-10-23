'use strict';

var cmconst = rootRequire('common/const');
var db = rootRequire('common/db');
var auth = require('authorized');
var capabilities = rootRequire('common/capabilities');



auth.role('admin', function(req, done){
  done(null, req.user.permissions & capabilities.admin);
});

auth.role('test', function(req, done){
  done(null, req.user.permissions & capabilities.test);
});

auth.role('owner', function(req, done){
  console.log(req.user);
  console.log(req.params.userId);
  done(null, req.user.userid == req.params.userId);
});

auth.role('entrant', function(req, done){
  var query = "SELECT entrantId from entry where id='"+req.body.entry.entrantId+"';";
  var authorized=false;
  db.query(query)
  .then((result)=>{
    if(result[0].length==0){
      authorized=false;
    } else if (result[0][0].entrantId==req.body.entrantId){
      authorized=true;
    }
  });
  done(null, authorized);
});

auth.role('compmanager', function(req, done){
  console.log('Testing to see if this is a comp admin');
  var compInstId = req.params.compInstId;
  var userId = req.user.userid;
  var authorized=false;

  var query = "SELECT * FROM compauth WHERE `compInstId`='"+compInstId+
               "' AND `userId`='"+userId+"';";
  console.log(cmconst.PermClass.judgeAdmin);
  db.query(query)
  .then((result)=>{
    if(result[0].length ==0 ){
      authorized=false;
    } else if((result[0][0].level == cmconst.PermClass.judgeAdmin) ||
       (result[0][0].level == cmconst.PermClass.compAdmin) ){
      authorized=true;
      req.permissions = result[0][0].level;
    }
    done(null, authorized);

  });


});

auth.role('modifyEntry', function(req, done){
  console.log('Can we modify this entry?');
  // Make sure the competition is accepting entries, or that this is an admin
  var compInstId = req.body.entry.compInstId;
  var userId = req.user.userid;
  var authorized=false;

  // First check whether we're in dates...

  var query = "SELECT compstate,entryCloseDate FROM compinst where `id`='"+compInstId+"';";

  db.query(query)
  .then((result)=>{
    if(result[0].length == 0){
      authorized=false;
    } else if ((result[0][0].compstate == cmconst.CompState.acceptingEntries) ||
               (new Date(result[0][0].entryCloseDate) < new Date()))
    {
      authorized= true;
    }

    query = "SELECT * FROM compauth WHERE `compInstId`='"+compInstId+
                "' AND `userId`='"+userId+"';";
    return db.query(query);
  })
  .then((result)=>{
    if(!authorized){
      // Now check whether we're an admin to override the date restrictions...
      if(result[0].length == 0){
        authorized=false;
      } else if((result[0][0].level = cmconst.PermClass.judgeAdmin) ||
          (result[0][0].level == cmconst.PermClass.compAdmin) ){
        authorized=true;
        req.permissions = result[0][0].level;
      }
    }
    done(null, authorized);

  });
});

auth.action('run tests', ['test']);
auth.action('read own data', ['owner']);
auth.action('read comp data', ['compmanager']);
auth.action('save own data', ['owner']);
auth.action('save entry', ['entrant', 'compmanager']);
auth.action('comp open', ['modifyEntry']);
auth.action('comp edit', ['compmanager']);


module.exports = auth;
