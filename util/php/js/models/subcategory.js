"use strict";
var Table = rootRequire('common/table');

class Subcategory extends Table {
    constructor(proto){
      super();
      this.tableName='subcategory';
      this.schema = {
         compInstId : { type: 'INT(11)',  notnull : true,},
         subcategoryName : { type: 'VARCHAR(100)', },
         subcategoryCode : { type: 'VARCHAR(100)', },
         categoryId : { type: 'INT(11)',  notnull : true,},
         subcategoryOrder : { type: 'INT(11)',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Subcategory;