<?php

$file = 'new-requests.txt';

$testObj = "\t".'"check-sections": ["'.implode($_GET['check-sections'],'","').'"],'."\n";

$newObj = ','."\n";
$newObj = '"": {'."\n";
$newObj .= "\t".'"title": "'.$_GET['title'].'",'."\n";
$newObj .= "\t".'"check-sections": ["'.implode($_GET['check-sections'],'","').'"],'."\n";
$newObj .= "\t".'"add-tags": ['.((count($_GET['add-tags']) > 0) ? '"' : '').implode($_GET['add-tags'],'","').((count($_GET['add-tags']) > 0) ? '"' : '').'],'."\n";
$newObj .= "\t".'"primary-section": "'.$_GET['primary-section'].'",'."\n";
$newObj .= "\t".'"primary-tag": "'.$_GET['primary-tag'].'",'."\n";
$newObj .= "\t".'"features": ['.((count($_GET['features']) > 0) ? '"' : '').implode($_GET['features'],'","').((count($_GET['features']) > 0) ? '"' : '').'],'."\n";
$newObj .= "\t".'"apple-news": ['.((count($_GET['apple-news']) > 0) ? '"' : '').implode($_GET['apple-news'],'","').((count($_GET['apple-news']) > 0) ? '"' : '').'],'."\n";
$newObj .= "\t".'"related": '.$_GET['related'].','."\n";
$newObj .= "\t".'"help-primary-tag": "'.(strlen($_GET['help-primary-tag']) >= 2 ? $_GET['help-primary-tag'] : '').'",'."\n";
$newObj .= "\t".'"help-sections": "'.implode($_GET['help-sections'],', ').'",'."\n";
$newObj .= "\t".'"help-primary-section": "'.$_GET['help-primary-section'].'",'."\n";
$newObj .= "\t".'"option-set": "'.$_GET['option-set'].'",'."\n";
$newObj .= '},'."\n";

if( strpos(file_get_contents($file),$testObj) == false) {
	file_put_contents($file, $newObj, FILE_APPEND | LOCK_EX);
	$message = 'New request: '.$_GET['title']."\r\n" . $newObj . "\r\n";
	mail('dschneider@denverpost.com','New AUTO-PRODUCER™ request!',$message);
}

?>