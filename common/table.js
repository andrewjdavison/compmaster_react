"use strict";

var db = rootRequire('common/db');
var config = require('config');
var responder = rootRequire('common/responder');
var moment = require('moment');

class Table {
  constructor(proto){
    this.id=null;
    for(var key of Object.keys(proto)){
      if(typeof proto[key] !== 'undefined'){
        this[key] = proto[key];
      }
    }
  }

  set(proto){
    if(typeof proto !== 'undefined') {
      for(var key of Object.keys(this.schema)){
        if(typeof proto[key] !== 'undefined'){
          this[key] = proto[key];
        }
      }
      if(typeof proto['id'] !== 'undefined'){
        this['id'] = proto['id'];
      }
    }
  }

  build(rebuild, drop){
    rebuild = typeof rebuild !== 'undefined' ? rebuild:config.get('Database.rebuild');
    drop = typeof drop !== 'undefined' ? drop:config.get('Database.drop');

    var query = 'SELECT COUNT(*) FROM information_schema.tables WHERE table_schema=\''+config.get('Database.database')+'\' and table_name = \''+this.tableName + '\';';
    var p=db.query(query)
    .then((res)=> {
      query='';
      var tableCount = res[0][0][`COUNT(*)`];
      if(config.get('Database.rebuild')){
        if(tableCount === 1){
          if(config.get('Database.drop')) {
            query = 'DROP TABLE ' + this.tableName + ';';
            return db.query(query);
          }
        }
      }
      return res;
    })
    .then((res) => {
      var indicies=0;
      var indexStr=null;
      if(config.get('Database.rebuild')){
//        console.log('Rebuilding Database');

        // Create the table
        query = 'CREATE TABLE `' + this.tableName + '` (';
        query = query + ' `id` INT(11) NOT NULL AUTO_INCREMENT, ';

        for (var key of Object.keys(this.schema)){
          query = query + ' `'+ key + '` ' + this.schema[key].type + ' ';
          if("notnull" in this.schema[key]){
            query = query + 'NOT NULL ' + ' ';
          }
          if("autoincrement" in this.schema[key]){
            query = query + 'AUTO_INCREMENT ';
          }
          query = query + ',';
          if("unique" in this.schema[key]){
            indicies=indicies+1;
            if(indicies=1) {
              indexStr = 'UNIQUE INDEX `Index ' + indicies + '` (`' + key + '`)';
            } else {
              indexStr = indexStr+',UNIQUE INDEX `Index ' + indicies + '` (`' + key + '`)';
            }
          }
        }
        query = query + 'PRIMARY KEY (`id`)';
        if(indexStr) {
          query = query + ','+indexStr;
        }
        query = query + ') COLLATE=\'latin1_swedish_ci\' ENGINE=InnoDB;';
        return db.query(query);
      }
    })
    .then((result)=>{
      return result;
    })
    .catch(function(err){
      console.log("Query Error: " + query);
      throw new Error(err);
    });
    return p;

  }

  connections(){
    return db.pool._allConnections.length;
  }

  transmuteOut(){
    for(var key of Object.keys(his.schema)){

    }
  }

  save(model){
    var columnStr = '';
    var valueStr = '';
    var updateStr = '';
    var saveResult = {};
    let _this = this;

    if(typeof model !== 'undefined'){
          _this.set(model);
    }
    for (var key of Object.keys(_this.schema)){
     if(columnStr=='') {
        if((key in _this) && (_this[key]) !== null){
          columnStr = key ;
          // If _this is a boolean, don't quote the value...
          if(_this.schema[key].type==="TINYINT (1)"){
            valueStr = _this[key] ;
            updateStr = key + '=' + _this[key];
          } else if (_this.schema[key].type=="TIMESTAMP") {
            // Convert the value into a valid MYSQL timestampj
            var date = moment(_this[key]).format('YYYY-MM-DD H:mm:ss');
            valueStr = '\''+date+'\'' ;
            updateStr = key + '=\'' + date+'\'';

          } else {
            valueStr = '\''+_this[key]+'\'' ;
            updateStr = key + '=\'' + _this[key]+'\'';
          }
        }
      } else {
        if((key in _this) && (_this[key]) !== null){
          columnStr = columnStr + ',' + key;
          // If _this is a boolean, don't quote the value...
          if(_this.schema[key].type=="TINYINT (1)"){
            valueStr = valueStr + ',' + _this[key];
            updateStr = updateStr + ', '+ key + '=' + _this[key] ;
          } else if (_this.schema[key].type=="TIMESTAMP") {
            // Convert the value into a valid MYSQL timestampj
            var date = moment(_this[key], "YYYY-MM-DD H:mm:ss").format('YYYY-MM-DD H:mm:ss');
            valueStr = valueStr + ',\''+date+'\'' ;
            updateStr = updateStr +', '+ key + '=\'' + date+'\'';

          } else {
            valueStr = valueStr + ',\'' + _this[key]+ '\'';
            updateStr = updateStr + ', '+ key + '=\'' + _this[key] + '\'';

          }
        }
      }
    }

    if(_this.id){
      columnStr = columnStr + ',' + 'id';
      valueStr = valueStr + ',' + _this.id;
    }

    var json=_this.json();

    var query = "INSERT INTO " + _this.tableName + ' ' + '(' + columnStr + ') ' + 'VALUES (' + valueStr +') ON DUPLICATE KEY UPDATE '+updateStr;
//  console.log(query);
    return  db.query(query)
    .then ((res) => {
      if(json.id === null){
        json.id = res[0].insertId;
      }
      // TODO: MAke sure it worked...

      //console.log(_this);
      //console.log('==================');
      //console.log(json);
      //console.log('------------------');
      //console.log(_this.json());
      //console.log('==================');

      //NOTE:
      //   This promise was resolving with "this" to be modified to the latest resololved instance, rather
      //   than the instance that generated the promise, so I've captured the correct json befor resolving the promise
      //   to return.
      return json;
    })
    .catch(function(err){
      throw new Error(err);
    });
  }

