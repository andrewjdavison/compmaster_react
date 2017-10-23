<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId',     'type'=>'BIGINT(11)',      'notnull'=>'true'),
  array('name'=>'name',           'type'=>'VARCHAR(500)', 'notnull'=>'true'),
  array('name'=>'notes',          'type'=>'VARCHAR(500)', 'notnull'=>'true'),
  array('name'=>'judges',         'type'=>'INT(11)',      'notnull'=>'true', 'value'=>'0'),
  array('name'=>'categoryId',     'type'=>'BIGINT(11)',      'notnull'=>'true', 'value'=>'0'),
  array('name'=>'subcategoryId',  'type'=>'BIGINT(11)',      'notnull'=>'true', 'value'=>'0'),
  array('name'=>'startDatetime',  'type'=>'TIMESTAMP',    'notnull'=>'true', 'value'=>'2000-01-01 00:00:00'),
  array('name'=>'endDatetime',    'type'=>'TIMESTAMP',    'notnull'=>'true', 'value'=>'2000-01-01 00:00:00'),
);

$flightTable = new Table("flight",$schema);

