<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId',   'type'=>'BIGINT (11)',     'notnull'=>'true'),
  array('name'=>'displayOrder', 'type'=>'INT(11)',      'notnull'=>'true'),
  array('name'=>'name',         'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'description',  'type'=>'VARCHAR(1000)', 'notnull'=>'true'),
  array('name'=>'winner',       'type'=>'VARCHAR(300)', 'notnull'=>'true'),
  array('name'=>'sponsor1',      'type'=>'VARCHAR(300)', 'notnull'=>'true'),
  array('name'=>'sponsor2',      'type'=>'VARCHAR(300)', 'notnull'=>'true'),
  array('name'=>'sponsor3',      'type'=>'VARCHAR(300)', 'notnull'=>'true'),
);

$awardTable = new Table("award",$schema);

