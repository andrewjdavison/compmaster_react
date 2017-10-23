<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId', 'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'clubId',     'type'=>'BIGINT(11)', 'notnull'=>'true', 'value'=>'0'),
);

$clubdiscountTable = new Table("clubdiscount",$schema);

