<?php

$servername = "10.10.1.7";
$username = "cmadmin";
$password="AbCdEfG123!@#";
$dbname = "compm001_cmdata_live";

$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error){
  die("Connection failed: ".$conn->connect_error);
}
include "./tables/auth.php";
include "./tables/user.php";
include "./tables/blurb.php";
include "./tables/blurb.php";
include "./tables/region.php";
include "./tables/question.php";
include "./tables/questionpage.php";
include "./tables/compquestions.php";
include "./tables/compinst.php";
include "./tables/club.php";
include "./tables/award.php";
include "./tables/compauth.php";
include "./tables/sponsor.php";
include "./tables/category.php";
include "./tables/subcategory.php";
include "./tables/compjudge.php";
include "./tables/clubdiscount.php";
include "./tables/flight.php";
include "./tables/flightjudge.php";
include "./tables/entry.php";
include "./tables/entryresponse.php";
include "./tables/entry.php";
include "./tables/shoppingcart.php";
include "./tables/cmadmin.php";
include "./tables/scoresheet.php";
include "./tables/scoretemplate.php";
include "./tables/compsponsor.php";
include "./tables/specialaccess.php";
include "./tables/staff.php";
include "./tables/judgeassociation.php";
include "./tables/judgerank.php";
include "./tables/accreditation.php";




$options = getopt("rhucetas");

if(array_key_exists("h", $options)){
  print ("Usage:\n");
  print ("        -u: Migrate all user records\n");
  print ("        -c: Migrate all competition records\n");
  print ("        -e: Migrate all entry records\n");
  print ("        -r: Rank all entry records\n");
  print ("        -t: Generate Test Data\n");
  print ("        -s: Migrate existing score data\n");
  print ("        -a: All of the above\n");
  exit;
}
if(array_key_exists("a", $options)){
  $options["u"]=false;
  $options["c"]=false;
  $options["e"]=false;
  $options["r"]=false;
  $options["t"]=false;
  $options["s"]=false;
}
if(array_key_exists("u",$options)){
  print("Will migrate user data\n");
}
if(array_key_exists("c",$options)){
  print("Will migrate competition data\n");
}
if(array_key_exists("e",$options)){
  print("Will migrate entry data\n");
}
if(array_key_exists("s",$options)){
  print("Will migrate score data\n");
}
if(array_key_exists("r",$options)){
  print("Will rank entry data\n");
}
function importTable($conn, $tableName){
  $sql = "SELECT * FROM compm001_cmdata_live.`".$tableName."`;";
  $result = $conn->query($sql);
  if($conn->error){
    die("Database Error: ".$conn->error."\n");
  }
  return $result;
}

function escapeValues($conn, $values){
  $escapedValues = array();
  foreach ($values as $value){
    array_push($escapedValues, mysqli_real_escape_string($conn, $value));      
  }
  return $escapedValues;
}

function migrateTable($conn, $origTableName, $table, $elements){
  print "\n------------------------------\n";

  $table->create($conn);
  $result = importTable($conn, $origTableName);
  if($origTableName=="compscores"){
    print "Found ".count($result)." rows for compscores\n";
  }
  print "Migrating $origTableName data...\n";
  while($row = $result->fetch_assoc()){
    $values = array();
    foreach ($elements as $element){
      if (array_key_exists($element, $row)){
        array_push($values, mysqli_real_escape_string($conn, $row[$element]));      
      } else {
        array_push($values, 0);      
      }
    }
    $table->insert($conn, $values);
  if($origTableName=="compscoresheets"){
    print_r($values, false);
  }
  }
  $table->finalise($conn);
  print "$origTableName table migrated\n";
  print "------------------------------\n";
}


function createUser($conn, $userTable, $authTable, $compauthTable,$accreditationTable, 
  $firstName, $lastName, $street1, $street2, $suburb, $state, $country, $postcode,
  $phone, $club, $judgeEmail, $currentInst, $regionId, $email, $judgeLevel,
  $judgeId, $userName, $pass, $userType, $looksPhoney, $authLevel){

  $values = array($firstName, $lastName, $street1, $street2, $suburb, $state, $country,
           $postcode, $phone, $club, $judgeEmail, $currentInst, $regionId, $email);
  $escapedValues = escapeValues($conn,$values);

  $userTable->insert($conn, $escapedValues);
  $userId = $conn->insert_id;

  $escapedValues = escapeValues($conn,array($userId, $judgeLevel, $judgeId));
  $accreditationTable->insert($conn,$escapedValues); 

  $values = array( $userId, $userName, $pass, $userType, "0","0", "0", "2000-01-01 00:00:00",
    "2000-01-01 00:00:00", "0", "");
  $escapedValues = escapeValues($conn,$values);
  $authTable->insert($conn, $escapedValues);

  $escapedValues = escapeValues($conn, array($currentInst, $userId, $authLevel));
  $compauthTable->insert($conn, $escapedValues);


  $userTable->finalise($conn);
  $authTable->finalise($conn);
  $compauthTable->finalise($conn);
  $accreditationTable->finalise($conn);
}


