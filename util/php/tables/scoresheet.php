<?php
include_once "table.php";

$schema = array(
  array('name'=>'entryId',      'type'=>'BIGINT (11)',       'notnull'=>'null'),
  array('name'=>'judgeId',      'type'=>'BIGINT (11)',       'notnull'=>'null'),
  array('name'=>'scanId',       'type'=>'BIGINT (11)',       'notnull'=>'null'),
  array('name'=>'total',        'type'=>'FLOAT',          'notnull'=>'null'),
  array('name'=>'s1',           'type'=>'FLOAT',          'notnull'=>'null'),
  array('name'=>'s2',           'type'=>'FLOAT',          'notnull'=>'null'),
  array('name'=>'s3',           'type'=>'FLOAT',          'notnull'=>'null'),
  array('name'=>'s4',           'type'=>'FLOAT',          'notnull'=>'null'),
  array('name'=>'s5',           'type'=>'FLOAT',          'notnull'=>'null'),
  array('name'=>'s6',           'type'=>'FLOAT',          'notnull'=>'null'),
  array('name'=>'s7',           'type'=>'FLOAT',          'notnull'=>'null'),
  array('name'=>'s8',           'type'=>'FLOAT',          'notnull'=>'null'),
  array('name'=>'s9',           'type'=>'FLOAT',          'notnull'=>'null'),
  array('name'=>'s10',          'type'=>'FLOAT',          'notnull'=>'null'),
  array('name'=>'adminRank',    'type'=>'INT (11)',       'notnull'=>'null'),
  array('name'=>'secureId',     'type'=>'VARCHAR(20)',    'notnull'=>'null'),
  array('name'=>'compInstId',   'type'=>'BIGINT(11)',     'notnull'=>'null'),
);

$scoresheetTable = new Table("scoresheet",$schema);

