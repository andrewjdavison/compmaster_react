<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId', 'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'userId',     'type'=>'BIGINT(11)', 'notnull'=>'true', 'value'=>'0'),
  array('name'=>'role',       'type'=>'INT(11)', 'notnull'=>'true', 'value'=>'1'),
  array('name'=>'staffId',       'type'=>'INT(11)', 'notnull'=>'true', 'value'=>'1'),
  array('name'=>'notes',      'type'=>'VARCHAR(500)'),
);

$staffTable = new Table("staff",$schema);

