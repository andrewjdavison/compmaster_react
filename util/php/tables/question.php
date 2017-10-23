<?php
include_once "table.php";

$schema = array(
  array('name'=> "compInstId",          'type'=>  "BIGINT(11)",      'notnull'=>'true'),
  array('name'=> "questionType",        'type'=>  "TINYINT(3)",   'notnull'=>'true'),
  array('name'=> "label",               'type'=>  "VARCHAR(100)", 'notnull'=>'true'),
  array('name'=> "required",            'type'=>  "TINYINT(1)",   'notnull'=>'true', 'value'=>'0'),
  array('name'=> "formOrder",           'type'=>  "INT(11)",      'notnull'=>'true', 'value'=>'0'),
  array('name'=> "defaultValue",        'type'=>  "VARCHAR(200)",       'notnull'=>'true', 'value'=>'0'),
  array('name'=> "viewOnJudging",       'type'=>  "TINYINT(1)",      'notnull'=>'true', 'value'=>'0'),
  array('name'=> "viewOnRunningSheet",  'type'=>  "TINYINT(1)",      'notnull'=>'true', 'value'=>'0'),
  array('name'=> "viewOnReport",        'type'=>  "TINYINT(1)",      'notnull'=>'true', 'value'=>'0'),
  array('name'=> "description",         'type'=>  "VARCHAR(100)", 'notnull'=>'true'),
  array('name'=> "viewOnLabel",         'type'=>  "TINYINT(1)",   'notnull'=>'true', 'value'=>'0'),
  array('name'=> "offlineWeight",       'type'=>  "INT(11)",      'notnull'=>'true', 'value'=>'0'),
  array('name'=> "used",                'type'=>  "TINYINT(1)",   'notnull'=>'true', 'value'=>'0'),
  array('name'=> "usedOffline",         'type'=>  "TINYINT(1)",   'notnull'=>'true', 'value'=>'0'),
  array('name'=> "radioOptions",        'type'=>  "VARCHAR(100)", 'notnull'=>'true'),
  array('name'=> "questionPage",        'type'=>  "INT(11)",      'notnull'=>'true'),
  array('name'=> "dataPattern",         'type'=>  "VARCHAR(100)", 'notnull'=>'true'),
  array('name'=> "dataPatternDescription",        'type'=>  "VARCHAR(200)", 'notnull'=>'true'),

);

$questionTable = new Table("question",$schema);


