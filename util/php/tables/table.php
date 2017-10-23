<?php

class Table {
  public $tableName;
  public $tableSchema;
  public $autoIncrement;

  function __construct($name, $schema){
    $this->tableName = $name;
    $this->tableSchema = $schema;
    $this->autoIncrement=0;
  }

  public function showSchema() {
    print ("Dumping schema for ".$this->tableName."...\n");
    print_r($this->tableSchema); 
  }


  public function create($conn){
    print ("Creating table ".$this->tableName."\n");
    $sql = "DROP TABLE IF EXISTS cmlive.`".$this->tableName."`;";
    $unique='';

    if($conn->query($sql) == TRUE){
      print "Table ".$this->tableName." dropped.\n";
    } else {
      print "Error: ".$sql."\n".$conn->error."\n";
    }

    $sql = "CREATE TABLE cmlive.`$this->tableName` ( `id` INT(11) NOT NULL AUTO_INCREMENT, ";
    foreach ($this->tableSchema as $element){
      $sql = $sql."`".$element['name']."` ".$element['type'];
      if(array_key_exists('value', $element))  {
        $sql = $sql." DEFAULT '".$element['value']."' ";
      }
      if(array_key_exists('unique',$element) && $element['unique']== true){
        $unique = $unique . ", UNIQUE INDEX `".$element['name']."` (`".$element['name']."`)";
      }
      $sql = $sql.",";
    }
    $sql = $sql . " PRIMARY KEY (`id`)";
    $sql = $sql . $unique;
    $sql = $sql . ") COLLATE='latin1_swedish_ci' ENGINE=InnoDB;";

//    print($sql);

    if($conn->query($sql) == TRUE){
      print "Table $this->tableName created.\n";
    } else {
      print "Error: ".$sql."\n".$conn->error."\n";
    }
  }

  public function insert($conn, $values) {
    if(count($values)==count($this->tableSchema)+1){
      if($values[0]>$this->autoIncrement){
        $this->autoIncrement = $values[0];
      }
      $columns="(id";
      $placeholders="('".array_shift($values)."'";
    } else {
      $columns = "(";
      $placeholders = "(";
    }
    $sql = "INSERT INTO cmlive.`".$this->tableName."` ";
    foreach($this->tableSchema as $element){
      if($columns != '('){
        $columns = $columns.',';
        $placeholders = $placeholders.',';
      }
      $columns = $columns.$element['name'];
      $placeholders = $placeholders."'".array_shift($values)."'";
    }
    $sql = $sql . $columns . ") VALUES ".$placeholders.");";

    if($conn->query($sql) == TRUE){
    } else {
      print "Error: ".$sql."\n".$conn->error."\n";  
    }
  }

  public function finalise($conn){
    if($this->autoIncrement>0){
      $this->autoIncrement = $this->autoIncrement+1;
      $sql = "ALTER TABLE cmlive.`".$this->tableName."` AUTO_INCREMENT=".$this->autoIncrement.";";
      if($conn->query($sql) == TRUE){
      } else {
        print "\nError: ".$sql."\n".$conn->error."\n";
      }
      print "\nTable $this->tableName finalised.\n";
    }
  }
}
