<?php
include_once "table.php";

$schema = array(
  array('name'=>'name',         'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'img',          'type'=>'VARCHAR(100)', 'notnull'=>'true'),
);

$judgeassociationTable = new Table("judgeassociation",$schema);

