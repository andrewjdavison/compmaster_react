<?php
include_once "table.php";

$schema = array(
  array('name'=>'regionLevel',    'type'=>'INT (11)',       'notnull'=>'true'),
  array('name'=>'regionParent',   'type'=>'INT(11)',        'notnull'=>'true', 'value'=>'0'),
  array('name'=>'gst',            'type'=>'FLOAT',          'notnull'=>'true', 'value'=>'0'),
  array('name'=>'timezone',       'type'=>'VARCHAR (100)',  'notnull'=>'true'),
  array('name'=>'regionName',     'type'=>'VARCHAR(100)'),
);

$regionTable = new Table("region",$schema);

