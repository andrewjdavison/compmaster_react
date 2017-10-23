var table = {
  // Return a promise to create a table...
  create : function(connection) {
    var sql = "DROP TABLE IF EXISTS region;";
    return connection.query(sql)
    .then(function(res){
      sql = "CREATE TABLE `region` ( \
        `regionId` INT(11) NOT NULL AUTO_INCREMENT,\
        `regionName` VARCHAR(100) NOT NULL DEFAULT '', \
        `regionLevel` INT(11) NOT NULL,\
        `regionParent` INT(11) NOT NULL,\
        `gst` FLOAT NOT NULL DEFAULT '0',\
        `timezone` varchar(100) NOT NULL DEFAULT '',\
      \
          PRIMARY KEY (`regionId`)\
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
