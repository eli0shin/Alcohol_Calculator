<?

	
	$curl = curl_init();
	curl_setopt($curl,CURLOPT_URL,"localhost/drinks.php");
	curl_setopt($curl,CURLOPT_POST,0);
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	
	$result = curl_exec($curl);
	curl_close($curl);
	
	echo $result;
	
	?>