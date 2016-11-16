var content = jQuery('#content');
var grafs = content.text().split('\n\n');
var len = grafs.length;
if ( len == 1 ) {
    grafs = content.text().split('</p><p>');
    len = grafs.length;
    if ( len == 1 ) {
        grafs = content.text().split('</p>\n<p>');
        len = grafs.length;
        if ( len == 1 ) {
            grafs = content.text().split('    <p>');
            len = grafs.length;
            if ( len == 1 ) {
                grafs = content.text().split('</p> \n<p>');
                len = grafs.length;
            }
        }
    }
}
var promos = [1,2,3,4,5].sort(function() { return .5 - Math.random(); });
promos.pop(); promos.pop();
var item = promos.pop();
var editing = true;
var ceiling = 10;
if ( content.text().indexOf('in-article-promo') !== -1 ) {
    promos = [];
    item = undefined;
}
if ( typeof item !== 'undefined' ) {
    var section_id = prompt('Enter 1 for soft-news promos, 2 for hard-news promos, 3 for Broncos and nothing for sports, 6 = entertainment, 7 restaurants, 8 food, 9 Ask Amy, 10 books. 11 movies, 12 home-garden, 13 yourhub, 14 editorials, 15 politics, 16 travel 17 real-estate 18 business 19 tech 20 featured homes \n 21 season to share\n 420 marijuana.', '');
    var section = 'sports';
    if ( section_id.indexOf('420') >= 0 ) { section = 'marijuana'; item = 'map'; }
    else if ( section_id.indexOf('10') >= 0 ) { section = 'books'; }
    else if ( section_id.indexOf('11') >= 0 ) { section = 'movies'; }
    else if ( section_id.indexOf('12') >= 0 ) { section = 'home-garden'; }
    else if ( section_id.indexOf('13') >= 0 ) { section = 'yourhub'; }
    else if ( section_id.indexOf('14') >= 0 ) { section = 'editorials'; }
    else if ( section_id.indexOf('15') >= 0 ) { section = 'politics'; }
    else if ( section_id.indexOf('16') >= 0 ) { section = 'travel'; }
    else if ( section_id.indexOf('17') >= 0 ) { section = 'real-estate'; }
    else if ( section_id.indexOf('18') >= 0 ) { section = 'business'; }
    else if ( section_id.indexOf('19') >= 0 ) { section = 'tech'; }
    else if ( section_id.indexOf('20') >= 0 ) { section = 'featured-homes'; }
    else if ( section_id.indexOf('21') >= 0 ) { section = 'season-to-share'; }
    else if ( section_id.indexOf('1') >= 0 ) { section = 'dont-miss'; }
    else if ( section_id.indexOf('2') >= 0 ) { section = 'hard-news'; }
    else if ( section_id.indexOf('3') >= 0 ) { section = 'broncos'; }
    else if ( section_id.indexOf('4') >= 0 ) { section = 'nuggets'; }
    else if ( section_id.indexOf('5') >= 0 ) { section = 'rockies'; }
    else if ( section_id.indexOf('6') >= 0 ) { section = 'entertainment'; }
    else if ( section_id.indexOf('7') >= 0 ) { section = 'restaurants'; }
    else if ( section_id.indexOf('8') >= 0 ) { section = 'food'; }
    else if ( section_id.indexOf('9') >= 0 ) { section = 'ask-amy'; }
}
if ( len > 10 ) {
    grafs.splice(4, 0, '[dfm_iframe src=\'http://extras.denverpost.com/app/in-article-promo/' + section + '-' + item + '.html\' width=\'100%\' height=\'100px\']');
    item = promos.pop();
    if ( len > 16 ) {
        grafs.splice(Math.floor(len/2) + 1, 0, '[dfm_iframe src=\'http://extras.denverpost.com/app/in-article-promo/' + section + '-' + item + '.html\' width=\'100%\' height=\'100px\' scrolling=\'no\']');
        item = promos.pop();
    }
}
if ( typeof item !== 'undefined' && grafs[grafs.length-1].indexOf('in-article') === -1 ) {
    grafs.splice(grafs.length, 0, '[dfm_iframe src=\'http://extras.denverpost.com/app/in-article-promo/' + section + '-' + item + '.html\' width=\'100%\' height=\'100px\' scrolling=\'no\']');
}
jQuery('#content').text(grafs.join('\n\n'));
