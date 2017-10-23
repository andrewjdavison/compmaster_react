"use strict";
var Table = rootRequire('common/table');

class Blurb extends Table {
    constructor(proto){
      super();
      this.tableName='blurb';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true,},
         title : { type: 'VARCHAR(100)',  notnull : true,},
         content : { type: 'VARCHAR(500)',  notnull : true,},
         displayOrder : { type: 'INT(11)',  notnull : true, value   : 0,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Blurb;