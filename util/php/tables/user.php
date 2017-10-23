<?php
include_once "table.php";

$schema = array(
  array('name'=>'firstName',          'type'=>'VARCHAR(50)',          'value'=>'0'),
  array('name'=>'lastName',           'type'=>'VARCHAR (100)',        'value'=>'0'),
  array('name'=>'street1',            'type'=>'VARCHAR (100)',        'value'=>'""'),
  array('name'=>'street2',            'type'=>'VARCHAR (100)',        'value'=>'""'),
  array('name'=>'city',               'type'=>'VARCHAR (100)',        'value'=>'""'),
  array('name'=>'state',              'type'=>'VARCHAR (100)',        'value'=>'""'),
  array('name'=>'country',            'type'=>'VARCHAR (100)',        'value'=>'""'),
  array('name'=>'postcode',           'type'=>'VARCHAR (100)',        'value'=>'""'),
  array('name'=>'phone',              'type'=>'VARCHAR (100)',        'value'=>'""'),
  array('name'=>'club',               'type'=>'INT (11)',             'value'=>'0'),
//  array('name'=>'judgeId',            'type'=>'VARCHAR (100)',        'value'=>'""'),
//  array('name'=>'judgeLevel',         'type'=>'VARCHAR (100)',        'value'=>'""'),
  array('name'=>'receiveInvitations', 'type'=>'TINYINT(1)',           'value'=>'0'),
  array('name'=>'compInstId',        'type'=>'BIGINT (11)',             'value'=>'0'),
  array('name'=>'regionId',           'type'=>'BIGINT (11)',             'value'=>'0'),
  array('name'=>'email',              'type'=>'VARCHAR (100)',        'value'=>'""'),

);

$userTable = new Table("user",$schema);

