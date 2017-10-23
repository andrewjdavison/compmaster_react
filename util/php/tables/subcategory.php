<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId',       'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'subcategoryName',  'type'=>'VARCHAR(100)'),
  array('name'=>'subcategoryCode',  'type'=>'VARCHAR(100)'),
  array('name'=>'categoryId',       'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'subcategoryOrder', 'type'=>'INT(11)', 'notnull'=>'true'),
);

$subcategoryTable = new Table("subcategory",$schema);

