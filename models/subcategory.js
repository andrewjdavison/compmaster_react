"use strict";
var Table = rootRequire('common/table');

class Subcategory extends Table {
    constructor(model){
      super({
              tableName:'subcategory',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 subcategoryName : { type: 'VARCHAR(100)', },
                 subcategoryCode : { type: 'VARCHAR(100)', },
                 categoryId : { type: 'INT(11)',  notnull : true,},
                 subcategoryOrder : { type: 'INT(11)',  notnull : true,},
            }
      });
      this.set(model);
  }
}

module.exports = Subcategory;
