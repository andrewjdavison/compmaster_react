"use strict";
var Table = rootRequire('common/table');

class Compjudge extends Table {
    constructor(model){
      super({
              tableName:'compjudge',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 categoryId : { type: 'INT(11)',  notnull : true, value   : 0,},
                 subcategoryId : { type: 'INT(11)',  notnull : true, value   : 0,},
                 judgeId : { type: 'INT(11)',  notnull : true,},
                 userId : { type: 'INT(11)',  notnull : true,},
            }
      });
      this.set(model);
  }
}

module.exports = Compjudge;
