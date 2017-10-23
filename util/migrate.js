var config = require('config');

var db = require('promise-mysql');

var userTable = require('./tables/user');
var compinstanceTable = require('./tables/compinstance');
var questionTable = require('./tables/question');
var blurbTable = require('./tables/blurb');
var clubTable = require("./tables/club");
var regionTable = require("./tables/region");
var awardTable = require("./tables/award");
var compauthTable = require("./tables/compauth");
var categoryTable = require("./tables/category");
var subcategoryTable = require("./tables/subcategory");
var sponsorTable = require("./tables/sponsor");
var compjudgeTable = require("./tables/compjudge");
var clubdiscountTable = require("./tables/clubdiscount");
var flightTable = require("./tables/flight");
var flightjudgeTable = require("./tables/flightjudge");
var entryTable = require("./tables/entry");
var entryresponseTable = require("./tables/entryresponse");
var compquestionTable = require("./tables/compquestions");


var cm6DB = "compm001_cmdata_live";
var cm8DB = "cmlive";

console.log('+================================================+');
console.log('|   Migrating data from the old CompMaster DB    |');
console.log('+================================================+');
console.log('');

var connection;

function switchDatabase(database){
  return connection.changeUser({database:database} );
}

db.createConnection({
  host          : config.get('Database.host'),
  user          : config.get('Database.user'),
  password      : config.get('Database.password'),
  database      : config.get('Database.database'),
  multipleStatements  : true,
  debug               : false,
})
.then(function(conn){
  connection = conn;
  console.log('Connected to database as id '+connection.connection.threadId);
  return switchDatabase(cm6DB);
})
//-------------------------------------------------------
// User Table Migration
.then(function(res){
  return userTable.create(connection);
})
.then(function(res){
  sql = "SELECT drpusers.pass, user.first_name, user.last_name, user.street_1, user.street_2, user.suburb, user.postcode, user.state, \
       user.phone, user.username, user.email, user.looks_phoney, user.club, user.member_id, user.unlisted_club, user.judge_id, \
       user.judge_level, user.judge_email, user.drupal_user_id, user.current_inst, user.regionid, user.usertype, user.sitemode \
       FROM drpusers INNER JOIN user on user.drupal_user_id=drpusers.uid;;";
  return connection.query(sql);
})
/*
.then(function(res){
  console.log('Migrating user data');
  return Promise.all(res.map(function(row){
    var values = [row.drupal_user_id, row.username, row.pass, row.email, row.first_name, row.last_name,
      0,row.looks_phoney, row.usertype, 0, 0, 0, row.street_1, row.street_2];
    return userTable.insert(connection, values);
  }));
})
*/
.then(function(res){
  return userTable.finalise(connection);
})
//--------------------------------------------------------
// Create Blurb table
.then(function(res){
  regionTable.create(connection);
})
.then(function(res){
  blurbTable.create(connection);
})
.then(function(res){
  compquestionTable.create(connection);
})
.then(function(res){
  questionTable.create(connection);
})
//-------------------------------------------------------
// Migrate CompInstance Table
.then(function(res){
  console.log('Creating CompInstance Table');
  return compinstanceTable.create(connection);
})
.then(function(res){
  sql = "SELECT * FROM "+cm6DB+".compinstance INNER JOIN compdetails ON compdetails.compinstid = compinstance.compinstid;";
  return connection.query(sql);
})
.then(function(res){
  return Promise.all(res.map(function(row){
    var values = [row.compinstid, row.compstate, row.instancetitle, row.address1, row.address2, row.city, row.state, row.postcode,
               row.country, row.mapref, row.contactphone + "<br>" + row.contactemail, row.startdate, row.enddate,
               row.basefee, row.discount1_value, row.discount2_value, row.discount3_value,
               row.categorylabel, row.categoryreq, row.subcategorylabel, row.subcategoryreq, row.entryopendate,
               row.entryclosedate, row.scoresheetid, row.scorefilepattern, row.paypalfixedfee, row.paypalvariablefee,
               row.compmasterfixedfee, row.compmastervariablefee, row.gst, row.entries,
               row.totallimit, row.tallymode, row.signature, row.offlinesignature, row.scoresheetsig, row.scoresheetversion,
               row.resultspublished, row.requestingstaff, row.requestingjudges, row.requestingjudgeassistants,
               row.allowunpaid, row.lockscoresheet, row.validresults, row.lockofflinesheet, row.showsponsors,
               row.hideadmin, row.scoresheetsready ];
    var sql = compinstanceTable.insertStr(connection,values);
    console.log("Migrating "+row.instancetitle);

    var parray = [];
    parray.push = connection.query(sql,values, function(err,res){
      if(row.t1used >0){
        if(!row.t1default){
          row.t1default='';
        }
        values=[row.compinstid, '1', row.t1label, row.t1req, row.t1weight, row.t1default,
                row.t1judging, row.t1running, row.t1report, row.t1description, row.t1onlabel,
                row.t1offlineweight, row.t1used, row.t1usedoffline, ''];
        sql = questionTable.insertStr(connection, values);
        connection.query(sql,values)
        .then(function(res){
          console.log(err);
          console.log(res2);
          sql="INSERT INTO compquestions (compInstId, t1) VALUES (?,?) ON DUPLICATE KEY UPDATE `t1`=?;";
          values=[row.compinstid, res.insertId, res.insertId];
          return connection.query(sql,values);
        })

      }
    });
    return Promise.all(parray);
  }));
})
.then(function(res){
  connection.end();
})
.catch(function(err){
  throw err;
})
