<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId', 'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'entryId',    'type'=>'BIGINT(11)', 'notnull'=> 'true', 'value'=>'0'),
  array('name'=>'questionId', 'type'=>'BIGINT(11)', 'notnull'=> 'true', 'value'=>'0'),
  array('name'=>'response',    'type'=>'VARCHAR(5000)'),
  array('name'=>'toggle',     'type'=>'TINYINT(1)', 'notnull'=>'false', 'value'=>'0'),
);

$entryresponseTable = new Table("entryresponse",$schema);

