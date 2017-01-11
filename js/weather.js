var content = jQuery('#content');
var grafs = content.text().split('\n\n');
var markup = '[cq comment="ASIDE PLACED BELOW"]\n<aside class=\'related alignright\'> <h2 class=\'widget-title\'><a href=\'/weather\'>Weather</a></h2> [dfm_iframe src=\'http://extras.denverpost.com/weather/widget-iframe.html\' width=\'300px\' height=\'550px\'] </aside>[cq comment="ASIDE PLACED ABOVE"]\n';
grafs.splice(3, 0, markup);
jQuery('#content').text(grafs.join('\n\n'));
