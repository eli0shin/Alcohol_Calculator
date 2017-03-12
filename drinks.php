<?
$con = mysql_connect('localhost','root','') or die('couldn\'t connect.');
mysql_select_db ('alcohol');

if($_SERVER['REQUEST_METHOD'] == 'POST'){
	if(isset($_REQUEST['drinkName']) and ($_REQUEST['drinkType']) and ($_REQUEST['alcoholPercent']) and ($_REQUEST['drinkVolume'])){
		$drinkName = htmlentities($_REQUEST['drinkName'],ENT_QUOTES);
		$drinkType = htmlentities($_REQUEST['drinkType'], ENT_QUOTES);
		$alcoholPercent = htmlentities($_REQUEST['alcoholPercent'],ENT_QUOTES);
		$drinkVolume = htmlentities($_REQUEST['drinkVolume'],ENT_QUOTES);
	}
	else{
		exit();
	}

	$sql = "INSERT INTO drink (drinkName, drinkType, alcoholPercent, drinkVolume, userId) VALUES ('$drinkName', '$drinkType', '$alcoholPercent', '$drinkVolume', '18')";
	mysql_query($sql) or die(mysql_error());

}

if($_SERVER['REQUEST_METHOD'] == 'GET'){
	getDrinks();
}

function getDrinks(){
	$sql = "SELECT * FROM drink WHERE userId = '18' ORDER BY drinkName ASC";
	$result = mysql_query($sql) or die(mysql_error());
	$x = 0;
	$drinksArr = array();
	while($myrow = mysql_fetch_array($result)){
		$tmpArr['drinkName'] = $myrow['drinkName'];
		$tmpArr['drinkType'] = $myrow['drinkType'];
		$tmpArr['alcoholPercent'] = $myrow['alcoholPercent'];
		$tmpArr['drinkVolume'] = $myrow['drinkVolume'];
		array_push($drinksArr,$tmpArr);
	}
	$allDrinksArr = json_encode($drinksArr);
	echo $allDrinksArr;
}

?>
