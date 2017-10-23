var config = require('config');
var express = require('express');
var mysql = require('mysql');
var db = require('mysql-promise')();

//console.log('Database Driver loading for database: '+config.get('Database.database'));
db.configure({
  "host": config.get('Database.host'),
  "user": config.get('Database.user'),
  "password": config.get('Database.password'),
  "database": config.get('Database.database'),
  "debug" : config.get('Database.debug'),
  "dateStrings": false
});


/*
db.loadCompetitionHeirarchy = function(compInstId){
  var heirarchy;
  var category;
  var state=0;
  var p;
  var cats;
  var subcats;

  sql = "SELECT * FROM category WHERE compInstId="+compInstId+" ORDER BY displayOrder;";
  p= db.query(sql)
  .then(function(res){
    cats = res[0];
    return Promise.all((res[0].map(function(category){
      sql = "SELECT * FROM subcategory WHERE categoryId="+category.categoryId+" ORDER BY subcategoryOrder;";
      return db.query(sql);
    })));
  })
  .then(function(res){
    var subcats={};

    for(i=0;i<res.length;i++){
      catId = res[i][0][0].categoryId;
      subcats[catId]=res[i][0];
    }

    heirarchy = {
      cats: cats,
      subcats: subcats
    };
    return heirarchy;;
  })
  .catch(function(err){
    console.log("Error");
    console.log(err);
    throw new Error(err);
  })
  return p;
}


db.loadCompInstance = function(compInstId){
  sql = "SELECT * FROM compInst where compInstId="+compInstId+";";
  return db.query(sql)
  .then(function(res){
    return res[0];
  });
}

db.loadClubs = function(){
  sql = "SELECT * FROM club;";
  return db.query(sql)
  .then(function(res){
    return res[0];
  });
}
*/

module.exports = db;