  load(id){
    id = typeof id !== 'undefined' ? id:null;

    var columnStr = '';
    for (var key of Object.keys(this.schema)){
      if(columnStr=='') {
        columnStr = key;
      } else {
        columnStr = columnStr + ',' + key;
      }
    }
    var idStr = '';
    if(id){
      idStr = ' where `id` = ' + id;
    }

    var query = 'SELECT ' + columnStr + ' FROM ' + this.tableName + idStr;
    return db.query(query)
    .then((res) => {
      this.id = id;
      for(var key of Object.keys(this.schema)){
        this[key] = res[0][0][key];
      }
//      console.log('---------------------');
//      console.log('Loaded this data:');
//      console.log(this);
//      console.log('---------------------');
      return true;
    })
    .catch(function(err){
      console.log("Error: " + err);
      throw new Error(err);
    });
  }

  find(model,sort, returnFields){
    sort = sort || 0;
    returnFields = returnFields || 0;

    var valueStr='';

    var columnStr = '';
    for (var key of Object.keys(this.schema)){
      if(columnStr=='') {
        columnStr = key;
      } else {
        columnStr = columnStr + ',' + key;
      }
    }

    var query = 'SELECT `id`,' + columnStr + ' FROM ' + this.tableName;
//    console.log(query);

    if(model){

      for(var key of Object.keys(model)){
        if(valueStr != '') valueStr = valueStr + ' AND ';


        var modelData = model[key];
        var op=' = ';

        if(modelData.hasOwnProperty('op')){
//          console.log('Looks like we\'re trying to define the operator here!');

          var md = modelData;
          op = md.op;
          modelData = md.data;
        }

        if(Array.isArray(modelData)){
          valueStr = valueStr + "`"+key+"` IN (";
          for(var i=0;i<modelData.length;i++){
            if(i>0){
              valueStr = valueStr+",";
            }
            valueStr = valueStr+modelData[i];
          }
          valueStr = valueStr+") ";

        } else {
          valueStr = valueStr + "`"+key+"` " + op + " '" + modelData + "' ";
        }
      }
      var cols="";

      if(returnFields){
        for(var i=0;i<returnFields.length;i++){
          if(cols==''){
            cols=returnFields[i];
          } else {
            cols = cols + ',' + returnFields[i];
          }
        }
      } else {
        cols='*';
      }

      var query = "SELECT "+cols+"  FROM " + this.tableName;
      if(valueStr != '')
        query = query + " WHERE " + valueStr;
    }
    if(sort){
      var asc = sort.asc || 0;
      query = query + ' ORDER BY ' + sort.field  ;
      if(asc){
        query = query + ' ASC';
      } else {
        query = query + ' DESC';
      }

    }

    console.log(query);

    return db.query(query)
    .then((res)=>{
      var allResults = [];
      for(var result of res[0]){
        var e={};
        for(var key of Object.keys(result)){
          e[key] = result[key];
        }
        allResults.push(e);
      }
      /*
      console.log('---------------------');
      console.log('Loaded this data:');
      console.log(allResults);
      console.log('---------------------');
      */
      return allResults;;
    })
    .catch(function(err){
      console.log("Error: " + err);
      throw new Error(err);
    });

  }

  version(){

    console.log('Version A');
  }


  findOne(model){

    var valueStr='';

    for(var key of Object.keys(model)){
      if(valueStr != '') valueStr = valueStr + ' AND ';
      valueStr = valueStr + "`"+key+"` = '" + model[key] + "' ";
    }

    var query = "SELECT * FROM " + this.tableName;
    if(valueStr != '')
      query = query + " WHERE " + valueStr;

    query = query+';';
//    console.log(query);
    return db.query(query)
    .then((res)=>{
      if(res[0].length==0) return null;
      for(var key of Object.keys(this.schema)) {
        this[key] = res[0][0][key];
      }
      this.id = res[0][0].id;
      return this.json();
    })
    .catch((err)=>{
      throw new Error(err);
    });

  }

  json(){
    var json={};
    json.id = this.id;
    for(var key of Object.keys(this.schema)){
      json[key] = this[key];
    }
    return json;
  }
}

module.exports = Table;
