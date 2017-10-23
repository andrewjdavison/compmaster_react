"use strict";
var Table = rootRequire('common/table');

class Compjudge extends Table {
    constructor(proto){
      super();
      this.tableName='compjudge';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true,},
         categoryId : { type: 'INT(11)',  notnull : true, value   : 0,},
         subcategoryId : { type: 'INT(11)',  notnull : true, value   : 0,},
         judgeId : { type: 'INT(11)',  notnull : true,},
         userId : { type: 'INT(11)',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Compjudge;