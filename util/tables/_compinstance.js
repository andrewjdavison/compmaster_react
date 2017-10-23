var table = {
  create : function(connection) {
    var sql = "DROP TABLE IF EXISTS compInstance;";
    connection.query(sql, function(err, rows){
      if(err){
        console.log(err);
      }
    });

    sql = "CREATE TABLE `compInstance` ( \
      `compInstId` INT(11) NOT NULL AUTO_INCREMENT,\
      `compstate` TINYINT(3) NOT NULL DEFAULT '0',\
      `name` VARCHAR(100) NOT NULL,\
      `address1` VARCHAR(200) NOT NULL,\
      `address2` VARCHAR(200) NOT NULL,\
      `city` VARCHAR(100) NOT NULL,\
      `state` VARCHAR(100) NOT NULL,\
      `postcode` VARCHAR(20) NOT NULL,\
      `country` VARCHAR(50) NOT NULL,\
      `mapRef` VARCHAR(200) NOT NULL,\
      `contactDetails` VARCHAR(200) NOT NULL,\
      `startDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
      `endDate` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',\
      `fullPrice` DECIMAL(10,2) NOT NULL DEFAULT '0.00',\
      `onlineDiscount` DECIMAL(10,2) NOT NULL DEFAULT '0.00',\
      `clubDiscount` DECIMAL(10,2) NOT NULL DEFAULT '0.00',\
      `multipleDiscount` DECIMAL(10,2) NOT NULL DEFAULT '0.00',\
      `categoryLabel` VARCHAR(100) NOT NULL DEFAULT '0',\
      `categoryReq` INT(11) NOT NULL DEFAULT '0',\
      `subcategoryLabel` VARCHAR(100) NOT NULL DEFAULT '0',\
      `subcategoryReq` INT(11) NOT NULL DEFAULT '0',\
      `entryOpenDate` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',\
      `entryCloseDate` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',\
      `scoresheetId` INT(11) NOT NULL DEFAULT '0',\
      `scoreFilePattern` VARCHAR(50) NOT NULL DEFAULT '0',\
      `paypalFixedFee` DECIMAL(10,2) NOT NULL DEFAULT '0.00',\
      `paypalVariableFee` DECIMAL(10,2) NOT NULL DEFAULT '0.00',\
      `compmasterFixedFee` DECIMAL(10,2) NOT NULL DEFAULT '0.00',\
      `compmasterVariableFee` DECIMAL(10,2) NOT NULL DEFAULT '0.00',\
      `gst` DECIMAL(10,2) NOT NULL DEFAULT '0.00',\
      `entries` INT(11) NOT NULL DEFAULT '0',\
      `entryLimit` INT(11) NOT NULL DEFAULT '0',\
      `tallyMode` INT(11) NOT NULL DEFAULT '0',\
      `signature` VARCHAR(50) NOT NULL DEFAULT '0',\
      `offlineSignature` VARCHAR(50) NOT NULL DEFAULT '0',\
      `scoresheetSig` VARCHAR(50) NOT NULL DEFAULT '0',\
      `scoresheetVersion` INT(11) NOT NULL DEFAULT '0',\
      `acceptingEntries` TINYINT(4) NOT NULL DEFAULT '0',\
      `resultsPublished` TINYINT(4) NOT NULL DEFAULT '0',\
      `requestingStaff` TINYINT(4) NOT NULL DEFAULT '0',\
      `requestingJudges` TINYINT(4) NOT NULL DEFAULT '0',\
      `requestingJudgeAssistants` TINYINT(4) NOT NULL DEFAULT '0',\
      `allowUnpaid` TINYINT(4) NOT NULL DEFAULT '0',\
      `lockScoresheet` TINYINT(4) NOT NULL DEFAULT '0',\
      `validResults` TINYINT(4) NOT NULL DEFAULT '0',\
      `lockOfflineSheet` TINYINT(4) NOT NULL DEFAULT '0',\
      `showSponsors` TINYINT(4) NOT NULL DEFAULT '0',\
      `hideAdmin` TINYINT(4) NOT NULL DEFAULT '0',\
      `scoresheetsReady` TINYINT(4) NOT NULL DEFAULT '0',\
        PRIMARY KEY (`compinstid`)\
    )\
    COLLATE='latin1_swedish_ci'\
    ENGINE=InnoDB\
    AUTO_INCREMENT=202\
    ;\
    ";
    connection.query(sql, function(err, rows){
      if(err){
        console.log(err);
      }
    })

  }
}

module.exports = table;
