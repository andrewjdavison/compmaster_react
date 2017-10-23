<?php
include_once "table.php";

$schema = array(
   array('name'=>'compInstId',        'type'=>  'BIGINT (11)',     'notnull'=>'true'),
   array('name'=>'entryNumber',       'type'=>  'INT (11)',     'notnull'=>'true'),
   array('name'=>'paymentPending',    'type'=>  'TINYINT(1)',   'notnull'=>'true'),
   array('name'=>'paid',              'type'=>  'TINYINT(1)',   'notnull'=>'true'),
   array('name'=>'entryDate',         'type'=>  'TIMESTAMP',    'notnull'=>'true', 'value'=>'2000-01-01 00:00:00'),
   array('name'=>'entryType',         'type'=>  'INT (11)',     'notnull'=>'true'),
   array('name'=>'categoryId',        'type'=>  'BIGINT (11)',     'notnull'=>'true'),
   array('name'=>'subcategoryId',     'type'=>  'BIGINT (11)',     'notnull'=>'true'),
   array('name'=>'tie1',              'type'=>  'FLOAT (3)',    'notnull'=>'true'),
   array('name'=>'tie2',              'type'=>  'FLOAT (3)',    'notnull'=>'true'),
   array('name'=>'tie3',              'type'=>  'FLOAT (3)',    'notnull'=>'true'),
   array('name'=>'tie4',              'type'=>  'FLOAT (3)',    'notnull'=>'true'),
   array('name'=>'tie5',              'type'=>  'FLOAT (3)',    'notnull'=>'true'),
   array('name'=>'tie6',              'type'=>  'FLOAT (3)',    'notnull'=>'true'),
   array('name'=>'tie7',              'type'=>  'FLOAT (3)',    'notnull'=>'true'),
   array('name'=>'tie8',              'type'=>  'FLOAT (3)',    'notnull'=>'true'),
   array('name'=>'tie9',              'type'=>  'FLOAT (3)',    'notnull'=>'true'),
   array('name'=>'tie10',             'type'=>  'FLOAT (3)',    'notnull'=>'true'),
   array('name'=>'tiebreaker',        'type'=>  'FLOAT (3)',    'notnull'=>'true'),
   array('name'=>'entrantId',         'type'=>  'BIGINT (11)',     'notnull'=>'true'),
   array('name'=>'securityId',        'type'=>  'VARCHAR (50)', 'notnull'=>'true'),
   array('name'=>'cost',              'type'=>  'INT (11)',     'notnull'=>'true'),
   array('name'=>'cancelled',         'type'=>  'TINYINT(1)',     'notnull'=>'true'),
   array('name'=>'clubId',            'type'=>  'BIGINT (11)',     'notnull'=>'true'),
   array('name'=>'flightOrder',       'type'=>  'INT (11)',     'notnull'=>'true'),
   array('name'=>'totalScore',        'type'=>  'FLOAT ',       'notnull'=>'true'),
   array('name'=>'rank',              'type'=>  'INT (11)',     'notnull'=>'true'),
   array('name'=>'bulkTransactionId', 'type'=>  'BIGINT (11)',     'notnull'=>'true'),
   array('name'=>'scoreTemplateId',   'type'=>  'BIGINT (11)',     'notnull'=>'true', 'value'=>0),
   array('name'=>'labelImage',        'type'=>  'VARCHAR (300)','notnull'=>'true'),
   array('name'=>'flightId',          'type'=>  'BIGINT (11)',     'notnull'=>'true', 'value'=>0),
);

$entryTable = new Table("entry",$schema);


