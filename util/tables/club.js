var table = {
  // Return a promise to create a table...
  create : function(connection) {
    var sql = "DROP TABLE IF EXISTS club;";
    return connection.query(sql)
    .then(function(res){
      sql = "CREATE TABLE `club` ( \
        `clubId` INT(11) NOT NULL AUTO_INCREMENT,\
        `name` VARCHAR(100) NOT NULL,\
        `regionId` INT(11) NOT NULL,\
        `displayOrder` INT(11) NOT NULL DEFAULT '0',\
      \
          PRIMARY KEY (`clubId`)\
      )\
      COLLATE='latin1_swedish_ci'\
      ENGINE=InnoDB\
      ;\
      ";
      return connection.query(sql);
    })
    .catch(function(err){
      throw new Error(err);
    })
  }
}


module.exports = table;
