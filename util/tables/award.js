var table = {
  // Return a promise to create a table...
  create : function(connection) {
    var sql = "DROP TABLE IF EXISTS award;";
    return connection.query(sql)
    .then(function(res){
      sql = "CREATE TABLE `award` ( \
        `awardId` INT(11) NOT NULL AUTO_INCREMENT,\
        `compInstId` INT(11) NOT NULL ,\
        `displayOrder` INT(11) NOT NULL DEFAULT '0',\
        `name` VARCHAR(100) NOT NULL,\
        `description` VARCHAR(300) NOT NULL,\
        `winner` VARCHAR(300) NOT NULL,\
        `sponsor` VARCHAR(300) NOT NULL,\
      \
          PRIMARY KEY (`awardId`)\
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
