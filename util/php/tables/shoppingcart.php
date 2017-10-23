<?php
include_once "table.php";

$schema = array(
  array('name'=>'paid',         'type'=>'INT(11)', 'notnull'=> 'true'),
  array('name'=>'paymentDate',  'type'=>'TIMESTAMP', 'notnull'=>'true', 'value'=>'2000-01-01 00:00:00'),
  array('name'=>'price',        'type'=>'INT(11)'),
  array('name'=>'status',       'type'=>'INT(11)', 'notnull'=> 'true'),
);

$shoppingcartTable = new Table("shoppingcart",$schema);

