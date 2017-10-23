"use strict";
var Table = rootRequire('common/table');

class Award extends Table {
    constructor(proto){
      super();
      this.tableName='award';
      this.schema = {
         compInstId : { type: 'INT (11)',  notnull : true,},
         displayOrder : { type: 'INT(11)',  notnull : true,},
         name : { type: 'VARCHAR(100)',  notnull : true,},
         description : { type: 'VARCHAR(300)',  notnull : true,},
         winner : { type: 'VARCHAR(300)',  notnull : true,},
         sponsor : { type: 'VARCHAR(300)',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Award;