$sql = "SELECT drpusers.pass, user.first_name, user.last_name, user.street_1,".
  "user.street_2, user.suburb, user.postcode, user.state, user.phone,".
  "user.username, user.email, user.looks_phoney, user.club, user.member_id,".
  "user.unlisted_club, user.judge_id, user.judge_level, user.judge_email,".
  "user.drupal_user_id, user.current_inst, user.regionid, user.usertype,".
  "user.sitemode FROM drpusers INNER JOIN user ".
  "ON user.drupal_user_id = drpusers.uid;";


$result = $conn->query($sql);

if($conn->error){
  die("Connection failed: ".$conn->error."\n");
}

$accreditationTable->create($conn);
$judgeassociationTable->create($conn);
$judgerankTable->create($conn);

$judgeassociationTable->insert($conn, array("BJCP", "BJCP.jpg"));
$bjcpId = $conn->insert_id;
$judgeassociationTable->insert($conn, array("AABA", "AABA.jpg"));
$aabaId = $conn->insert_id;
$judgerankTable->insert($conn, array("Apprentice", $bjcpId, 1, "BJCP.jpg"));
$apprenticeId = $conn->insert_id;
$judgerankTable->insert($conn, array("Recognized", $bjcpId, 2, "BJCP.jpg"));
$recognizedId = $conn->insert_id;
$judgerankTable->insert($conn, array("Certified", $bjcpId, 3, "BJCP.jpg"));
$certifiedId = $conn->insert_id;
$judgerankTable->insert($conn, array("National", $bjcpId, 4, "BJCP.jpg"));
$nationalId = $conn->insert_id;
$judgerankTable->insert($conn, array("Master", $bjcpId, 5, "BJCP.jpg"));
$masterId = $conn->insert_id;
$judgerankTable->insert($conn, array("Grand Master", $bjcpId, 6, "BJCP.jpg"));
$grandmasterId = $conn->insert_id;

$judgerankTable->insert($conn, array("Novice", $aabaId, 1, "AABA.jpg"));
$noviceId = $conn->insert_id;
$judgerankTable->insert($conn, array("Experienced", $aabaId, 2, "AABA.jpg"));
$experiencedId = $conn->insert_id;

// The compauth table needs to be migrated first just in case 
// we're supposed to create test users...

migrateTable($conn, 'compauth',$compauthTable, ['compinstid','drupal_user_id','level']);

