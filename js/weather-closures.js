var content = jQuery('#content');
var grafs = content.text().split('\n\n');
var markup = '[cq comment="ASIDE PLACED BELOW"]\n<aside class=\'related alignright\'> <h2 class=\'widget-title\'><a href=\'/denver-school-closures/\'>Weather Closures</a></h2> <a href=\'/denver-scool-closures/\'><img src=\'http://www.denverpost.com/wp-content/uploads/2016/04/cd03snow_ac27575x.jpg\' alt=\'School and government closures\' border=\'0\'></a> <p>A <a href=\'/denver-school-clousres/\'>listing of school and government office closures</a>.</p> </aside>[cq comment="ASIDE PLACED ABOVE"]\n';
grafs.splice(3, 0, markup);
jQuery('#content').text(grafs.join('\n\n'));
