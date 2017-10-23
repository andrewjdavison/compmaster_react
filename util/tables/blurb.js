var table = {
  // Return a promise to create a table...
  create : function(connection) {
    var sql = "DROP TABLE IF EXISTS blurb;";
    return connection.query(sql)
    .then(function(res){
      sql = "CREATE TABLE `blurb` ( \
        `blurbId` INT(11) NOT NULL AUTO_INCREMENT,\
        `compInstId` INT(11) NOT NULL, \
        `title` VARCHAR(100) NOT NULL,\
        `content` VARCHAR(500) NOT NULL,\
        `displayOrder` INT(11) NOT NULL DEFAULT '0',\
      \
          PRIMARY KEY (`blurbId`)\
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
