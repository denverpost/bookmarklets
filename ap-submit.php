<?php

error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
//require('/var/www/lib/class.ftp.php');

function addslashes_recursive( $input ) {
    if ( is_array( $input ) ) {
        return array_map( __FUNCTION__, $input );
    } else {
        return addslashes( $input );
    }
}

$tag_file = './ap-tagignore.js';
$tags_start = 'var autoProducerTagList = [';
$tags_end = '];';

$options_file = './ap-options.js';
$options_start = 'var autoProducerOptions = ';

if (isset($_POST) && $_POST['tags_save'] == true) {
	$tags_list = file_get_contents($tag_file);
	$tags = array_map('stripslashes', explode(',',str_replace(array($tags_start,$tags_end,'"'),'',$tags_list)));
	foreach ($_POST as $key => $value) {
		if (strpos($key,'tagdelete-') !== false) {
			$index = str_replace('tagdelete-', '', $key);
			if ($value == 1 && $index > -1) {
				array_splice($tags,$index,1);
			}
		}
	}
	$new_tags = (strlen($_POST['addnewtag']) > 1) ? array_map('trim', explode(',',$_POST['addnewtag'])) : false;
	$tags = ($new_tags) ? array_merge($tags, $new_tags) : $tags;
	$tags = array_values(array_unique($tags));
	natcasesort($tags);
	$tags = array_map("trim", addslashes_recursive($tags));
	$tags_write = $tags_start.'"'.implode('","',$tags).'"'.$tags_end;
	file_put_contents($tag_file,$tags_write,LOCK_EX); /*
	$ftp = new ftp;
    $ftp->file_put('ap-tagignore', '', 'js', TRUE, FTP_ASCII, '/DenverPost/app/bookmarklet/autoproducer/');
    $ftp->ftp_connection_close(); */
	header("Location:./ap-edit-tags.php");
} /* else if (isset($_POST) && $_POST['types_save'] == true) {
	$options_list = file_get_contents($options_file);
	$options_string = str_replace($options_start,'',$options_list);
	$options = json_decode($options_string);
	var_dump($options);
} */