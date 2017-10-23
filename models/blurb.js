"use strict";
var Table = rootRequire('common/table');

class Blurb extends Table {
    constructor(model){
      super({
              tableName:'blurb',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 title : { type: 'VARCHAR(100)',  notnull : true,},
                 content : { type: 'VARCHAR(5000)',  notnull : true,},
                 displayOrder : { type: 'INT(11)',  notnull : true, value   : 0,},
            }
      });
      this.set(model);

  }
}

module.exports = Blurb;
