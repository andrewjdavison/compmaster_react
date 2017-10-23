<?php
include_once "table.php";

$schema = array(
  array('name'=>'name',         'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'regionId',     'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'displayOrder', 'type'=>'INT (11)', 'notnull'=>'true', 'value'=>'0'),
  array('name'=>'img',          'type'=>'VARCHAR(100)', 'notnull'=>'true'),
);

$clubTable = new Table("club",$schema);

