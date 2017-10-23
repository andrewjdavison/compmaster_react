
var cm8DB = "cmlive";

var genTable = function(tableName, schema){

  var table = {
    autoIncrement: 0,
    // Return a promise to create a table...
    create : function(connection) {
      var tableName = this.tableName;
      var schema = this.schema;
      console.log('Creating table '+this.tableName);
      var sql = "DROP TABLE IF EXISTS "+cm8DB+".`"+tableName+"`;";
      var unique='';
      return connection.query(sql)
      .then(function(res){
        sql = "CREATE TABLE "+cm8DB+".`"+tableName+"` ( \
          `"+tableName+"Id` INT(11) NOT NULL AUTO_INCREMENT, ";
          for (var element of schema){
            sql = sql+'`'+element.name+'` '+element.type+',';
            if(element.unique==true){
              unique=unique+", UNIQUE INDEX `"+element.name+"` (`"+element.name+"`)";
            }
          }
        sql = sql + "    PRIMARY KEY (`"+tableName+"Id`)";
        sql = sql + unique;
        sql = sql+ ")\
        COLLATE='latin1_swedish_ci'\
        ENGINE=InnoDB\
        ;\
        ";
        return connection.query(sql);
      });
    },
    insertStr: function(connection, values){
      var schema = this.schema;
      var tableName = this.tableName;
      if(values.length == schema.length+1){
        if(values[0]>this.autoIncrement){
          this.autoIncrement = values[0];
        }
        columns="("+tableName+"Id";
        placeholders="(?";
      } else {
        columns="(";
        placeholders = "(";
      }

      sql = "INSERT INTO "+cm8DB+".`"+tableName+"` ";
      for(var element of schema){
        if(columns != '('){
          columns = columns+',';
          placeholders = placeholders+',';
        }
        columns = columns + element.name
        placeholders = placeholders+'?';
      }
      sql = sql + columns + ') VALUES '+placeholders+');'
      return sql;
//      return connection.query(sql,values);
    },
    insert: function(connection, values){
      var sql = this.insertStr(connection, values);
      return connection.query(sql,values);
    },
    finalise: function(connection){

      if(this.autoIncrement>0){
        this.autoIncrement = this.autoIncrement+1;
        console.log("Setting autoIncrement to "+this.autoIncrement);
        console.log("finished with table "+this.tableName);
        return connection.query("ALTER TABLE "+cm8DB+"`"+this.tableName+"` AUTO_INCREMENT="+this.autoIncrement+";");
      } else{
        console.log("finished with table "+this.tableName);
        return connection.query("select * from "+cm8DB+".`"+this.tableName+"`;");
      }

    }
  }
  table.tableName = tableName;
  table.schema = schema;
  return table;
}
module.exports = genTable;
