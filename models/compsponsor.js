"use strict";
var Table = rootRequire('common/table');

class Compsponsor extends Table {
    constructor(model){
      super({
              tableName:'compsponsor',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 sponsorId : { type: 'INT(11)',  notnull : true, value   : 0,},
                 sponsorCategory : { type: 'INT(11)',  notnull : false,},
                 sponsorType : { type: 'INT(11)',  notnull : true,},
            }
      });
      this.set(model);
  }
}

module.exports = Compsponsor;
