"use strict";
var Table = rootRequire('common/table');

class Sponsor extends Table {
    constructor(model){
      super({
              tableName:'sponsor',
              schema : {
                 name : { type: 'VARCHAR(100)', },
                 blurb : { type: 'VARCHAR(500)', },
                 smLink : { type: 'VARCHAR(300)', },
                 lgLink : { type: 'VARCHAR(300)', },
                 smImg : { type: 'VARCHAR(300)', },
                 lgImg : { type: 'VARCHAR(300)', },
                 useLink : { type: 'INT (11)',  notnull : true,},
                 clickthrough : { type: 'VARCHAR(300)',  notnull : true,},
            }
      });
      this.set(model);
  }
}

module.exports = Sponsor;
