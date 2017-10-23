"use strict";
var Table = rootRequire('common/table');

class Questionpage extends Table {
    constructor(proto){
      super();
      this.tableName='questionpage';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true,},
         formOrder : { type: 'INT(11)',  notnull : true, value   : 0,},
         label : { type: 'VARCHAR(100)',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Questionpage;