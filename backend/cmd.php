<?php

include('login.php');

require_once 'config.php';
require_once 'jalousieModel.php';

DatastoreService::setInstance(new DatastoreService($google_api_config));

$command=$_GET["command"]?$_GET["command"]:"none";

switch($command){
	case "open":
	case "close":
		if(!$author) {
			echo "Please, login and then proceed ;)";
			return;
		}
		$model = new jalousieModel($command, $author);
		$model->put(); // save the instance to the datastore
		$memcache->set("lastState", '[{"currentState": "'.$command.'", "user": "'.$author.'"}]');
		return;
	break;

	case "getlog":
		$count=5;
		if(isset($_GET["count"])) $count=intval($_GET["count"]);
		header('Content-Type: application/json');
		
		if($count==1){
			$lastState=$memcache->get("lastState");
			if($lastCommand===false)
				echo(jalousieModel::getLast($count, true));
			else 
				echo($lastState);				
		} else {
			echo(jalousieModel::getLast($count, true));
		}

		return;
	break;

}

?>