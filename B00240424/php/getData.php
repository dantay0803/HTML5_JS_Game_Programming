<?php
    // Connect to the database(host, username, password)
    $con = mysql_connect('localhost','root','');
    if (!$con)
    {
        echo "Failed to make connection.";
        exit;
    }
    // Select the database. Enter the name of your database (not the same as the table name)
    $db = mysql_select_db('phaserdb');
    if (!$db)
    {
        echo "Failed to select db.";
        exit;
    }



    if (isset($_POST['json'])) {
        // use json_decode() transform to array
        $request_json = json_decode($_POST['json'], true);
        $theuser = $request_json['user'];
        $thepassword = $request_json['password'];

        $sql = "SELECT * FROM upgrades_tbl WHERE userID= '".$theuser."' AND password= '".$thepassword."'";
        $rs = mysql_query( $sql );
        //GetRowsWithMatchingUserName
        while($row = mysql_fetch_array($rs)) {
            echo $row['userID']. " " .$row['password']. " " .$row['upgrade_Health']. " " .$row['upgrade_Ammo']. " " .$row['upgrade_Damage']. " ";
        }
    }
?>