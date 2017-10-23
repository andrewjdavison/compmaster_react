<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId', 'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'userId',     'type'=>'BIGINT(11)', 'notnull'=>'true', 'value'=>'0'),
  array('name'=>'expires',    'type'=>'TIMESTAMP', 'notnull'=>'true', 'value'=>'2000-02-02 00:00:00'),
);

$specialaccessTable = new Table("specialaccess",$schema);

