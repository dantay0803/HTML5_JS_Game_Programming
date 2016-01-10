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
		$upgradeHealth = $request_json['upgradeHealth'];
		$upgradeAmmo = $request_json['upgradeAmmo'];
		$upgradeDamage = $request_json['upgradeDamage'];
	    $sql = "INSERT INTO upgrades_tbl (userID, password, upgrade_Health, upgrade_Ammo, upgrade_Damage) VALUES ('".$theuser."', '".$thepassword."', $upgradeHealth, $upgradeAmmo, $upgradeDamage)";
	    $query = mysql_query($sql);
    }
?>