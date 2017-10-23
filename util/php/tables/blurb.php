<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId',   'type'=>'BIGINT(11)',      'notnull'=>'true'),
  array('name'=>'title',        'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'content',      'type'=>'VARCHAR(5000)', 'notnull'=>'true'),
  array('name'=>'displayOrder', 'type'=>'INT(11)',      'notnull'=>'true',  'value'=>'0'),
);

$blurbTable = new Table("blurb",$schema);

