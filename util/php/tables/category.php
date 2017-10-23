<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId',   'type'=>'BIGINT (11)',     'notnull'=>'true'),
  array('name'=>'categoryName', 'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'categoryCode', 'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'firstPrize',   'type'=>'VARCHAR(300)'),
  array('name'=>'secondPrize',  'type'=>'VARCHAR(300)'),
  array('name'=>'thirdPrize',   'type'=>'VARCHAR(300)'),
  array('name'=>'displayOrder', 'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'scoreTemplate','type'=>'BIGINT (11)',     'notnull'=>'true', 'value'=>'0'),
  array('name'=>'sponsor1','type'=>'BIGINT (11)',     'notnull'=>'true', 'value'=>'0'),
  array('name'=>'sponsor2','type'=>'BIGINT (11)',     'notnull'=>'true', 'value'=>'0'),
  array('name'=>'sponsor3','type'=>'BIGINT (11)',     'notnull'=>'true', 'value'=>'0'),
);

$categoryTable = new Table("category",$schema);

