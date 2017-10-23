"use strict";
var Table = rootRequire('common/table');

class Entryresponse extends Table {
    constructor(model){
      super({
              tableName:'entryresponse',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 entryId : { type: 'INT(11)',  notnull : true, value   : 0,},
                 questionId : { type: 'INT(11)',  notnull : true, value   : 0,},
                 response : { type: 'VARCHAR(500)', },
            }
      });
      this.set(model);
  }
}

module.exports = Entryresponse;
