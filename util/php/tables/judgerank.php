<?php
include_once "table.php";

$schema = array(
  array('name'=>'name',         'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'associationId','type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'rank',         'type'=>'INT (11)', 'notnull'=>'true', 'value'=>'0'),
  array('name'=>'badge',        'type'=>'VARCHAR(100)', 'notnull'=>'true'),
);

$judgerankTable = new Table("judgerank",$schema);

