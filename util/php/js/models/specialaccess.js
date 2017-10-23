"use strict";
var Table = rootRequire('common/table');

class Specialaccess extends Table {
    constructor(proto){
      super();
      this.tableName='specialaccess';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true,},
         userId : { type: 'INT(11)',  notnull : true, value   : 0,},
         expires : { type: 'TIMESTAMP',  notnull : true, value   : CURRENT_TIMESTAMP,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Specialaccess;