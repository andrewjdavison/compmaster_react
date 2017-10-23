<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId', 'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'userId',     'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'level',      'type'=>'INT(11)', 'notnull'=>'true'),
);

$compauthTable = new Table("compauth",$schema);

