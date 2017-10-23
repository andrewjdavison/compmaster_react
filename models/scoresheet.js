"use strict";
var Table = rootRequire('common/table');

class Scoresheet extends Table {
    constructor(model){
      super({
              tableName:'scoresheet',
              schema : {
                 entryId : { type: 'INT (11)',  notnull : null,},
                 judgeId : { type: 'INT (11)',  notnull : null,},
                 scanId : { type: 'INT (11)',  notnull : null,},
                 total : { type: 'FLOAT',  notnull : null,},
                 s1 : { type: 'FLOAT',  notnull : null,},
                 s2 : { type: 'FLOAT',  notnull : null,},
                 s3 : { type: 'FLOAT',  notnull : null,},
                 s4 : { type: 'FLOAT',  notnull : null,},
                 s5 : { type: 'FLOAT',  notnull : null,},
                 s6 : { type: 'FLOAT',  notnull : null,},
                 s7 : { type: 'FLOAT',  notnull : null,},
                 s8 : { type: 'FLOAT',  notnull : null,},
                 s9 : { type: 'FLOAT',  notnull : null,},
                 s10 : { type: 'FLOAT',  notnull : null,},
                 adminRank : { type: 'INT (11)',  notnull : null,},
                 secureId : { type: 'VARCHAR(20)',  notnull : null,},
                 compInstId : { type: 'BIGINT(11)',  notnull : null,},
            }
      });
      this.set(model);
  }
}

module.exports = Scoresheet;
