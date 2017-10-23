<?php
include_once "table.php";

$schema = array(
  array('name'=>'name', 'type'=>'VARCHAR(100)'),
  array('name'=>'blurb', 'type'=>'VARCHAR(5000)'),
  array('name'=>'smLink', 'type'=>'VARCHAR(300)'),
  array('name'=>'lgLink', 'type'=>'VARCHAR(300)'),
  array('name'=>'smImg', 'type'=>'VARCHAR(300)'),
  array('name'=>'lgImg', 'type'=>'VARCHAR(300)'),
  array('name'=>'useLink', 'type'=>'TINYINT(1)', 'notnull'=>'true'),
  array('name'=>'clickthrough', 'type'=>'VARCHAR(300)', 'notnull'=>'true'),
);

$sponsorTable = new Table("sponsor",$schema);

