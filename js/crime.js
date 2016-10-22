var bookmarklet = {
    content: jQuery('#content'),
    neighborhoods: Array('Wellshire',  'CBD',  'University Hills',  'Overland',  'Speer',  'Gateway / Green Valley Ranch',  'Ruby Hill',  'Marston',  'North Capitol Hill',  'City Park',  'Indian Creek',  'Five Points',  'Sun Valley',  'Westwood',  'Cole',  'Washington Park West',  'Platt Park',  'Harvey Park South',  'Villa Park',  'Athmar Park',  'Skyland',  'North Park Hill',  'Sunnyside',  'Southmoor Park',  'Jefferson Park',  'Capitol Hill',  'Windsor',  'Barnum West',  'Virginia Village',  'Montbello',  'Bear Valley',  'Goldsmith',  'Stapleton',  'Chaffee Park',  'Cory-Merrill',  'Northeast Park Hill',  'Union Station',  'Washington Park',  'Barnum',  'Elyria-Swansea',  'Civic Center',  'Hampden South',  'Globeville',  'City Park West',  'Clayton',  'Cheesman Park',  'Country Club',  'Hale',  'Mar Lee',  'Lincoln Park',  'Berkeley',  'West Highland',  'Harvey Park',  'Regis',  'East Colfax',  'Whittier',  'Belcaro',  'Hampden',  'Fort Logan',  'College View / South Platte',  'West Colfax',  'Baker',  'Kennedy',  'Cherry Creek',  'DIA',  'Congress Park',  'South Park Hill',  'Rosedale',  'Valverde',  'Lowry Field',  'Washington Virginia Vale',  'Auraria',  'Hilltop',  'Highland',  'Montclair',  'University',  'University Park',  'Sloan Lake'),
    get_markup: function() {
        if ( this.type == '1' ) {
            return '<aside class="related right">\n\
<h2 class="widget-title"><a href="http://crime.denverpost.com/">Denver Crime Report Data</a></h2>\n\
<p>See our <a href="http://crime.denverpost.com/neighborhood/' + this.slug + '/">index of reported crimes in Denver\'s ' + this.neighborhood + ' neighborhood</a>, and our <a href="http://crime.denverpost.com/neighborhood/compare/">ranking of neighborhood crime rates</a>.</p>\n\
</aside>\n\n';
        }
        else if ( this.type == '' ) {
            return '<aside class="related right">\n\
<h2 class="widget-title"><a href="http://crime.denverpost.com/">Denver Crime Report Data</a></h2>\n\
<div style="width:100%;height: 150px;overflow:hidden"><a href="http://crime.denverpost.com/crime/' + this.slug + '/"><img src="http://www.denverpost.com/wp-content/uploads/2016/10/denver-crime-map.png" alt="Denver crime map" width="100%" style="width:100%;margin-top:-40px"></a></div>\n\
<p>See our <a href="http://crime.denverpost.com/crime/' + this.slug + '/">heatmap of reported ' + this.crime + ' in Denver</a>.</p>\n\
</aside>\n\n';
        }
    },
    get_type: function () {
        this.type = prompt('Enter 1 for a neighborhood crime promo or hit enter for a crime-specific promo');
    },
    get_neighborhood = function() {
        this.neighborhood = prompt('Type in the name of the neighborhood');
        this.slug = this.slugify(this.neighborhood);
    }
    get_crime = function() {
        crime_id = prompt('Hit enter for Violent Crimes, type 1 for Assaults, 2 for Bank Robberies, 3 for Bike Thefts, 4 for Burglaries, 5 for Car Thefts, 6 for DUIs,\
        7 for hit and runs, 8 for Domestic Violence, 9 for Homicides, 10 for Property Crimes,\
        11 for Sexual Assault, 12 for Rape, 13 for Robberies');
        this.crime = 'violent crime'; this.slug = 'violent';
        else if ( crime_id.indexOf('10') >= 0 ) { this.crime = 'sexual assault'; this.slug = 'sexual-assault'; }
        else if ( crime_id.indexOf('11') >= 0 ) { this.crime = 'rape'; this.slug = 'sexual-assault/rape'; }
        else if ( crime_id.indexOf('12') >= 0 ) { this.crime = 'robbery'; this.slug = 'robbery'; }
        else if ( crime_id.indexOf('13') >= 0 ) { this.crime = ''; this.slug = ''; }
        else if ( crime_id.indexOf('14') >= 0 ) { this.crime = ''; this.slug = ''; }
        else if ( crime_id.indexOf('15') >= 0 ) { this.crime = ''; this.slug = ''; }
        else if ( crime_id.indexOf('16') >= 0 ) { this.crime = ''; this.slug = ''; }
        else if ( crime_id.indexOf('17') >= 0 ) { this.crime = ''; this.slug = ''; }
        else if ( crime_id.indexOf('18') >= 0 ) { this.crime = ''; this.slug = ''; }
        else if ( crime_id.indexOf('19') >= 0 ) { this.crime = ''; this.slug = ''; }
        else if ( crime_id.indexOf('20') >= 0 ) { this.crime = ''; this.slug = ''; }
        else if ( crime_id.indexOf('1') >= 0 ) { this.crime = 'assaults'; this.slug = 'assault'; }
        else if ( crime_id.indexOf('2') >= 0 ) { this.crime = 'bank robbery'; this.slug = 'robbery/robbery-bank'; }
        else if ( crime_id.indexOf('3') >= 0 ) { this.crime = 'bike theft'; this.slug = 'theft-bicycle'; }
        else if ( crime_id.indexOf('4') >= 0 ) { this.crime = 'burglary'; this.slug = 'burglary'; }
        else if ( crime_id.indexOf('5') >= 0 ) { this.crime = 'car theft'; this.slug = 'auto-theft'; }
        else if ( crime_id.indexOf('6') >= 0 ) { this.crime = 'DUIs'; this.slug = 'traffic-accident-dui-duid'; }
        else if ( crime_id.indexOf('7') >= 0 ) { this.crime = 'hit-and-runs'; this.slug = 'traffic-accident-hit-and-run'; }
        else if ( crime_id.indexOf('8') >= 0 ) { this.crime = 'domestic violence'; this.slug = 'dv'; }
        else if ( crime_id.indexOf('9') >= 0 ) { this.crime = 'homicide'; this.slug = 'homicide'; }
    }
    init: function () {
        this.grafs = this.content.text().split('\n\n');
        this.pos = grafs.length - 2;
    },
    slugify: function(str)
    {
        // Cribbed from https://github.com/andrefarzat/slugify/blob/master/slugify.js
        var from = 'àáäãâèéëêìíïîòóöôõùúüûñç·/_,:;',
        to = 'aaaaaeeeeiiiiooooouuuunc------';

        var i = 0,
            len = from.length;
        
        str = str.toLowerCase();

        for ( ; i < len; i++ )
        {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        return str.replace(/^\s+|\s+$/g, '') //trim
            .replace(/[^-a-zA-Z0-9\s]+/ig, '')
            .replace(/\s/gi, "-");
    },
}
var editing = true;
var ceiling = 10;
if ( content.text().indexOf('in-article-promo') !== -1 ) {
    promos = [];
    item = undefined;
}
if ( typeof item !== 'undefined' ) {
    var section_id = prompt('Enter 1 for soft-news promos, 2 for hard-news promos, 3 for Broncos and nothing for sports, 6 = entertainment, 7 restaurants, 8 food, 9 Ask Amy, 10 books. 11 movies, 12 home-garden, 13 yourhub, 14 editorials, 15 politics, 16 travel 17 real-estate 18 business 19 tech 20 featured homes \n 420 marijuana.', '');
    var section = 'sports';
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
