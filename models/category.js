"use strict";
var Table = rootRequire('common/table');

class Category extends Table {
    constructor(model){
      super({
              tableName:'category',
              schema : {
                 compInstId : { type: 'INT (11)',  notnull : true,},
                 categoryName : { type: 'VARCHAR(100)',  notnull : true,},
                 categoryCode : { type: 'VARCHAR(100)',  notnull : true,},
                 firstPrize : { type: 'VARCHAR(300)', },
                 secondPrize : { type: 'VARCHAR(300)', },
                 thirdPrize : { type: 'VARCHAR(300)', },
                 displayOrder : { type: 'INT (11)',  notnull : true,},
                 scoreTemplate : { type: 'INT (11)', notnull : true,},
                 sponsor1 : { type: 'INT (11)', notnull : true,},
                 sponsor2 : { type: 'INT (11)', notnull : true,},
                 sponsor3 : { type: 'INT (11)', notnull : true,},
            }
      });
      this.set(model);
  }
}

module.exports = Category;