if(array_key_exists("u",$options)){
  print('Creating user table');
  $userTable->create($conn);
  $authTable->create($conn);

  print "Migrating user records... \n";
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      // While I'm here we'll update the scoretemplateId and convert the state to an ID...
      if($row['drupal_user_id'] == 0){
        $row['drupal_user_id'] =2;
      }
      if($row['drupal_user_id'] == 994){
        $row['username']="peakydh0";
      }
      if($row['drupal_user_id'] % 100 == 0){
        echo "\033[6D";
        echo str_pad($row['drupal_user_id'],3,' ', STR_PAD_LEFT);
      }


      if($row['state']=='vic' || $row['state']=='VIC' || $row['state']=='Victoria'){
        $row['state']=240;
      }
      if($row['state'] == 'nsw'){
        $row['state']==235;
      }
      if($row['state'] == 'qld'){
        $row['state'] = 237;
      }
      if($row['state'] == 'wa'){
        $row['satte']=241;
      }
      if($row['state']=='tas'){
        $row['state'] = 239;
      }
      if($row['state']=='sa'){
        $row['state']=238;
      }
      if($row['state'] == 'act'){
        $row['state']=234;
      }
      if($row['state'] == 'nt'){
        $row['state']=236;
      }
      if($row['state'] !=''){
        if($row['state'][0]=='3'){
          $row['city'] = $row['postcode'];
          $row['postcode']=$row['state'];
          $row['state'] = 240;
        }
      }
      if($row['state']=='c'){
        $row['state']=240;
      }
      if($row['state']==''){
        $row['state']=240;
      }
      // Now migrate the judge levels...

      if($row['judge_level'] == 'novice'){
        $row['judge_level'] = $noviceId;
      } else if ($row['judge_level'] == 'apprentice'){
        $row['judge_level'] = $apprenticeId;
      } else if ($row['judge_level'] == 'recognised'){
        $row['judge_level'] = $recognizedId;
      } else if ($row['judge_level'] == 'certified'){
        $row['judge_level'] = $certifiedId;
      } else if ($row['judge_level'] == 'national'){
        $row['judge_level'] = $nationalId;
      } else if ($row['judge_level'] == 'master'){
        $row['judge_level'] = $masterId;
      } else if ($row['judge_level'] == 'grand'){
        $row['judge_level'] = $grandmasterId;
      } else if ($row['judge_level'] == 'australian'){
        $row['judge_level'] = $experiencedId;
      } else {
        $row['judge_level'] = 0;
      }

      
      $values = array($row["drupal_user_id"], 
        $row["first_name"], $row["last_name"], $row["street_1"],
        $row["street_2"], $row["suburb"], $row["state"], "15",
        $row["postcode"], $row["phone"], $row["club"], 
        $row["judge_email"], $row["current_inst"],
        $row["regionid"], $row["email"] );

      $escapedValues = escapeValues($conn,$values);
      $userTable->insert($conn, $escapedValues);
      $userId = $conn->insert_id;

      $escapedValues = escapeValues($conn,array($userId, $row['judge_level'], $row['judge_id']));
      $accreditationTable->insert($conn,$escapedValues); 

      if(array_key_exists("t",$options)){
        if(($row["drupal_user_id"] == 11)||($row["drupal_user_id"]==14476)){
          $row["pass"] = '$2a$10$UZOh0knWJ3bBewMIkLs/a.SGtNaMVQmOWWbbthVsNKJ0OdEMG2Rli';
          $row["activationCode"]="";
        } else {
          $row["activationCode"]='0';
        }
      }
      if($row['looks_phoney']){
        $row['looks_phoney']=1;
      } else {
        $row['looks_phoney']=0;
      }
      $values = array($row["drupal_user_id"], $row["username"], $row["pass"],
        $row["usertype"], $row["looks_phoney"],
        $row["looks_phoney"], "0", "2000-01-01 00:00:00",
        "2000-01-01 00:00:00", "0" ,$row['activationCode']);
      $escapedValues = escapeValues($conn,$values);
      $authTable->insert($conn, $escapedValues);
    }
    $userTable->finalise($conn);
    $authTable->finalise($conn);
  }

  if(array_key_exists("t",$options)){
    // Create test users...

    // cadmin
    createUser($conn, $userTable, $authTable, $compauthTable, $accreditationTable,
      "competition", "admin", "a street","","Somewhere", "Victoria", "15", "3000",
      "9999-9999", "2", "1", "29", "1", "cadmin@davison-family.com",
      "1","E99199","cadmin","$2a$10\$edVsCNApby1ZnIVeUmbjPus56sh7DhjDmgzGdENPkD12UbHaYjZfq",
      "0","0","3580");

    // sadmin
    createUser($conn, $userTable, $authTable, $compauthTable, $accreditationTable,
      "competition", "admin", "a street","","Somewhere", "Victoria", "15", "3000",
      "9999-9999", "2", "1", "29", "1", "sadmin@davison-family.com",
      "1","E99199","sadmin","$2a$10\$edVsCNApby1ZnIVeUmbjPus56sh7DhjDmgzGdENPkD12UbHaYjZfq",
      "16383","0","63487");

    // cmuser1
    createUser($conn, $userTable, $authTable, $compauthTable, $accreditationTable,
      "competition", "admin", "a street","","Somewhere", "Victoria", "15", "3000",
      "9999-9999", "2", "1", "29", "1", "cmuser1@davison-family.com",
      "1","E99199","cmuser1","$2a$10\$edVsCNApby1ZnIVeUmbjPus56sh7DhjDmgzGdENPkD12UbHaYjZfq",
      "0","0","15");

    // cmuser2
    createUser($conn, $userTable, $authTable, $compauthTable, $accreditationTable,
      "competition", "admin", "a street","","Somewhere", "Victoria", "15", "3000",
      "9999-9999", "2", "0", "29", "1", "cmuser2@davison-family.com",
      "1","E99199","cmuser2","$2a$10\$edVsCNApby1ZnIVeUmbjPus56sh7DhjDmgzGdENPkD12UbHaYjZfq",
      "0","0","15");

    // judgeDirector
    createUser($conn, $userTable, $authTable, $compauthTable, $accreditationTable,
      "competition", "admin", "a street","","Somewhere", "Victoria", "15", "3000",
      "9999-9999", "2", "1", "29", "1", "judgeDirector@davison-family.com",
      "1","E99199","judgeDirector","$2a$10\$edVsCNApby1ZnIVeUmbjPus56sh7DhjDmgzGdENPkD12UbHaYjZfq",
      "0","0","428");

    // compTreasurer
    createUser($conn, $userTable, $authTable, $compauthTable, $accreditationTable,
      "competition", "admin", "a street","","Somewhere", "Victoria", "15", "3000",
      "9999-9999", "2", "1", "29", "1", "compTreasurer@davison-family.com",
      "1","E99199","compTreasurer","$2a$10\$edVsCNApby1ZnIVeUmbjPus56sh7DhjDmgzGdENPkD12UbHaYjZfq",
      "0","0","1268");

    // dataOfficer
    createUser($conn, $userTable, $authTable, $compauthTable, $accreditationTable,
      "competition", "admin", "a street","","Somewhere", "Victoria", "15", "3000",
      "9999-9999", "2", "1", "29", "1", "dataOfficer@davison-family.com",
      "1","E99199","dataOfficer","$2a$10\$edVsCNApby1ZnIVeUmbjPus56sh7DhjDmgzGdENPkD12UbHaYjZfq",
      "0","0","32");

    // Setup some extra auth records

    $escapedValues = escapeValues($conn, array('28', '15659', '3580'));
    $compauthTable->insert($conn, $escapedValues);

    $escapedValues = escapeValues($conn, array('29', '15659', '3580'));
    $compauthTable->insert($conn, $escapedValues);

    $compauthTable->finalise($conn); 
  }
  print "\n\nUser Table migrated successfully\n";
} else {
  print "User Table Skipped\n";
}


