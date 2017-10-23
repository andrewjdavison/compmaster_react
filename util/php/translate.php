<?php

$basePath = "./tables/";

$files = scandir('./tables');

foreach ($files as $filename){
  print $filename."\n";
  if (($filename <> ".") and ($filename <> "..") and ($filename <> "table.php")){
    include $basePath.$filename;
    $filename = pathinfo($filename, PATHINFO_FILENAME);

    $object = $filename;
    $table = $filename."Table";
    $className = ucfirst($filename);

    $outputFile = fopen("./js/models/".$filename.".js", "w");

    fwrite($outputFile, '"use strict";'."\n");
    fwrite($outputFile, "var Table = rootRequire('common/table');\n\n");
    if(file_exists("./tmpl/".$filename.".start")){
      $startFile = fopen("./tmpl/".$filename.".start", "r");
      while (($line = fgets($startFile)) !== false) {
        fwrite($outputFile, rtrim($line)."\n");
      } 
      fclose($startFile);
    }
    fwrite($outputFile, "class ".$className." extends Table {\n");
    fwrite($outputFile, "    constructor(proto){\n");
    fwrite($outputFile, "      super();\n");
    fwrite($outputFile, "      this.tableName='".$filename."';\n");
    fwrite($outputFile, "      this.schema = {\n");
    foreach (${$table}->tableSchema as $element){
      $notNull = (isset($element["notnull"]) ? " notnull : ".$element["notnull"]."," : ""); 
      $value =   (isset($element["value"]  ) ? " value   : ".$element["value"]."," : ""); 
      $unique =  (isset($element["unique"] ) ? " unique  : ".$element["unique"]."," : ""); 
      fwrite($outputFile,"         ".$element["name"]." : { type: '".$element["type"]."', ".
             $notNull. $value. $unique."},\n");
    }
    fwrite($outputFile,"    };\n");
    fwrite($outputFile,"    if(typeof proto !== 'undefined'){\n");
    fwrite($outputFile,"      this.set(proto);\n");
    fwrite($outputFile,"     }\n");
    fwrite($outputFile,"  }\n");

    if(file_exists("./tmpl/".$filename.".end")){
      $endFile = fopen("./tmpl/".$filename.".end", "r");
      while (($line = fgets($endFile)) !== false) {
        fwrite($outputFile, rtrim($line)."\n");
      } 
      fclose($endFile);
    }

    fwrite($outputFile,"}\n");
    fwrite($outputFile,"\nmodule.exports = ".$className.";");
    fclose($outputFile);

    $outputFile = fopen("./js/controllers/".$filename.".js", "w");
    fwrite($outputFile, "'use strict';\n");
    fwrite($outputFile, "var TableController = rootRequire('controllers/table');\n");
    fwrite($outputFile, "var ".$className." = rootRequire('models/".$object."');\n\n");
    fwrite($outputFile, "class ".$className."Controller extends TableController {\n");
    fwrite($outputFile, "  constructor(){\n");
    fwrite($outputFile, "    var ".$object." = new ".$className."();\n");
    fwrite($outputFile, "    super(".$object.");\n");
    fwrite($outputFile, "  }\n");
    fwrite($outputFile, "}\n");
    fwrite($outputFile, "\nmodule.exports = ".$className."Controller;\n");

    fclose($outputFile);
  }
}
exit;
