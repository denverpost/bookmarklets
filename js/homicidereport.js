var content = jQuery('#content');
var grafs = content.text().split('\n\n');
var markup = '<aside class=\'related right\'> <h2 class=\'widget-title\'><a href=\'/denver-homicides/\'>Homicide Report</a></h2> <a href=\'/denver-homicides/\'><img src=\'http://www.denverpost.com/wp-content/uploads/2016/10/homicide-map-denver.png\' alt=\'Denver Homicide Map\' border=\'0\'></a> <p>Track this year\'s <a href=\'/denver-homicides/\'>homicides in Denver</a>, and compare the city\'s homicide rate to Denver\'s homicide rate in past years.</p> </aside>';
grafs.splice(3, 0, markup);
jQuery('#content').text(grafs.join('\n\n'));
