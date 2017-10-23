<?php
include_once "table.php";

$schema = array(
  array('name'=>'userid',           'type'=>'BIGINT(11)',      'notnull'=>'true', 'unique'=>'true'),
  array('name'=>'username',         'type'=>'VARCHAR(100)', 'notnull'=>'true', 'value'=>'null', 'unique'=>'true'),
  array('name'=>'password',         'type'=>'VARCHAR(100)', 'notnull'=>'true', 'value'=>"\"\""),
  array('name'=>'usertype',         'type'=>'INT(11)',      'notnull'=>'true' ),
  array('name'=>'blocked',          'type'=>'INT(11)',      'notnull'=>'true'),
  array('name'=>'suspectUser',      'type'=>'INT(11)',      'notnull'=>'true'),
  array('name'=>'permissions',      'type'=>'INT(11)',      'notnull'=>'true'),
  array('name'=>'lastLogin',        'type'=>'TIMESTAMP',    'notnull'=>'true', 'value'=>'2000-01-01 00:00:00'),
  array('name'=>'lastLoginAttempt', 'type'=>'TIMESTAMP',    'notnull'=>'true', 'value'=>'2000-01-01 00:00:00'),
  array('name'=>'loginAttempts',    'type'=>'INT(11)',      'notnull'=>'true', 'value'=>'0'),
  array('name'=>'activationCode',   'type'=>'VARCHAR(200)', 'notnull'=>'true', 'value'=>'0'),
);

$authTable = new Table("auth",$schema);

