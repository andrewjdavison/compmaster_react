<?php
include_once "table.php";

$schema = array(
  array('name'=>'userId',       'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'rankId',       'type'=>'INT(11)', 'notnull'=>'true'),
  array('name'=>'identifier',   'type'=>'VARCHAR(100)', 'notnull'=>'true')
);

$accreditationTable = new Table("accreditation",$schema);

