"use strict";
var Table = rootRequire('common/table');

class Club extends Table {
    constructor(proto){
      super();
      this.tableName='club';
      this.schema = {
         name : { type: 'VARCHAR(100)',  notnull : true,},
         regionId : { type: 'INT(11)',  notnull : true,},
         displayOrder : { type: 'INT (11)',  notnull : true, value   : 0,},
         img : { type: 'VARCHAR(100)',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Club;