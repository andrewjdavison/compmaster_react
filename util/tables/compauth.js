var tableName='compauth';
var schema = [
  {name: 'compInstId', type: 'INT (11) NOT NULL', origin: 'compinstid'},
  {name: 'userId', type: 'INT (11) NOT NULL', origin: 'drupal_user_id'},
  {name: 'level', type: 'INT (11) NOT NULL', origin: 'level'}
];

var table = {
  autoIncrement: 0,
  // Return a promise to create a table...
  create : function(connection) {
    var sql = "DROP TABLE IF EXISTS "+tableName+";";
    return connection.query(sql)
    .then(function(res){
      sql = "CREATE TABLE `"+tableName+"` ( \
        `"+tableName+"Id` INT(11) NOT NULL AUTO_INCREMENT, ";
        for (var element of schema){
          sql = sql+'`'+element.name+'` '+element.type+',';
        }
      sql = sql + "    PRIMARY KEY (`"+tableName+"Id`)\
      )\
      COLLATE='latin1_swedish_ci'\
      ENGINE=InnoDB\
      ;\
      ";
      return connection.query(sql);
    })
  },
  insert: function(connection, values){
    sql = "INSERT INTO `"+tableName+"` ";
    var columns = "(";
    var placeholders = "(";
    for(var element of schema){
      if(columns != '('){
        columns = columns+',';
        placeholders = placeholders+',';
      }
      columns = columns + element.name
      placeholders = placeholders+'?';
    }
    sql = sql + columns + ') VALUES '+placeholders+');'
    var sql="INSERT INTO compauth (compInstId, userId, level) \
             VALUES (?,?,?);";

    return connection.query(sql,values);
  }
}


module.exports = table;
