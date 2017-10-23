"use strict";
var Table = rootRequire('common/table');

class Questionpage extends Table {
    constructor(model){
      super({
              tableName:'questionpage',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 formOrder : { type: 'INT(11)',  notnull : true, value   : 0,},
                 label : { type: 'VARCHAR(100)',  notnull : true,},
                 catId : { type: 'VARCHAR(50)', notnull : true,},
            }
      });
      this.set(model);
  }
}

module.exports = Questionpage;
