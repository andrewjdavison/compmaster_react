"use strict";
var Table = rootRequire('common/table');

class Staff extends Table {
    constructor(proto){
      super();
      this.tableName='staff';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true,},
         userId : { type: 'INT(11)',  notnull : true, value   : 0,},
         notes : { type: 'VARCHAR(500)', },
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Staff;