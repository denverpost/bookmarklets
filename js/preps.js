var content = jQuery('#content');
var grafs = content.text().split('\n\n');
var markup = '[cq comment="ASIDE PLACED BELOW"]\n<aside class=\'related right\'> <h2 class=\'widget-title\'><a href=\'http://preps.denverpost.com/\'>Colorado Prep Stats</a></h2> [dfm_iframe src=\'http://preps.denverpost.com/sidebar.html\' width=\'300px\' height=\'250px\' scrolling=\'no\'] </aside>[cq comment="ASIDE PLACED ABOVE"]\n';
grafs.splice(3, 0, markup);
jQuery('#content').text(grafs.join('\n\n'));
