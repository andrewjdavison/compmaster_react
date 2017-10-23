"use strict";
var Table = rootRequire('common/table');

class Sponsor extends Table {
    constructor(proto){
      super();
      this.tableName='sponsor';
      this.schema = {
         name : { type: 'VARCHAR(100)', },
         blurb : { type: 'VARCHAR(500)', },
         smLink : { type: 'VARCHAR(300)', },
         lgLink : { type: 'VARCHAR(300)', },
         smImg : { type: 'VARCHAR(300)', },
         lgImg : { type: 'VARCHAR(300)', },
         useLink : { type: 'INT (11)',  notnull : true,},
         clickthrough : { type: 'VARCHAR(300)',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Sponsor;