if(true){//----------- table creation
  print "Creating Blurb table\n";
  $blurbTable->create($conn);

  print "Creating Region tables\n";
  $regionTable->create($conn);

  print "Creating compquestions table\n";
  $compquestionsTable->create($conn);

  print "Creating question table\n";
  $questionTable->create($conn);

  print "Creating Compinstance Table\n";
  $compinstTable->create($conn);


  print "Creating flight Table\n";
  $flightTable->create($conn);

  print "Creating flightJudge Table\n";
  $flightjudgeTable->create($conn);

//  print "Creating entry Table\n";
//  $entryTable->create($conn);

  print "Creating entryresponse Table\n";
  $entryresponseTable->create($conn);

}

// Migrate the simple table data

migrateTable($conn, 'region',$regionTable, ['regionid','regionlevel','regionparent','gst','timezone','regionname']);
migrateTable($conn,'clubs',$clubTable,['clubname','clubid','regionid']);
migrateTable($conn, 'award', $awardTable, ['awardID','compinstid','presentationOrder','awardName', 'awardDescription','awardWinner','awardSponsor','0','0']);
//migrateTable($conn, 'compcategory', $categoryTable, ['categoryid','compinstid','categoryname','categoryorder', 'firstprize','secondprize','thirdprize','categoryorder', 'scoreTemplate']);
migrateTable($conn, 'compsubcategory', $subcategoryTable, ['subcategoryid','compinstid','subcategoryname', 'subcategoryorder' ,'categoryid','subcategoryorder']);
migrateTable($conn, 'sponsor', $sponsorTable, ['sponsorid','sponsorname','sponsorblurb', 'sponsorlinksm', 'sponsorlinklg', 'sponsorimgsm', 'sponsorimglg','uselink','clickthrough']);
migrateTable($conn, 'compjudges', $compjudgeTable, ['compinstid','categoryid','subcategoryid','judgeid','drupal_user_id','0']);
migrateTable($conn, 'compdiscounteligibility', $clubdiscountTable, ['compinstid','clubid']);

print "Renaming the compstate column in the competition table\n";

$sql = 'ALTER TABLE compm001_cmdata_live.`competition` CHANGE compstate rootcompstate INT;';
if($conn->error){
  die("Connection failed: ".$conn->error."\n");
}

print ("Building staff table\n");
$staffTable->create($conn);
$result=importTable($conn, 'compjudges');

while($row = $result->fetch_assoc()){
  $values=array($row['compinstid'], $row['drupal_user_id'], 1, $row['judgeid'], '');
  $staffTable->insert($conn, $values);
}
$staffTable->finalise($conn);

print "compstate renamed successfully\n";
$compQuestions=array();
$compScoreTemplates=array();
$compPaidEntries=array();

// Correct for the first competition detail record having an incorrect competition id

print("Correcting the first competitiondetail record\n\n");
$sql = "UPDATE compm001_cmdata_live.compdetails SET compinstid=1 where compinstid=0";
$result = $conn->query($sql);
if($conn->error){
  die("Connection failed: ".$conn->error."\n");
}


