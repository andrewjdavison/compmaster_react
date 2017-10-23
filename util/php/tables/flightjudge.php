<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId', 'type'=>'BIGINT(11)', 'notnull'=>'true', 'value'=>'0'),
  array('name'=>'flightId',   'type'=>'BIGINT(11)', 'notnull'=>'true', 'value'=>'0'),
  array('name'=>'judgeId',    'type'=>'BIGINT(11)', 'notnull'=>'true', 'value'=>'0'),
);

$flightjudgeTable = new Table("flightjudge",$schema);

