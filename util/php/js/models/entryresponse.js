"use strict";
var Table = rootRequire('common/table');

class Entryresponse extends Table {
    constructor(proto){
      super();
      this.tableName='entryresponse';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true,},
         entryId : { type: 'INT(11)',  notnull : true, value   : 0,},
         questionId : { type: 'INT(11)',  notnull : true, value   : 0,},
         reponse : { type: 'VARCHAR(500)', },
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Entryresponse;