"use strict";
var Table = rootRequire('common/table');

class Flight extends Table {
    constructor(proto){
      super();
      this.tableName='flight';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true,},
         notes : { type: 'VARCHAR(500)',  notnull : true,},
         judges : { type: 'INT(11)',  notnull : true, value   : 0,},
         categoryId : { type: 'INT(11)',  notnull : true, value   : 0,},
         subcategoryId : { type: 'INT(11)',  notnull : true, value   : 0,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Flight;