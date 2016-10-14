var content = jQuery('#content');
var grafs = content.text().split('\n\n');
var len = grafs.length;
var section_id = prompt('Enter 1 for Broncos, 2 for Nuggets, 3 for Avs, 4 for Rockies, 5 for Preps, 6 for Rapids 7 for colleges', '');
var section = 'broncos';
if ( section_id.indexOf('1') >= 0 ) { section = 'broncos'; }
else if ( section_id.indexOf('2') >= 0 ) { section = 'nuggets'; }
else if ( section_id.indexOf('3') >= 0 ) { section = 'avalanche'; }
else if ( section_id.indexOf('4') >= 0 ) { section = 'rockies'; }
else if ( section_id.indexOf('5') >= 0 ) { section = 'prep'; }
else if ( section_id.indexOf('6') >= 0 ) { section = 'rapids'; }
else if ( section_id.indexOf('7') >= 0 ) { section = 'colleges'; }

// MATCHER
var matcher_config = {
    elements: content,
    dir: '//extras.denverpost.com/app/nouner/lookup/',
    section: section
};

var p;
p = "//extras.denverpost.com/app/nouner/";
jQuery.getScript(p + "matcher.js", function() { matcher.init(); });
//jQuery('#content').text(grafs.join('\n\n'));
