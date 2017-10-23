<?php
include_once "table.php";

$schema = array(
  array('name'=>'compInstId',       'type'=>'BIGINT(11)', 'notnull'=>'true'),
  array('name'=>'sponsorId',        'type'=>'BIGINT(11)', 'notnull'=>'true', 'value'=>'0'),
  array('name'=>'sponsorCategory',  'type'=>'BIGINT(11)', 'notnull'=>'false' ),
  array('name'=>'sponsorType',      'type'=>'INT(11)', 'notnull'=>'true'),
);

$compsponsorTable = new Table("compsponsor",$schema);

