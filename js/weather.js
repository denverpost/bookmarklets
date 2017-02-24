var wxcontent = jQuery('#content');
var wxgrafs = wxcontent.text().split('\n\n');
var wxmarkup = '[cq comment="ASIDE PLACED BELOW"]\n<aside class=\'related alignright\'> [dfm_iframe src=\'http://extras.denverpost.com/weather/widget-iframe.html\' width=\'300px\' height=\'590px\'] </aside>[cq comment="ASIDE PLACED ABOVE"]\n';
wxgrafs.splice(3, 0, wxmarkup);
wxgrafs.push('<a href="http://www.thedenverchannel.com/weather">Click here for more Denver7 weather coverage</a>.');
jQuery('#content').text(wxgrafs.join('\n\n'));