if(array_key_exists("c",$options)){
  $sql = "SELECT * FROM compm001_cmdata_live.`compinstance` INNER JOIN compdetails ON compdetails.compinstid=compinstance.compinstid JOIN competition ON compinstance.compid=competition.compid";
  $result = $conn->query($sql);
  if($conn->error){
    die("Connection failed: ".$conn->error."\n");
  }

  print("Creating questionpage table\n");
  $questionpageTable->create($conn);

  print("Migrating competition instance data\n");

  if ($result->num_rows > 0)
  {
    while($row = $result->fetch_assoc()){
      /// Store the scoresheetid for each comp

      print_r($row,false);

      $compScoreTemplates[$row["compinstid"]] = $row["scoresheetid"];
      print('Setting template for comp ID: '.$row["compinstid"]." to ".$row["scoresheetid"]."\n");

      $compPaidEntries[$row["compinstid"]]=0;

      if($row['lockofflinesheet']>1){
        $row['lockofflinesheet']=1;
      }
      if($row['startdate']=='0000-00-00 00:00:00'){
        $row['startdate'] = '2000-01-01 00:00:00';
      }
      
      if($row['enddate'] == '0000-00-00 00:00:00'){
        $row['enddate'] = '2000-01-01 00:00:00';
      }
      if($row['entryopendate'] == '0000-00-00 00:00:00'){
        $row['entryopendate'] = '2000-01-01 00:00:00';
      }
      if($row['entryclosedate'] == '0000-00-00 00:00:00'){
        $row['entryclosedate'] = '2000-01-01 00:00:00';
      }
      $row['bannerImg'] = $row['compinstid'].'.png';
      

      if(array_key_exists("t",$options)){
        print("Altering comps for testing\n");
        if($row['compinstid']==28){
          print("SABSOSA changed\n");
          $row['startdate']="2017-07-23 09:00:00";
          $row['enddate'] = "2017-07-24 17:00:00";
          $row['entryopendate'] = '2017-01-01 00:00:00';
          $row['entryclosedate'] = '2017-01-01 00:00:00';
        }
        if($row['compinstid']==29){
          print("Vicbrewchanged\n");
          $row['startdate']="2017-09-10 09:00:00";
          $row['enddate'] = "2017-09-11 17:00:00";
          $row['entryopendate'] = '2017-01-01 00:00:00';
          $row['entryclosedate'] = '2017-01-01 00:00:00';
          $row['acceptingentries'] = 1;
        }
      }


      // Build up a bitwise competition state
      $compState = 0;

      if(new DateTime($row['enddate']) < new DateTime()){
        $row['compstate'] = 16;
      }
      print "------------------------\n";
      print "Is this competition accepting entries? \n";
      print $row['acceptingentries']."\n";
      if($row['acceptingentries']==1){
        print "\n\nACCEPTING ENTRIES!!!\n\n";
        $row['compstate']=2;
      }

      $t1=-1; $t2=-1; $t3=-1; $t4=-1; $t5=-1; $t6=-1; $sn1=""; $sn2=""; $sn3=""; $sn4=""; $bn1=""; $bn2="";

      if($row['discount3_data'] == '')
        $row['discount3_data'] = 0;

      $values = [ $row["compinstid"], $row["compstate"], $row["instancetitle"], $row["address1"], $row["address2"], 
                  $row["city"], $row["state"], $row["postcode"],
                  $row["country"], $row["mapref"], '',$row["contactphone"], $row["contactemail"], 
                  $row["startdate"], $row["enddate"],
                  $row["basefee"], $row["discount1_value"], $row["discount2_value"], $row["discount3_value"],
                  $row["categorylabel"], $row["categoryreq"], $row["subcategorylabel"], $row["subcategoryreq"], 
                  $row["entryopendate"],
                  $row["entryclosedate"], $row["scoresheetid"], $row["scorefilepattern"], $row["paypalfixedfee"], 
                  $row["paypalvariablefee"],
                  $row["compmasterfixedfee"], $row["compmastervariablefee"], $row["gst"], $row["entries"],
                  $row["totallimit"], $row["tallymode"], $row["signature"], $row["offlinesignature"], 
                  $row["scoresheetsig"], $row["scoresheetversion"],
                  // Removed from schema - incorporated into compstate.
                 // $row["acceptingentries"], 
                  $row["resultspublished"], $row["requestingstaff"], 
                  $row["requestingjudges"], 
                  $row["requestingjudgeassistants"], $row["allowunpaid"], $row["lockscoresheet"], 
                  $row["validresults"], 
                  $row["lockofflinesheet"], $row["showsponsors"], $row["hideadmin"], $row["scoresheetsready"], 
                  $row['compregionid'], $row['compinstid'].'.png', 0,0,0,0, $row['totallimit'], $row['categorylimit'],
                  $row['subcategorylimit'],
                  $row['discount3_data'], 7];
        $escapedValues = array();
        foreach ($values as $value){
          array_push($escapedValues, mysqli_real_escape_string($conn, $value));      
        }
        $compinstTable->insert($conn, $escapedValues);
        $compQuestions[$row["compinstid"]] = array();

        $sql = "INSERT INTO compquestions (compinstId, t1) VALUES (?,?) ON DUPLICATE KEY UPDATE `t1`=?;";

        $qLabels = ["t1",'t2','t3','t4','t5','t6','sn1','sn2','sn3','sn4','bn1','bn2'];
        $types = ["t1" => 1, "t2"=>1, "t3"=>1, "t4"=>1, "t5"=>1, "t6"=>1,
          "sn1"=>2, "sn2"=>2, "sn3"=>2, "sn4"=>2, 
          "bn1"=>3, "bn2"=>3];

        // Create a default page for every comp and put the questions there initially

        $sql  = $questionpageTable->insert($conn, [$row['compinstid'],'1','All Questions',0]);
        $questionPageId = $conn->insert_id;


//        print "Compinstance: ".$row['compinstid']."\n";
        foreach ($qLabels as $label){
          if($row[$label.'used']>0){
 //           print "   uses ".$label."\n";

            if(!array_key_exists($label.'default', $row)){
              $row[$label.'default']='';
            }
            $values=[$row['compinstid'],$types[$label], $row[$label.'label'] , $row[$label.'req'], $row[$label.'weight'], 
                     $row[$label.'default'], $row[$label.'judging'], $row[$label.'running'], $row[$label.'report'], 
                     $row[$label.'description'], $row[$label.'onlabel'],$row[$label.'offlineweight'], $row[$label.'used'], $row[$label.'usedoffline'],'', $questionPageId,"",""];
            $escapedValues = array();
            foreach ($values as $value){
              array_push($escapedValues, mysqli_real_escape_string($conn, $value));      
            }
            $sql = $questionTable->insert($conn, $escapedValues);
            $compQuestions[$row["compinstid"]][$label] = $conn->insert_id; 
          }
        }
        for($x=1;$x<=5;$x++){
          if($row['blurb'.$x]){
            $values=[$row['compinstid'], $row['title'.$x], $row['blurb'.$x], $x];
            $escapedValues = array();
            foreach ($values as $value){
              array_push($escapedValues, mysqli_real_escape_string($conn, $value));      
            }
            $blurbTable->insert($conn, $escapedValues);
          }
        }



      }
  }
  $compinstTable->finalise($conn);
}
print "Score Templates:\n";
print_r($compScoreTemplates);


