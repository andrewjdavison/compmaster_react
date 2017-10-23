"use strict";
var Table = rootRequire('common/table');

class Flightjudge extends Table {
    constructor(proto){
      super();
      this.tableName='flightjudge';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true, value   : 0,},
         flightId : { type: 'INT(11)',  notnull : true, value   : 0,},
         judgeId : { type: 'INT(11)',  notnull : true, value   : 0,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Flightjudge;