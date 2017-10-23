<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId',     'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'categoryId',     'type'=>'BIGINT(11)', 'notnull'=>'true', 'value'=>'0' ),
  array('name'=>'subcategoryId',  'type'=>'BIGINT(11)', 'notnull'=>'true', 'value'=>'0' ),
  array('name'=>'judgeId',        'type'=>'BIGINT(11)', 'notnull'=>'true' ),
  array('name'=>'userId',         'type'=>'BIGINT(11)', 'notnull'=>'true' ),
  array('name'=>'flightId',       'type'=>'BIGINT(11)', 'notnull'=>'true', 'value'=>'0')
);

$compjudgeTable = new Table("compjudge",$schema);

