<?php
include_once "table.php";

$schema = array(
  array('name'=>'compstate' ,                 'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'name' ,                      'type'=> 'VARCHAR(100)',  'notnull'=>'true'),
  array('name'=>'address1' ,                  'type'=> 'VARCHAR(200)',  'notnull'=>'true'),
  array('name'=>'address2' ,                  'type'=> 'VARCHAR(200)',  'notnull'=>'true'),
  array('name'=>'city' ,                      'type'=> 'VARCHAR(100)',  'notnull'=>'true'),
  array('name'=>'state' ,                     'type'=> 'VARCHAR(100)',  'notnull'=>'true'),
  array('name'=>'postcode' ,                  'type'=> 'VARCHAR(20)',   'notnull'=>'true'),
  array('name'=>'country' ,                   'type'=> 'VARCHAR(50)',   'notnull'=>'true'),
  array('name'=>'mapRef' ,                    'type'=> 'VARCHAR(2000)',  'notnull'=>'true'),
  array('name'=>'contactName' ,              'type'=> 'VARCHAR(200)',  'notnull'=>'true'),
  array('name'=>'contactPhone' ,              'type'=> 'VARCHAR(200)',  'notnull'=>'true'),
  array('name'=>'contactEmail' ,              'type'=> 'VARCHAR(200)',  'notnull'=>'true'),
  array('name'=>'startDate' ,                 'type'=> 'TIMESTAMP',     'notnull'=>'true', 'value'=>'2000-01-01 00:00:00'),
  array('name'=>'endDate' ,                   'type'=> 'TIMESTAMP',     'notnull'=>'true', 'value'=>'2000-02-02 00:00:00'),
  array('name'=>'fullPrice' ,                 'type'=> 'DECIMAL(10,2)', 'notnull'=>'true', 'value'=>'0.00'),
  array('name'=>'onlineDiscount' ,            'type'=> 'DECIMAL(10,2)', 'notnull'=>'true', 'value'=>'0.00'),
  array('name'=>'clubDiscount' ,              'type'=> 'DECIMAL(10,2)', 'notnull'=>'true', 'value'=>'0.00'),
  array('name'=>'multipleDiscount' ,          'type'=> 'DECIMAL(10,2)', 'notnull'=>'true', 'value'=>'0.00'),
  array('name'=>'categoryLabel' ,             'type'=> 'VARCHAR(100)',  'notnull'=>'true', 'value'=>'0'),
  array('name'=>'categoryReq' ,               'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'subcategoryLabel' ,          'type'=> 'VARCHAR(100)',  'notnull'=>'true', 'value'=>'0'),
  array('name'=>'subcategoryReq' ,            'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'entryOpenDate' ,             'type'=> 'TIMESTAMP',     'notnull'=>'true', 'value'=>'2000-02-02 00:00:00'),
  array('name'=>'entryCloseDate' ,            'type'=> 'TIMESTAMP',     'notnull'=>'true', 'value'=>'2000-02-02 00:00:00'),
  array('name'=>'scoresheetId' ,              'type'=> 'BIGINT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'scoreFilePattern' ,          'type'=> 'VARCHAR(50)',   'notnull'=>'true', 'value'=>'0'),
  array('name'=>'paypalFixedFee' ,            'type'=> 'DECIMAL(10,2)', 'notnull'=>'true', 'value'=>'0.00'),
  array('name'=>'paypalVariableFee' ,         'type'=> 'DECIMAL(10,2)', 'notnull'=>'true', 'value'=>'0.00'),
  array('name'=>'compmasterFixedFee' ,        'type'=> 'DECIMAL(10,2)', 'notnull'=>'true', 'value'=>'0.00'),
  array('name'=>'compmasterVariableFee' ,     'type'=> 'DECIMAL(10,2)', 'notnull'=>'true', 'value'=>'0.00'),
  array('name'=>'gst' ,                       'type'=> 'DECIMAL(10,2)', 'notnull'=>'true', 'value'=>'0.00'),
  array('name'=>'entries' ,                   'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'entryLimit' ,                'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'tallyMode' ,                 'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'signature' ,                 'type'=> 'VARCHAR(50)',   'notnull'=>'true', 'value'=>'0'),
  array('name'=>'offlineSignature' ,          'type'=> 'VARCHAR(50)',   'notnull'=>'true', 'value'=>'0'),
  array('name'=>'scoresheetSig' ,             'type'=> 'VARCHAR(50)',   'notnull'=>'true', 'value'=>'0'),
  array('name'=>'scoresheetVersion' ,         'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'resultsPublished' ,          'type'=> 'TINYINT(1)',    'notnull'=>'true', 'value'=>'0'),
  array('name'=>'requestingStaff' ,           'type'=> 'TINYINT(1)',    'notnull'=>'true', 'value'=>'0'),
  array('name'=>'requestingJudges' ,          'type'=> 'TINYINT(1)',    'notnull'=>'true', 'value'=>'0'),
  array('name'=>'requestingJudgeAssistants' , 'type'=> 'TINYINT(1)',    'notnull'=>'true', 'value'=>'0'),
  array('name'=>'allowUnpaid' ,               'type'=> 'TINYINT(1)',    'notnull'=>'true', 'value'=>'0'),
  array('name'=>'lockScoresheet' ,            'type'=> 'TINYINT(1)',    'notnull'=>'true', 'value'=>'0'),
  array('name'=>'validResults' ,              'type'=> 'TINYINT(1)',    'notnull'=>'true', 'value'=>'0'),
  array('name'=>'lockOfflineSheet' ,          'type'=> 'TINYINT(1)',    'notnull'=>'true', 'value'=>'0'),
  array('name'=>'showSponsors' ,              'type'=> 'TINYINT(1)',    'notnull'=>'true', 'value'=>'0'),
  array('name'=>'hideAdmin' ,                 'type'=> 'TINYINT(1)',    'notnull'=>'true', 'value'=>'0'),
  array('name'=>'scoresheetsReady' ,          'type'=> 'TINYINT(1)',    'notnull'=>'true', 'value'=>'0'),
  array('name'=>'regionId' ,                  'type'=> 'BIGINT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'bannerImg' ,                 'type'=> 'VARCHAR(50)',   'notnull'=>'true', 'value'=>'0'),
  array('name'=>'acceptingEntries' ,          'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'publishScores' ,             'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'activated' ,                 'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'finalised' ,                 'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'totallimit' ,                 'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'categorylimit' ,                 'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'subcategorylimit' ,                 'type'=> 'INT(11)',       'notnull'=>'true', 'value'=>'0'),
  array('name'=>'multiDiscountQual',            'type'=>'INT(11)', 'notnull'=>'true', 'value'=>'0'),
  array('name'=>'pointspread',                'type'=>'INT(11)', 'notnull'=>'true', 'value'=>'7')


);

$compinstTable = new Table("compinst",$schema);