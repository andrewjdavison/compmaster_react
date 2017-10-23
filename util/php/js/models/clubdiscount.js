"use strict";
var Table = rootRequire('common/table');

class Clubdiscount extends Table {
    constructor(proto){
      super();
      this.tableName='clubdiscount';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true,},
         clubId : { type: 'INT(11)',  notnull : true, value   : 0,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Clubdiscount;