<?php
include_once "table.php";

$schema = array(
  array('name'=> "compInstId",          'type'=>  "BIGINT(11)", 'notnull'=>'true'),
  array('name'=> "formOrder",           'type'=>  "INT(11)", 'notnull'=>'true', 'value'=>'0'),
  array('name'=> "label",               'type'=>  "VARCHAR(100)", 'notnull'=>'true'),
  array('name'=> "catId",               'type'=> "VARCHAR(50)", 'notnull'=>'true', 'value'=>'0'),

);

$questionpageTable = new Table("questionpage",$schema);


