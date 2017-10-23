"use strict";
var Table = rootRequire('common/table');

class Compsponsor extends Table {
    constructor(proto){
      super();
      this.tableName='compsponsor';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true,},
         sponsorId : { type: 'INT(11)',  notnull : true, value   : 0,},
         sponsorCategory : { type: 'INT(11)',  notnull : false,},
         sponsorType : { type: 'INT(11)',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Compsponsor;