"use strict";
var Table = rootRequire('common/table');

class Compauth extends Table {
    constructor(model){
      super({
              tableName:'compauth',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 userId : { type: 'INT(11)',  notnull : true,},
                 level : { type: 'INT(11)',  notnull : true,},
            }
      });
      this.set(model);
  }
}

module.exports = Compauth;
