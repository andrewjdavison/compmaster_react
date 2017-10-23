<?php
class Table {
  public $tableName;
  public $tableSchema;

  function __construct($name, $schema){
    $this->tableName = $name;
    $this->tableSchema = $schema;
  }

  public function showSchema() {
    print ("Dumping schema for ".$this->tableName."...\n");
    print_r($this->tableSchema); 
  }
}

