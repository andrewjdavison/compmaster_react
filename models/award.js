"use strict";
var Table = rootRequire('common/table');

class Award extends Table {
    constructor(model){
      super({
              tableName:'award',
              schema : {
                 compInstId : { type: 'INT (11)',  notnull : true,},
                 displayOrder : { type: 'INT(11)',  notnull : true,},
                 name : { type: 'VARCHAR(100)',  notnull : true,},
                 description : { type: 'VARCHAR(300)',  notnull : true,},
                 winner : { type: 'VARCHAR(300)',  notnull : true,},
                 sponsor1 : { type: 'INT(11)',  notnull : true,},
                 sponsor2 : { type: 'INT(11)',  notnull : true,},
                 sponsor3 : { type: 'INT(11)',  notnull : true,},
            }
      });
      this.set(model);
  }
}

module.exports = Award;
