<?php
include_once "table.php";

$schema = array(
  array('name'=>'username',         'type'=>'VARCHAR(100)', 'notnull'=>'true', 'value'=>'null', 'unique'=>'true'),
  array('name'=>'password',         'type'=>'VARCHAR(100)', 'notnull'=>'true', 'value'=>"\"\""),
  array('name'=>'usertype',         'type'=>'INT(11)',      'notnull'=>'true', 'value'=>'null'),
  array('name'=>'email',            'type'=>'VARCHAR(100)', 'notnull'=>'true', 'value'=>'null'),
  array('name'=>'blocked',          'type'=>'INT(11)',      'notnull'=>'true', 'value'=>'null'),
  array('name'=>'suspectUser',      'type'=>'INT(11)',      'notnull'=>'true', 'value'=>'null'),
  array('name'=>'permissions',      'type'=>'INT(11)',      'notnull'=>'true', 'value'=>'null'),
  array('name'=>'lastLogin',        'type'=>'TIMESTAMP',    'notnull'=>'true', 'value'=>'0000-00-00 00:00:00'),
  array('name'=>'lastLoginattempt', 'type'=>'TIMESTAMP',    'notnull'=>'true', 'value'=>'0000-00-00 00:00:00'),
  array('name'=>'loginAttempts',    'type'=>'INT(11)',      'notnull'=>'true', 'value'=>'0'),
);

$authTable = new Table("auth",$schema);

