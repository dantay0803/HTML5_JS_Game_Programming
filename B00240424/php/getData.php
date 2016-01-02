<?php
    // Connect to the database(host, username, password)
    $con = mysql_connect('localhost','root','');
    if (!$con)
    {
        echo "Failed to make connection.";
        exit;
    }
    // Select the database. Enter the name of your database (not the same as the table name)
    $db = mysql_select_db('thedeadofnightdb');
    if (!$db)
    {
        echo "Failed to select db.";
        exit;
    }


    $sql = "SELECT * FROM upgrades_tbl";
    $rs = mysql_query( $sql );
    //GetData
    while($row = mysql_fetch_array($rs)) {
           // Write the value of the column FirstName (which is now in the array $row)
          echo $row['userID'] . " " . $row['password'] . " " . $row['upgrade_Health'] . " " . $row['upgrade_Ammo'] ." " . $row['upgrade_Damage'] ." ";
    }
?>