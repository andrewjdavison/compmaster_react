var config = require('config');
//var db = require('mysql');
var db = require('promise-mysql');
var fs = require('fs');

// Database models
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

function switchDatabase(database){
  connection.changeUser({database:database}, function(err){
    if(err) throw err;
  });
}

console.log('+========================================+');
console.log('| Importing data from CM6 clone database |');
console.log('|                                        |');
console.log('+========================================+');

var connection;
var maxUserID=0;
var ciRow;
var cRow;

db.createConnection({
  host      : config.get('Database.host'),
  user      : config.get('Database.user'),
  password  : config.get('Database.password'),
  database  : config.get('Database.database'),
  multipleStatements: true,
  debug     : false
})
.then(function(conn){
  connection= conn;
  console.log('Connected to database as id '+connection.threadId)
  switchDatabase(cm8DB);
  userTable.create(connection);
})
.then(function(res){

  switchDatabase(cm6DB);
  sql = "SELECT drpusers.pass, user.first_name, user.last_name, user.street_1, user.street_2, user.suburb, user.postcode, user.state, user.phone, user.username, user.email, user.looks_phoney, user.club, user.member_id, user.unlisted_club, user.judge_id, user.judge_level, user.judge_email, user.drupal_user_id, user.current_inst, user.regionid, user.usertype, user.sitemode FROM drpusers INNER JOIN user on user.drupal_user_id=drpusers.uid;;";
  return connection.query(sql);
})
.then(function(res){
  // Got the old user data. Populate the new table now...

  switchDatabase(cm8DB);
  for (var row of res){
    if(row.drupal_user_id > maxUserID){
      maxUserID = row.drupal_user_id;
    }

    var userData = [ row.drupal_user_id, row.username, row.pass, row.email, row.first_name, row.last_name, 0,
      row.looks_phoney, row.usertype, 0, 0, 0, row.street_1, row.street_2];

    sql = "INSERT INTO user (userID, userName, password, email, firstName, lastName, loginAttempts, blocked, \
           userType, permissions, lastLogin, lastLoginAttempt, street1, street2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);  "

    if(false){
      connection.query(sql,userData, function(err,rows){
        if(err){
          console.log(err);
        }
      })
      console.log("Imported: "+ userData[4] + ' ' + userData[5] + "(" + userData[2] + ")");

    }

  }
  // Now correct the autoincrement start...
  sql = "ALTER TABLE user AUTO_INCREMENT = "+(Number(maxUserID)+1);
  return connection.query(sql);
})
.then(function(res){
  console.log('Max UserID was set to '+maxUserID);
  console.log('Creating Question table');

  return questionTable.create(connection);
})
.then(function(res){
  console.log('Creating CompInstance table');
  return compinstanceTable.create(connection);
})
.then(function(res){
  switchDatabase(cm8DB);
  return regionTable.create(connection);
})
.then(function(res){
  return blurbTable.create(connection);
})
.then(function(res){
  return compquestionTable.create(connection);
})
.then(function(res){
  // Migrate the compInstance Data
  console.log('Migrating compInstance data');
  switchDatabase(cm6DB);
  sql = "SELECT * from compinstance INNER JOIN compdetails on compdetails.compinstid = compinstance.compinstid;";
  return connection.query(sql);
})
.then(function(res){
  switchDatabase(cm8DB);


  var t1=-1, t2=-1, t3=-1, t4=-1, t5=-1, t6=-1, sn1='', sn2='', sn3='', sn4='', bn1='', bn2='';
  var p = connection.query("SELECT * FROM compinstance;");
  for (var row of res){
    var values = [row.compinstid, row.compstate, row.instancetitle, row.address1, row.address2, row.city, row.state, row.postcode,
           row.country, row.mapref, row.contactphone + "<br>" + row.contactemail, row.startdate, row.enddate,
           row.basefee, row.discount1_value, row.discount2_value, row.discount3_value,
           row.categorylabel, row.categoryreq, row.subcategorylabel, row.subcategoryreq, row.entryopendate,
           row.entryclosedate, row.scoresheetid, row.scorefilepattern, row.paypalfixedfee, row.paypalvariablefee,
           row.compmasterfixedfee, row.compmastervariablefee, row.gst, row.entries,
           row.totallimit, row.tallymode, row.signature, row.offlinesignature, row.scoresheetsig, row.scoresheetversion,
         //  row.acceptingentries,
           row.resultspublished, row.requestingstaff, row.requestingjudges, row.requestingjudgeassistants,
           row.allowunpaid, row.lockscoresheet, row.validresults, row.lockofflinesheet, row.showsponsors,
           row.hideadmin, row.scoresheetsready ];
     p.then(function(result){
      var sql = compinstanceTable.insertStr(connection, values);
      console.log('Inserting another comp: ('+row.compinstid+') '+row.instancetitle+'...');
      connection.query(sql,values, function(err, result2){
        console.log(result2);
        console.log("Inserted as "+result2.insertId);
      })
     })
//    p.then( compinstanceTable.insert(connection, values))
//    .then(function(res){
//      console.log(res);
//      console.log('inserted as '+res.insertId);
//    });

//    if(row.compinstid == 22){
//      console.log('AAAAA');
//      console.log(values);
//    }
/*
    if(row.t1used>0){
      if(!row.t1default){
        row.t1default='';
      }
      values=[row.compinstid, '1', row.t1label, row.t1req, row.t1weight, row.t1default,
             row.t1judging, row.t1running, row.t1report, row.t1description, row.t1onlabel, row.t1offlineweight,
             row.t1used, row.t1usedoffline, ''  ];
      sql = questionTable.insertStr(connection, values);
      connection.query(sql,values, function(err,res){
        switchDatabase(cm8DB);
        sql = "INSERT INTO compquestions (compInstId, t1) VALUES (?,?) ON DUPLICATE KEY UPDATE `t1`=?;";
        values=[row.compinstid, res.insertId, res.insertId];
        p.then(connection.query(sql, values));
      })
    }
    if(row.t2used>0){
      if(!row.t2default){
        row.t2default='';
      }
      values=[row.compinstid, '1', row.t2label, row.t2req, row.t2weight, row.t2default,
             row.t2judging, row.t2running, row.t2report, row.t2description, row.t2onlabel, row.t2offlineweight,
             row.t2used, row.t2usedoffline, ''  ];
      sql = questionTable.insertStr(connection, values);
      connection.query(sql,values, function(err,res){
        switchDatabase(cm8DB);
        sql = "INSERT INTO compquestions (compInstId, t2) VALUES (?,?) ON DUPLICATE KEY UPDATE `t2`=?;";
        values=[row.compinstid, res.insertId, res.insertId];
        p.then(connection.query(sql, values));
      })
    }
    if(row.t3used>0){
      if(!row.t3default){
        row.t3default='';
      }
      values=[row.compinstid, '1', row.t3label, row.t3req, row.t3weight, row.t3default,
             row.t3judging, row.t3running, row.t3report, row.t3description, row.t3onlabel, row.t3offlineweight,
             row.t3used, row.t3usedoffline, ''  ];
      sql = questionTable.insertStr(connection, values);
      connection.query(sql,values, function(err,res){
        switchDatabase(cm8DB);
        sql = "INSERT INTO compquestions (compInstId, t3) VALUES (?,?) ON DUPLICATE KEY UPDATE `t3`=?;";
        values=[row.compinstid, res.insertId, res.insertId];
        p.then(connection.query(sql, values));
      })
    }
    if(row.t4sed>0){
      if(!row.t4efault){
        row.t4efault='';
      }
      values=[row.compinstid, '1', row.t4abel, row.t4eq, row.t4eight, row.t4efault,
             row.t4udging, row.t4unning, row.t4eport, row.t4escription, row.t4nlabel, row.t4fflineweight,
             row.t4sed, row.t4sedoffline, ''  ];
      sql = questionTable.insertStr(connection, values);
      connection.query(sql,values, function(err,res){
        switchDatabase(cm8DB);
        sql = "INSERT INTO compquestions (compInstId, t4 VALUES (?,?) ON DUPLICATE KEY UPDATE `t4=?;";
        values=[row.compinstid, res.insertId, res.insertId];
        p.then(connection.query(sql, values));
      })
    }
    if(row.t5used>0){
      if(!row.t5default){
        row.t5default='';
      }
      values=[row.compinstid, '1', row.t5label, row.t5req, row.t5weight, row.t5default,
             row.t5judging, row.t5running, row.t5report, row.t5description, row.t5onlabel, row.t5offlineweight,
             row.t5used, row.t5usedoffline, ''  ];
      sql = questionTable.insertStr(connection, values);
      connection.query(sql,values, function(err,res){
        switchDatabase(cm8DB);
        sql = "INSERT INTO compquestions (compInstId, t5) VALUES (?,?) ON DUPLICATE KEY UPDATE `t5`=?;";
        values=[row.compinstid, res.insertId, res.insertId];
        p.then(connection.query(sql, values));
      })
    }
    if(row.t6used>0){
      if(!row.t6default){
        row.t6default='';
      }
      values=[row.compinstid, '1', row.t6label, row.t6req, row.t6weight, row.t6default,
             row.t6judging, row.t6running, row.t6report, row.t6description, row.t6onlabel, row.t6offlineweight,
             row.t6used, row.t6usedoffline, ''  ];
      sql = questionTable.insertStr(connection, values);
      connection.query(sql,values, function(err,res){
        switchDatabase(cm8DB);
        sql = "INSERT INTO compquestions (compInstId, t6) VALUES (?,?) ON DUPLICATE KEY UPDATE `t6`=?;";
        values=[row.compinstid, res.insertId, res.insertId];
        p.then(connection.query(sql, values));
      })
    }
    if(row.sn1used>0){
      if(!row.sn1default){
        row.sn1default='';
      }
      values=[row.compinstid, '1', row.sn1label, row.sn1req, row.sn1weight, row.sn1default,
             row.sn1judging, row.sn1running, row.sn1report, row.sn1description, row.sn1onlabel, row.sn1offlineweight,
             row.sn1used, row.sn1usedoffline, ''  ];
      sql = questionTable.insertStr(connection, values);
      connection.query(sql,values, function(err,res){
        switchDatabase(cm8DB);
        sql = "INSERT INTO compquestions (compInstId, sn1) VALUES (?,?) ON DUPLICATE KEY UPDATE `sn1`=?;";
        values=[row.compinstid, res.insertId, res.insertId];
        p.then(connection.query(sql, values));
      })
    }
    if(row.sn2used>0){
      if(!row.sn2default){
        row.sn2default='';
      }
      values=[row.compinstid, '1', row.sn2label, row.sn2req, row.sn2weight, row.sn2default,
             row.sn2judging, row.sn2running, row.sn2report, row.sn2description, row.sn2onlabel, row.sn2offlineweight,
             row.sn2used, row.sn2usedoffline, ''  ];
      sql = questionTable.insertStr(connection, values);
      connection.query(sql,values, function(err,res){
        switchDatabase(cm8DB);
        sql = "INSERT INTO compquestions (compInstId, sn2) VALUES (?,?) ON DUPLICATE KEY UPDATE `sn2`=?;";
        values=[row.compinstid, res.insertId, res.insertId];
        p.then(connection.query(sql, values));
      })
    }
    if(row.sn3used>0){
      if(!row.sn3default){
        row.sn3default='';
      }
      values=[row.compinstid, '1', row.sn3label, row.sn3req, row.sn3weight, row.sn3default,
             row.sn3judging, row.sn3running, row.sn3report, row.sn3description, row.sn3onlabel, row.sn3offlineweight,
             row.sn3used, row.sn3usedoffline, ''  ];
      sql = questionTable.insertStr(connection, values);
      connection.query(sql,values, function(err,res){
        switchDatabase(cm8DB);
        sql = "INSERT INTO compquestions (compInstId, sn3) VALUES (?,?) ON DUPLICATE KEY UPDATE `sn3`=?;";
        values=[row.compinstid, res.insertId, res.insertId];
        p.then(connection.query(sql, values));
      })
    }
    if(row.sn4used>0){
      if(!row.sn4default){
        row.sn4default='';
      }
      values=[row.compinstid, '1', row.sn4label, row.sn4req, row.sn4weight, row.sn4default,
             row.sn4judging, row.sn4running, row.sn4report, row.sn4description, row.sn4onlabel, row.sn4offlineweight,
             row.sn4used, row.sn4usedoffline, ''  ];
      sql = questionTable.insertStr(connection, values);
      connection.query(sql,values, function(err,res){
        switchDatabase(cm8DB);
        sql = "INSERT INTO compquestions (compInstId, sn4) VALUES (?,?) ON DUPLICATE KEY UPDATE `sn4`=?;";
        values=[row.compinstid, res.insertId, res.insertId];
        p.then(connection.query(sql, values));
      })
    }
    if(row.bn1used>0){
      if(!row.bn1default){
        row.bn1default='';
      }
      values=[row.compinstid, '1', row.bn1label, row.bn1req, row.bn1weight, row.bn1default,
             row.bn1judging, row.bn1running, row.bn1report, row.bn1description, row.bn1onlabel, row.bn1offlineweight,
             row.bn1used, row.bn1usedoffline, ''  ];
      sql = questionTable.insertStr(connection, values);
      connection.query(sql,values, function(err,res){
        switchDatabase(cm8DB);
        sql = "INSERT INTO compquestions (compInstId, bn1) VALUES (?,?) ON DUPLICATE KEY UPDATE `bn1`=?;";
        values=[row.compinstid, res.insertId, res.insertId];
        p.then(connection.query(sql, values));
      })
    }
    if(row.bn2used>0){
      if(!row.bn2default){
        row.bn2default='';
      }
      values=[row.compinstid, '1', row.bn2label, row.bn2req, row.bn2weight, row.bn2default,
             row.bn2judging, row.bn2running, row.bn2report, row.bn2description, row.bn2onlabel, row.bn2offlineweight,
             row.bn2used, row.bn2usedoffline, ''  ];
      sql = questionTable.insertStr(connection, values);
      connection.query(sql,values, function(err,res){
        switchDatabase(cm8DB);
        sql = "INSERT INTO compquestions (compInstId, bn2) VALUES (?,?) ON DUPLICATE KEY UPDATE `bn2`=?;";
        values=[row.compinstid, res.insertId, res.insertId];
        p.then(connection.query(sql, values));
      })
    }

      if(row.blurb1 ){
        sql = "INSERT INTO `blurb` (compInstId, title, content, displayOrder) VALUES (?,?,?,?);";
        values=[row.compinstid, row.title1, row.blurb1, '1' ];
        p.then(connection.query(sql,values));
      }
      if(row.blurb2 ){
        sql = "INSERT INTO `blurb` (compInstId, title, content, displayOrder) VALUES (?,?,?,?);";
        values=[row.compinstid, row.title2, row.blurb2, '2' ];
        p.then(connection.query(sql,values));
      }
      if(row.blurb3 ){
        sql = "INSERT INTO `blurb` (compInstId, title, content, displayOrder) VALUES (?,?,?,?);";
        values=[row.compinstid, row.title3, row.blurb3, '3' ];
        p.then(connection.query(sql,values));
      }
      if(row.blurb4 ){
        sql = "INSERT INTO `blurb` (compInstId, title, content, displayOrder) VALUES (?,?,?,?);";
        values=[row.compinstid, row.title4, row.blurb4, '4' ];
        p.then(connection.query(sql,values));
      }
      if(row.blurb5 ){
        sql = "INSERT INTO `blurb` (compInstId, title, content, displayOrder) VALUES (?,?,?,?);";
        values=[row.compinstid, row.title5, row.blurb5, '5' ];
        p.then(connection.query(sql,values));
      }
     */
  }

    p.then(function(res){
    //  compinstanceTable.finalise(connection);
    });


  // Set the AUTO_INCREMENT numbers...

//   sql = "ALTER TABLE compinstanceTable AUTO_INCREMENT = "+(Number(maxCompInstId)+1);
//  return connection.query(sql);
    return p;
})
/*
.then(function(res){
  console.log('Importing Region Data');
  switchDatabase(cm6DB);
  sql =  " SELECT * from region";
  return connection.query(sql);
})
.then(function(res){
  switchDatabase(cm8DB);
  var maxRegionId =0;

  for(var row of res){
    if(row.regionid > maxRegionId){
      maxRegionId = row.regionid;
    }
    sql = "INSERT INTO region (regionId, regionLevel, regionParent, gst, timezone, \
    regionName) VALUES (?,?,?,?,?,?);";
    values = [row.regionid, row.regionlevel, row.regionparent, row.gst, row.timezone,
        row.regionname];

    connection.query(sql,values, function(err,rows){
      if(err){
        throw new Error(err);
      }
    });
  }
  sql = "ALTER TABLE region AUTO_INCREMENT = "+(Number(maxRegionId)+1);
  return connection.query(sql);
})
.then(function(res){
  switchDatabase(cm8DB);
  return clubTable.create(connection);
})
.then(function(res){
  switchDatabase(cm6DB);
  sql = "SELECT * FROM clubs;";
  return connection.query(sql);
})
.then(function(res){
  switchDatabase(cm8DB);
  var autoIncrement = 0;
  console.log('Migrating club data...');

  for(var row of res){
    if(row.clubid>autoIncrement){
      autoIncrement = row.clubid;
    }

    sql = "INSERT INTO club (name, clubId, regionId) VALUES (?,?,?);";
    values=[row.clubname, row.clubid, row.regionid ];

    connection.query(sql,values, function(err,rows){
      if(err){
        throw new Error(err);
      }
    });

  }
  sql = "ALTER TABLE club AUTO_INCREMENT = "+(Number(autoIncrement)+1);
  return connection.query(sql);
})
.then(function(res){
  console.log('Building award table...');
  return awardTable.create(connection);
})
.then(function(res){
  // Load the old award data
  sql = "SELECT * from award;";
  switchDatabase(cm6DB);
  return connection.query(sql);
})
.then(function(res){
  switchDatabase(cm8DB);
  var autoIncrement=0;

  for(var row of res){
    if(row.awardid > autoIncrement){
      autoIncrement=row.awardid;
    }
    sql = "INSERT INTO award (awardId, compInstId, displayOrder, name, \
           description, winner, sponsor) VALUES (?,?,?,?,?,?,?);";
    values = [row.awardid, row.compinstid, row.presentationOrder, row.awardName,
           row.awardDescription, row.awardWinner, row.awardSponsor ];
    connection.query(sql,values, function(err,rows){
      if(err){
        throw new Error(err);
      }
    });
  }
  sql = "ALTER TABLE award AUTO_INCREMENT = "+(Number(autoIncrement)+1);
  return connection.query(sql);
})
.then(function(res){
  return compauthTable.create(connection);
})
.then(function(res){
  console.log('trying an insert...');
  sql = "INSERT INTO compauth (compInstId, userId) VALUES (11,11);";
  return connection.query(sql);
})
.then(function(res){
  console.log('Migrating compauith data...');
  switchDatabase(cm6DB);
  sql = "SELECT * FROM compauth;";
  return connection.query(sql);
})
.then(function(res){
  switchDatabase(cm8DB);
  console.log(res);
  var p = connection.query("SELECT * from compauth;");

  for(var row of res){
    p.then(compauthTable.insert(connection, [
      row.compinstid,
      row.drupal_user_id,
      row.level
    ]));
  }

  console.log('promise built');
  return p;
})
.then(function(res){
  console.log('Building a category table');
  return categoryTable.create(connection);
})
.then(function(res){
   switchDatabase(cm6DB);

   sql = "SELECT * from compcategory;";
   return connection.query(sql);
})
.then(function(res){
  switchDatabase(cm8DB);

  var p = connection.query("select * from category;");
  for(var row of res) {
    p.then(categoryTable.insert(connection, [
      row.categoryid,
      row.compinstid,
      row.categoryname,
      row.firstprize,
      row.secondprize,
      row.thirdprize,
      row.categoryorder
    ]));
  }
  p.then(categoryTable.finalise(connection));
  return p;
})
.then(function(res){
  return subcategoryTable.create(connection);
})
.then(function(res){
  switchDatabase(cm6DB);
  sql = "SELECT * from compsubcategory;";
  return connection.query(sql);
})
.then(function(res){
  switchDatabase(cm8DB);

  var p = connection.query("select * from subcategory");
  for(var row of res){
    p.then(subcategoryTable.insert(connection, [
        row.subcategoryid,
        row.compinstid,
        row.subcategoryname,
        row.categoryid,
        row.subcategoryorder
    ]));
  }
  p.then(subcategoryTable.finalise(connection));
  return p;
})
.then(function(res){
  return sponsorTable.create(connection);
})
.then(function(res){
  switchDatabase(cm6DB);
  sql="SELECT * from sponsor;";
  return connection.query(sql);
})
.then(function(res){
  switchDatabase(cm8DB);

  var p = connection.query("SELECT * from sponsor");
  for(var row of res){
    p.then(sponsorTable.insert(connection,[
      row.sponsorid,
      row.sponsorname,
      row.sponsorblurb,
      row.sponsorlinksm,
      row.sponsorlinklg,
      row.sponsorimgsm,
      row.sponsorimglg,
      row.uselink,
      row.clickthrough
    ]))
  }
  p.then(sponsorTable.finalise(connection));
  return p;

})
.then(function(res){
  switchDatabase(cm8DB);
  return compjudgeTable.create(connection);
})
.then(function(res){
  switchDatabase(cm6DB);
  sql = "SELECT * FROM compjudges;";
  return connection.query(sql);
})
.then(function(res){
  switchDatabase(cm8DB);
  var p = connection.query("SELECT * from compjudge;");
  for(var row of res){
    p.then(compjudgeTable.insert(connection, [
      row.compinstid,
      row.categoryid,
      row.subcategoryid,
      row.judgeid,
      row.drupal_user_id
    ])) ;
  }

  p.then(compjudgeTable.finalise(connection));
  return p;
})
.then(function(res){
  switchDatabase(cm8DB);
  return clubdiscountTable.create(connection);
})
.then(function(res){
  switchDatabase(cm6DB);
  sql = "SELECT * FROM compdiscounteligibility;";
  return connection.query(sql);
})
.then(function(res){
  switchDatabase(cm8DB);

  var p = connection.query("SELECT * FROM clubdiscount");
  for(var row of res){
    p.then(clubdiscountTable.insert(connection, [
      row.compinstid,
      row.clubid
    ]));
  }
  p.then(clubdiscountTable.finalise(connection));
  return p;
})
.then(function(res){
  switchDatabase(cm8DB);
  return flightTable.create(connection);
})
.then(function(res){
  switchDatabase(cm8DB);
  return flightjudgeTable.create(connection);
})
.then(function(res){
  switchDatabase(cm8DB);
  return entryTable.create(connection);
})
.then(function(res){
  switchDatabase(cm8DB);
  return entryresponseTable.create(connection);
})
.then(function(res){
  switchDatabase(cm6DB);
  sql = "SELECT * from compentryform;";
  return connection.query(sql);
})
.then(function(res){
  switchDatabase(cm8DB);
  var p = connection.query("SELECT * FROM entry;");
  for(var row of res){
    p.then(entryTable.insert(connection, [
      row.entryformid,
      row.compinstid,
      row.entrynumber,
      row.payment_pending,
      row.paid,
      row.entrydate,
      row.entrytype,
      row.categoryid,
      row.subcategoryid,
      row.tie1,
      row.tie2,
      row.tie3,
      row.tie4,
      row.tie5,
      row.tie6,
      row.tie7,
      row.tie8,
      row.tie9,
      row.tie10,
      row.entrantid,
      row.securityid,
      row.cost,
      row.cancelled,
      row.clubid,
      row.sessionorder,
      row.totalscore,
      row.adminrank,
      row.bulktransactionid,
      row.labelimage
    ]));

  }
  p.then(entryTable.finalise(connection));
  return p;
})
*/
.then(function(res){

  connection.end();
})
.catch(function(err){
  console.log('Error connecting to database: '+err.stack);
  throw new Error(err);
});



//Al Jr 0419 300 604
//Loraine 0418 448 942
