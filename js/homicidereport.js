var content = jQuery('#content');
var grafs = content.text().split('\n\n');
var markup = '[cq comment="ASIDE PLACED BELOW"]\n<aside class=\'related alignright\'> <h2 class=\'widget-title\'><a href=\'/denver-homicides/\'>Homicide Report</a></h2>\n\
<div style="width:100%;height: 150px;overflow:hidden"><a href=\'/denver-homicides/\'><img src=\'http://www.denverpost.com/wp-content/uploads/2016/10/homicide-map-denver.png\' alt=\'Denver Homicide Map\' border=\'0\'></a></div> <p>Follow this year\'s <a href=\'/denver-homicides/\'>homicides in Denver</a>, and track the city\'s homicide rate. See also: <a href="http://crime.denverpost.com/map/">Denver crime map</a>.</p> </aside>[cq comment="ASIDE PLACED ABOVE"]\n';
grafs.splice(3, 0, markup);
jQuery('#content').text(grafs.join('\n\n'));
