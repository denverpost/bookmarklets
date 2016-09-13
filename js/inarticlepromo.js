var content = jQuery('#content');
var grafs = content.text().split('\n\n');
var len = grafs.length;
var promos = [1,2,3,4,5].sort(function() { return .5 - Math.random(); });
var item = promos.pop();
var editing = true;
var ceiling = 6;
if ( content.text().indexOf('in-article-promo') !== -1 ) {
    promos = [];
    item = undefined;
}
if ( typeof item !== 'undefined' ) {
    var section_id = prompt('Enter 1 for soft-news promos, 2 for hard-news promos and nothing for sports.', '');
    var section = 'sports';
    if ( section_id.indexOf('1') >= 0 ) {
        section = 'dont-miss';
    }
    else if ( section_id.indexOf('2') >= 0 ) {
        section = 'hard-news';
    }
}
while ( editing == true ) {
    if ( len <= ceiling ) {
        editing = false;
    }
    if ( typeof item !== 'undefined' ) {
        grafs.splice(ceiling, 0, '[dfm_iframe src=\'http://extras.denverpost.com/app/in-article-promo/' + section + '-' + item + '.html\' width=\'100%\' height=\'150px\']');
    }
    item = promos.pop();
    ceiling += 6;
}
if ( typeof item !== 'undefined' ) {
    grafs.splice(ceiling, 0, '[dfm_iframe src=\'http://extras.denverpost.com/app/in-article-promo/' + section + '-' + item + '.html\' width=\'100%\' height=\'150px\']');
}
jQuery('#content').text(grafs.join('\n\n'));
