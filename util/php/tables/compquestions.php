<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId', 'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'t1',         'type'=>'INT(11)', 'notnull'=>'true'),
  array('name'=>'t2',         'type'=>'INT(11)', 'notnull'=>'true'),
  array('name'=>'t3',         'type'=>'INT(11)', 'notnull'=>'true'),
  array('name'=>'t4',         'type'=>'INT(11)', 'notnull'=>'true'),
  array('name'=>'t5',         'type'=>'INT(11)', 'notnull'=>'true'),
  array('name'=>'t6',         'type'=>'INT(11)', 'notnull'=>'true'),
  array('name'=>'sn1',        'type'=>'INT(11)', 'notnull'=>'true'),
  array('name'=>'sn2',        'type'=>'INT(11)', 'notnull'=>'true'),
  array('name'=>'sn3',        'type'=>'INT(11)', 'notnull'=>'true'),
  array('name'=>'sn4',        'type'=>'INT(11)', 'notnull'=>'true'),
  array('name'=>'bn1',        'type'=>'INT(11)', 'notnull'=>'true'),
  array('name'=>'bn2',        'type'=>'INT(11)', 'notnull'=>'true'),
);

$compquestionsTable = new Table("compquestions",$schema);

