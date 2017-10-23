"use strict";
var Table = rootRequire('common/table');

class Compauth extends Table {
    constructor(proto){
      super();
      this.tableName='compauth';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true,},
         userId : { type: 'INT(11)',  notnull : true,},
         level : { type: 'INT(11)',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Compauth;