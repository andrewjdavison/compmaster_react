"use strict";
var Table = rootRequire('common/table');

class Category extends Table {
    constructor(proto){
      super();
      this.tableName='category';
      this.schema = {
         compInstId : { type: 'INT (11)',  notnull : true,},
         categoryName : { type: 'VARCHAR(100)',  notnull : true,},
         categoryCode : { type: 'VARCHAR(100)',  notnull : true,},
         firstPrize : { type: 'VARCHAR(300)', },
         secondPrize : { type: 'VARCHAR(300)', },
         thirdPrize : { type: 'VARCHAR(300)', },
         displayOrder : { type: 'INT (11)',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Category;