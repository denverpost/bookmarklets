<?php

$tags_list = file_get_contents('./ap-taglist.js');
$tags_start = 'var autoProducerTagList = [';
$tags_end = '];';

$tags = explode(',',str_replace(array($tags_start,$tags_end),'',$tags_list));

var_dump($tags);

?>