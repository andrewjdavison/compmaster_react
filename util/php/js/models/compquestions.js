"use strict";
var Table = rootRequire('common/table');

class Compquestions extends Table {
    constructor(proto){
      super();
      this.tableName='compquestions';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true,},
         t1 : { type: 'INT(11)',  notnull : true,},
         t2 : { type: 'INT(11)',  notnull : true,},
         t3 : { type: 'INT(11)',  notnull : true,},
         t4 : { type: 'INT(11)',  notnull : true,},
         t5 : { type: 'INT(11)',  notnull : true,},
         t6 : { type: 'INT(11)',  notnull : true,},
         sn1 : { type: 'INT(11)',  notnull : true,},
         sn2 : { type: 'INT(11)',  notnull : true,},
         sn3 : { type: 'INT(11)',  notnull : true,},
         sn4 : { type: 'INT(11)',  notnull : true,},
         bn1 : { type: 'INT(11)',  notnull : true,},
         bn2 : { type: 'INT(11)',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Compquestions;