// Migrate the compsponsor table, eliminating any rowsfor which no sponsor exists...

print ('Commencing Sponsor Migration\n');

$compsponsorTable->create($conn);

$liveSponsors = array();
$catSponsors=array();

$sql = "SELECT * from sponsor";
$result=$conn->query($sql);

while($row = $result->fetch_assoc()){
  $sponsorId = $row["sponsorid"];
  $liveSponsors[$sponsorId]=$row;
}

$sql = "SELECT * from `compsponsor`";
$result=$conn->query($sql);
while($row = $result->fetch_assoc()){
  print "Saving ".$row['sponsorid'].' into category '.$row['sponsorcategory']."\n";
  $catSponsors[$row['sponsorcategory']]=$row['sponsorid'];

  if(array_key_exists($row['sponsorid'],$liveSponsors)){
    print ("FOund a sponsor\n");
    $compsponsorTable->insert($conn, [$row['compinstid'], $row['sponsorid'], $row['sponsorcategory'], $row['sponsortype']]);

  } else {
    print ('No sponsor found for id '.$row['sponsorid']."!\n");
  }
}
$compsponsorTable->finalise($conn);

// Add the scoresheet ID's and sponsors to each category....

$categoryTable->create($conn);
$sql = "SELECT * from compcategory";
$result = $conn->query($sql);

while($row = $result->fetch_assoc()){
  print_r($row);
  if(!array_key_exists($row['categoryid'], $catSponsors)){
    $catSponsors[$row['categoryid']]=0;
  }
//  print 'Saving sponsor: '.$catSponsors[$row['categoryid']].' into category '. $row['categoryid'];
  if($row['categoryid']!=43){
    $values=[
        $row['categoryid'], 
        $row['compinstid'], 
        $row['categoryname'], 
        $row['categoryorder'], 
        $row['firstprize'], 
        $row['secondprize'], 
        $row['thirdprize'], 
        $row['categoryorder'], 
        $compScoreTemplates[$row['compinstid']],
        $catSponsors[$row['categoryid']],
        0,
        0
      ]; 
    $escapedValues = array();
    foreach ($values as $value){
      array_push($escapedValues, mysqli_real_escape_string($conn, $value));      
    }
    $categoryTable->insert($conn,$escapedValues);
  }
}
$categoryTable->finalise($conn);


// Now scan through all the cetegories and sort the results to determine placing.
// This now gets dumpped into rank...




print "Re-instating the compstate column\n";

$sql = 'ALTER TABLE compm001_cmdata_live.`competition` CHANGE rootcompstate compstate INT;';
if($conn->error){
  die("Connection failed: ".$conn->error."\n");
}
print "Compstate re-instated\n";

//------------------------------
// Migrate the competition entries

