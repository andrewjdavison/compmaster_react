var table = {
  // Return a promise to create a table...
  create : function(connection) {
    var sql = "DROP TABLE IF EXISTS question;";
    return connection.query(sql)
    .then(function(res){
      sql = "CREATE TABLE `question` ( \
        `questionId` INT(11) NOT NULL AUTO_INCREMENT,\
        `compInstId` INT(11) NOT NULL, \
        `questionType` TINYINT(3) NOT NULL, \
        `label` VARCHAR(100) NOT NULL,\
        `required` TINYINT(1) NOT NULL DEFAULT '0',\
        `formOrder` INT(11) NOT NULL DEFAULT '0',\
        `defaultValue` INT(2) NOT NULL DEFAULT '0',\
        `viewOnJudging` INT(11) NOT NULL DEFAULT '0',\
        `viewOnRunningSheet` INT(11) NOT NULL DEFAULT '0',\
        `viewOnReport` INT(11) NOT NULL DEFAULT '0',\
        `description` VARCHAR(100) NOT NULL,\
        `viewOnLabel` TINYINT(1) NOT NULL DEFAULT '0',\
        `offlineWeight` INT(11) NOT NULL DEFAULT '0',\
        `used` TINYINT(1) NOT NULL DEFAULT '0',\
        `usedOffline` TINYINT(1) NOT NULL DEFAULT '0',\
        `radioOptions` VARCHAR(100) NOT NULL DEFAULT '', \
      \
          PRIMARY KEY (`questionId`)\
      )\
      COLLATE='latin1_swedish_ci'\
      COMMENT='Types:\r\n1: toggle\r\n2: small note\r\n3: big note\r\n4: radio',\
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
