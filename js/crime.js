var bookmarklet = {
    content: jQuery('#content'),
    neighborhoods: Array('Wellshire',  'CBD',  'University Hills',  'Overland',  'Speer',  'Gateway / Green Valley Ranch',  'Ruby Hill',  'Marston',  'North Capitol Hill',  'City Park',  'Indian Creek',  'Five Points',  'Sun Valley',  'Westwood',  'Cole',  'Washington Park West',  'Platt Park',  'Harvey Park South',  'Villa Park',  'Athmar Park',  'Skyland',  'North Park Hill',  'Sunnyside',  'Southmoor Park',  'Jefferson Park',  'Capitol Hill',  'Windsor',  'Barnum West',  'Virginia Village',  'Montbello',  'Bear Valley',  'Goldsmith',  'Stapleton',  'Chaffee Park',  'Cory-Merrill',  'Northeast Park Hill',  'Union Station',  'Washington Park',  'Barnum',  'Elyria-Swansea',  'Civic Center',  'Hampden South',  'Globeville',  'City Park West',  'Clayton',  'Cheesman Park',  'Country Club',  'Hale',  'Mar Lee',  'Lincoln Park',  'Berkeley',  'West Highland',  'Harvey Park',  'Regis',  'East Colfax',  'Whittier',  'Belcaro',  'Hampden',  'Fort Logan',  'College View / South Platte',  'West Colfax',  'Baker',  'Kennedy',  'Cherry Creek',  'DIA',  'Congress Park',  'South Park Hill',  'Rosedale',  'Valverde',  'Lowry Field',  'Washington Virginia Vale',  'Auraria',  'Hilltop',  'Highland',  'Montclair',  'University',  'University Park',  'Sloan Lake'),
    get_type: function () {
        this.type = prompt('Enter 1 for a neighborhood crime promo or hit enter for a crime-specific promo');
    },
    get_neighborhood = function() {
        this.neighborhood = prompt('Type in the name of the neighborhood');
    }
    init: function () {
        this.grafs = this.content.text().split('\n\n');
        this.pos = grafs.length - 2;
var editing = true;
var ceiling = 10;
if ( content.text().indexOf('in-article-promo') !== -1 ) {
    promos = [];
    item = undefined;
}
if ( typeof item !== 'undefined' ) {
    var section_id = prompt('Enter 1 for soft-news promos, 2 for hard-news promos, 3 for Broncos and nothing for sports, 6 = entertainment, 7 restaurants, 8 food, 9 Ask Amy, 10 books. 11 movies, 12 home-garden, 13 yourhub, 14 editorials, 15 politics, 16 travel 17 real-estate 18 business 19 tech 20 featured homes \n 420 marijuana.', '');
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
        grafs.splice(Math.floor(len/2) + 1, 0, '[dfm_iframe src=\'http://extras.denverpost.com/app/in-article-promo/' + section + '-' + item + '.html\' width=\'100%\' height=\'100px\']');
        item = promos.pop();
    }
}
if ( typeof item !== 'undefined' && grafs[grafs.length-1].indexOf('in-article') === -1 ) {
    grafs.splice(grafs.length, 0, '[dfm_iframe src=\'http://extras.denverpost.com/app/in-article-promo/' + section + '-' + item + '.html\' width=\'100%\' height=\'100px\']');
}
jQuery('#content').text(grafs.join('\n\n'));