if(array_key_exists("e",$options)){
  print "Migrating the core entryform data\n";
  migrateTable($conn, 'compentryform', $entryTable, 
    [
      'entryformid',
      'compinstid',
      'entrynumber',
      'payment_pending',
      'paid',
      'entrydate',
      'entrytype',
      'categoryid',
      'subcategoryid',
      'tie1',
      'tie2',
      'tie3',
      'tie4',
      'tie5',
      'tie6',
      'tie7',
      'tie8',
      'tie9',
      'tie10',
      'tiebreaker',
      'entrantid',
      'securityid',
      'cost',
      'cancelled',
      'clubid',
      'sessionorder',
      'totalscore',
      'adminrank',
      'bulktransactionid',
      'scoreTemplateId',
      'labelimage',
      'flightId']);


  print "Migrating the entryform responses\n";
  print "First fix up the mis-assigned category 43 -> 41\n";

  $sql = "UPDATE compentryform set compinstid=11,categoryid=41 where categoryid=43;";
  $result = $conn->query($sql);
  if($conn->error){
    die("Connection failed: ".$conn->error."\n");
  }

  print "OK. Now migrate the entry form data...\n";

  $sql = "SELECT * FROM compentryform;";
  $result = $conn->query($sql);
  if($conn->error){
    die("Connection failed: ".$conn->error."\n");
  }

  while ($row = $result->fetch_assoc()){
    // CHange the entrantID if testing has been requested...

    if(array_key_exists("t",$options)){
      if($row['entryformid']==11312 ||
         $row['entryformid']==11320 ||
         $row['entryformid']==11357 ||
         $row['entryformid']==11359 ||
         $row['entryformid']==11325 ||
         $row['entryformid']==11379) {
        $row['entrantid']=14476;
      }
    }
    // Increment the paidEntry counter if this entry has been paid...

    if($row['paid']){
      $compPaidEntries[$row['compinstid']]++;
    }
    $sql = "UPDATE cmlive.`entry` set scoreTemplateId='".
      $compScoreTemplates[$row['compinstid']].
      "',entrantid='".
      $row['entrantid'].
      "' where id='".
      $row['entryformid'].
      "';";
    //print $sql;
    $irrelevant = $conn->query($sql);
    if($conn->error){
      die("Connection failed: ".$conn->error."\n");
    }



    if(array_key_exists($row['compinstid'],$compQuestions)){
  //    print "===========================================\n";
  //    print "Compinstance ID: ".$row['compinstid']."\n";
  //    var_dump($compQuestions[$row['compinstid']]);
  //    print "\n\n";
  //    print "Processing Compinstance: ".$row['compinstid']."\n";
      foreach(['t1','t2','t3','t4','t5','t6','sn1','sn2','sn3','sn4','bn1','bn2'] as $element){
  //      print "Element is: ".$element."\n";
        if(array_key_exists($element, $compQuestions[$row['compinstid']])){
  //        print "Entryform ID is: ".$row['entryformid']."\n";
  //        print "Question ID is: ".$compQuestions[$row['compinstid']][$element]."\n";
          if($row[$element]){
            $response = mysqli_real_escape_string($conn, $row[$element]);
          } else{
            $response='';  
          }

          $entryresponseTable->insert($conn, [ $row['compinstid'], $row['entryformid'], 
            $compQuestions[$row['compinstid']][$element], $response ,'0']);      
        }
      }
    }
  }
  $sql="update cmlive.`entry` set  paid=1 where paid>1";
  $result=$conn->query($sql);
  $sql="update cmlive.`entry` set  entrantId=11 where entrantId=0";
  $result=$conn->query($sql);
  $sql="update cmlive.`category` set  categoryCode=null where categoryCode=0";
  $result=$conn->query($sql);
  $sql="update cmlive.`subcategory` set  subcategoryCode=null where subcategoryCode=0";
  $result=$conn->query($sql);

  // lastly go back and update the competitions with the number of paid entries

  /*
  print "Updating paidEntries column in compinst.\n";

  foreach($compPaidEntries as $key=>$value){
    $sql = "UPDATE cmlive.`compinst` set paidEntries='".
           $value.
           "' WHERE `id`='".
           $key.
           "';";
    $result=$conn->query($sql);
    if($conn->error){
      die("Couldn't update compinst...".$conn->error."\n");
    }
  }
  print "Finished updating paidEntries column in compinst.\n";
   */
  
}
if(array_key_exists("r",$options)){
  print "setting rank for each entryform\n";

  $sql = "SELECT * from cmlive.`category`;";
  $result=$conn->query($sql);

  if($conn->error){
    die("Connection failed: ".$conn->error."\n");
  }
  print_r($result,false);

  while ($row = $result->fetch_assoc()){
    print "Ranking Category ".$row['id']."\n";
    $sql = "SELECT * from cmlive.`entry` where categoryId=".$row["id"]." ORDER BY ".
        "rank DESC,totalScore DESC,tie1 DESC,tie2 DESC,tie3 DESC,tie4 DESC,tie5 DESC,tie6 DESC,tie7 DESC,tie8 DESC,tie9 DESC,tie10 DESC,".
        "tiebreaker DESC";
    $result2 = $conn->query($sql);
    if($conn->error){
      die("Connection failed: ".$conn->error."\n");
    }
    $rank=1;
    while($entry = $result2->fetch_assoc()){
      $entryId = $entry["id"];
      print "Ranking Entry ".$entryId." as ".$rank."\n";
      $sql = "UPDATE `cmlive`.entry SET rank=".$rank." where id = ".$entryId.";";
      $conn->query($sql);
      $rank=$rank+1;
    } 
  }
}

// Payment dates in the bulk transactions are all invalid, so set them all to 2000-02-02 for now.

print ("Commencing Shopping Cart Migration\n");
$shoppingcartTable->create($conn);
$result=importTable($conn, 'bulktransaction');

while($row = $result->fetch_assoc()){
  $values=array($row['bulktransactionid'], $row['paid'], '2000-02-02 00:00:00', $row['price'], $row['transactionstatus']);
  $shoppingcartTable->insert($conn, $values);
}
$shoppingcartTable->finalise($conn);

print ("Shopping Carts Migrated\n");


//migrateTable($conn, 'bulktransaction', $shoppingcartTable, ['bulktransactionid','paid','paymentdate','price','transactionstatus']);
migrateTable($conn, 'compmasteradmin', $cmadminTable, ['paypalfixedfee','paypalvariablefee','compmasterfixedfee','compmastervariablefee']);
if(array_key_exists("s", $options)){

  migrateTable($conn, 'compscores', $scoresheetTable, ['entryformid','judgeid','scanid','total','s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','adminrank','secureid','compinstid']);
  $scoretemplateTable->create($conn);
  $result=importTable($conn, 'compscoresheets');

  while($row = $result->fetch_assoc()){
    $values=array($row['scoresheetname'], 
    $row['s1label'],$row['s1max'],$row['s1tie'],
    $row['s2label'],$row['s2max'],$row['s2tie'],
    $row['s3label'],$row['s3max'],$row['s3tie'],
    $row['s4label'],$row['s4max'],$row['s4tie'],
    $row['s5label'],$row['s5max'],$row['s5tie'],
    $row['s6label'],$row['s6max'],$row['s6tie'],
    $row['s7label'],$row['s7max'],$row['s7tie'],
    $row['s8label'],$row['s8max'],$row['s8tie'],
    $row['s9label'],$row['s9max'],$row['s9tie'],
    $row['s10label'],$row['s10max'],$row['s10tie'],'',3,7);

    $scoretemplateTable->insert($conn, $values);
  }
  $scoretemplateTable->finalise($conn);
}

