<?php
include_once "table.php";

$schema = array(
  array('name'=>'paypalFixedFee',       'type'=>'FLOAT', 'notnull'=>'true'),
  array('name'=>'paypalVariableFee',    'type'=>'FLOAT', 'notnull'=>'true'),
  array('name'=>'compmasterFixedFee',   'type'=>'FLOAT', 'notnull'=>'true'),
  array('name'=>'compmasterVariableFee','type'=>'FLOAT', 'notnull'=>'true'),
);

$cmadminTable = new Table("cmadmin",$schema);

