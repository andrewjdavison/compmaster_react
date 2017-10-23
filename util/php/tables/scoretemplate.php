<?php
include_once "table.php";

$schema = array(
  array('name'=>'scoresheetName', 'type'=>'VARCHAR(200)', 'notnull'=>'true'),
  array('name'=>'s1label',        'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'s1max',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s1tie',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s2label',        'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'s2max',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s2tie',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s3label',        'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'s3max',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s3tie',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s4label',        'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'s4max',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s4tie',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s5label',        'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'s5max',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s5tie',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s6label',        'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'s6max',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s6tie',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s7label',        'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'s7max',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s7tie',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s8label',        'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'s8max',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s8tie',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s9label',        'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'s9max',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s9tie',          'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s10label',       'type'=>'VARCHAR(100)', 'notnull'=>'true'),
  array('name'=>'s10max',         'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'s10tie',         'type'=>'INT (11)',     'notnull'=>'true'),
  array('name'=>'image',          'type'=>'VARCHAR(100)', 'notnull'=>'true', 'value'=>'""'),
  array('name'=>'judges',          'type'=>'INT(100)', 'notnull'=>'true', 'value'=>'3'),
  array('name'=>'spread',          'type'=>'INT(100)', 'notnull'=>'true', 'value'=>'7'),
);

$scoretemplateTable = new Table("scoretemplate",$schema);