//migrateTable($conn, 'compsponsor', $compsponsorTable, ['compinstid','sponsorid','sponsorcategory','sponsortype']);
//migrateTable($conn, 'staff', $staffTable, ['compinstid','drupal_user_id','notes']);



print ('Commencing Special Access Migration\n');
$specialaccessTable->create($conn);
$result=importTable($conn, 'specialaccess');

while($row = $result->fetch_assoc()){
  $values=array($row['compinstid'], $row['uid'], '2000-02-02 00:00:00');
  $specialaccessTable->insert($conn, $values);
}
$specialaccessTable->finalise($conn);

print ("Special access Migrated\n");

print ("Creating flight data\n");

$flightMap=array();

$sql = "SELECT * from cmlive.`category`;";
$result=$conn->query($sql);

if($conn->error){
  die("Connection failed: ".$conn->error."\n");
}

while ($row = $result->fetch_assoc()){
  $tmpFlightId = $row["compInstId"]*10000+$row["id"];

  if(!(isset($flightMap[$tmpFlightId])||array_key_exists($tmpFlightId, $flightMap))){
    $sql = $flightTable->insert($conn, [$row["compInstId"], 'Flight A', '', '0', $row["id"], '0', '2017-02-01 17:00:00', '2017-02-01 22:00:00']);
    $flightId = $conn->insert_id;
    $flightMap[$tmpFlightId]=$flightId;
  }
}

/*
var_dump($flightMap);
 */

/* Now set the flight ID for compjudges and entry tables */

$sql = "SELECT * FROM cmlive.`compjudge`;";
$result=$conn->query($sql);

if($conn->error){
  die("Connection failed: ".$conn->error."\n");
}

$flightjudges=array();

while($row = $result->fetch_assoc()){
  /*
  print("Id: ".$row["id"]."\n");
  print("CompInstId: ".$row["compInstId"]."\n");
   */

  if($row["compInstId"] == 0){
  } else {
    $flightMapId = $row["compInstId"]*10000+$row["categoryId"];
    /*
    print("flightMapId: ".$flightMapId."\n");
     */
    $flightId = $flightMap[$flightMapId];
    $sql = "UPDATE cmlive.`compjudge` SET flightId=".$flightId." WHERE id='".$row["id"]."'";
    print("SQL for flight ID:\n");
    print($sql."\n\n");
    $res=$conn->query($sql);
    if($conn->error){
      die("Connection Failed: ".$conn->error."\n");
    }

    /* Increment the judge counter for this flight...*/
    $sql = "UPDATE cmlive.`flight` SET judges=judges+1 WHERE id=".$flightId;
    $res=$conn->query($sql);
    if($conn->error){
      die("Connection Failed: ".$conn->error."\n");
    }
    
  }
}

$sql = "SELECT * FROM cmlive.`entry`;";
$result=$conn->query($sql);

if($conn->error){
  die("Connection failed: ".$conn->error."\n");
}

while($row = $result->fetch_assoc()){
  /*
  print("Id: ".$row["id"]."\n");
  print("CompInstId: ".$row["compInstId"]."\n");
   */

  if(($row['id']==9534)||($row['id']==9535)){
    $row['categoryId']=154;
  }
  if($row["categoryId"] == 0){
  } else {
    $flightMapId = $row["compInstId"]*10000+$row["categoryId"];
    /*
    print("flightMapId: ".$flightMapId."\n");
     */
    if($flightMapId!=43){
      $flightId = $flightMap[$flightMapId];
      $sql = "UPDATE cmlive.`entry` SET flightId=".$flightId." WHERE id=".$row["id"];
      $res=$conn->query($sql);
      if($conn->error){
        die("Connection Failed: ".$conn->error."\n");
      }
    }
  }
}


print ("Flight data created\n");


if(array_key_exists("t",$options)){
  print "Generating test data\n";

  // Entry numbers have been manupilated earlier....

  $sql  = $questionpageTable->insert($conn, [29,'2','Specialty Information',234]);
  $questionPageId = $conn->insert_id;
  print('Created a test question page with ID: '.$questionPageId."\n");
  $sql = $flightTable->insert($conn, [29, 'Test flight', '','0', '0', '0', '2017-02-01 17:00:00', '2017-02-01 22:00:00']);
  $sql = $flightTable->insert($conn, [29, 'Test flight #2','', '0', '0', '0', '2017-02-01 17:00:00', '2017-02-01 22:00:00']);
  $sql = $flightTable->insert($conn, [29, 'Test flight #3','', '0', '0', '0', '2017-02-01 17:00:00', '2017-02-01 22:00:00']);
  $flightId = $conn->insert_id;
  print('Created a test flightwith ID: '.$flightId."\n");

}

print "+=====================================+\n";
print "| Migration complete.                 |\n";
print "+=====================================+\n";
