"use strict";
var Table = rootRequire('common/table');

class Flightjudge extends Table {
    constructor(model){
      super({
              tableName:'flightjudge',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true, value   : 0,},
                 flightId : { type: 'INT(11)',  notnull : true, value   : 0,},
                 judgeId : { type: 'INT(11)',  notnull : true, value   : 0,},
            }
      });
      this.set(model);
  }
}

module.exports = Flightjudge;
