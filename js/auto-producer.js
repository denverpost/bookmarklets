(function() {
    var APversion = ' v1.0.4';
    function HTMLescape(html){
        return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML;
    }

    function pad(n) {
        return (n < 10 && n >= 0) ? ("&nbsp;&nbsp;" + n) : n;
    }

    function padNum(n) {
        return (n < 10 && n >= 0) ? ("0" + n) : n;
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(function (key) {
                return object[key] === value;
        });
    }

    function vSec() {
        var dt = new Date();
        var secs = dt.getSeconds() + (60 * dt.getMinutes());
        return secs;
    }

    function serialize(obj, prefix) {
        var str = [], p;
        for(p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }

    function stripTheHTML(html) {
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       return tmp.textContent || tmp.innerText || "";
    }
    
    function slugItUp(inText) {
        return inText.toLowerCase().replace(/[^\w\ ]+/g,'').replace(/ +/g,'-');
    }
    
    function autoProducerPost(randomGif) {
        function captureSections() {
            var output = [];
            jQuery('#categorychecklist input:checked').each(function(){
                output.push(jQuery(this).attr('value'));
            });
            return output;
        }

        function captureSectionsHelp() {
            var output = [];
            jQuery('#categorychecklist input:checked').each(function(){
                var secName = jQuery(this).parent().clone().children().remove().end().text();
                output.push(secName.trim());
            });
            return output;
        }

        function captureTags() {
            var output = [];
            jQuery('#tagsdiv-post_tag .tagchecklist > span').each(function(){
                var tempTag = jQuery(this).clone().children().remove().end().text();
                output.push(tempTag.trim());
            });
            return output;
        }

        function captureFeatures() {
            var output = [];
            jQuery('#tagsdiv-feature .tagchecklist > span').each(function(){
                var tempTag = jQuery(this).clone().children().remove().end().text();
                if (tempTag.match(/Outstream/)) {
                    output.push(tempTag.trim());
                }
            });
            return output;
        }

        function captureAppleNews() {
            var output = [];
            jQuery('#apple-news-publish div.section input:checked').each(function() {
                var checked = getKeyByValue(appleNewsSections, jQuery(this).attr('id'));
                if (typeof checked != 'undefined') {
                    output.push(checked);
                }
            });
            return output;
        }

        function captureNew() {
            var optionObject = {};
            var newTitle = null;
            loop:
            while(true) {
                newTitle = prompt('What should we call this option?\n\n','');
                if (newTitle !== '' && newTitle !== null) {
                    break loop;
                } else {
                    alert('You have to enter name, dude.');
                }
            }
            var newRelated = confirm('Should Related by Primary Tag be added to stories automatically?');
            optionObject.title = newTitle;
            optionObject['check-sections'] = captureSections();
            optionObject['add-tags'] = captureTags();
            optionObject['primary-section'] = document.getElementById(sectionSelect).value;
            optionObject['primary-tag'] = document.getElementById(tagSelect).value;
            optionObject.features = captureFeatures();
            optionObject['apple-news'] = captureAppleNews();
            optionObject.related = newRelated;
            var tagString = '#'+tagSelect+' option[value="'+optionObject['primary-tag']+'"]';
            optionObject['help-primary-tag'] = (jQuery(tagString).text() == ' ') ? '' : jQuery(tagString).text();
            optionObject['help-sections'] = captureSectionsHelp();
            var secString = '#'+sectionSelect+' option[value="'+optionObject['primary-section']+'"]';
            optionObject['help-primary-section'] = (jQuery(secString).text() == ' ') ? '' : jQuery(secString).text();
            if (newTitle !== '' && newTitle !== null) {
                if (confirm('You\'re about to submit a new option called ' + newTitle + '. Are you sure?')) {
                    var i = document.createElement("img");
                    i.style.cssText = 'display:none;';
                    i.src = 'http://www.denverpostplus.com/app/autoproducer/ap-new.php?'+serialize(optionObject);
                }
            } else {
                alert('Sorry, something went wrong. Try again. \n\n\nOh, and next time -- don\'t do whatever you did that broke it this time.');
            }
        }

        function checkSections(tags){
            for (var i=0,len=tags.length;i<len;i++){
                document.getElementById('in-category-'+tags[i]).checked = true;
            }
        }

        function checkAppleNewsBoxes(boxes){
            for (var i=0,len=boxes.length;i<len;i++){
                document.getElementById(appleNewsSections[boxes[i]]).checked = true;
            }
        }

        function primaryOptions(sectionPrimary,tagPrimary){
            if ( (typeof sectionPrimary != 'undefined' && sectionPrimary !== '') && document.getElementById(sectionSelect).value === '' )  {
                document.getElementById(sectionSelect).value = sectionPrimary;
            }
            if ( (typeof tagPrimary != 'undefined' && tagPrimary !== '') && document.getElementById(tagSelect).value === '' ) {
                document.getElementById(tagSelect).value = tagPrimary;
            }
        }

        function addTag(newTags){
            for(var i=0,len=newTags.length;i<len;i++){
                document.getElementById('new-tag-post_tag').value = newTags[i];
                jQuery('#post_tag .ajaxtag input.button.tagadd').click();
            }
        }

        function addFeatures(newFeatures){
            for(var i=0,len=newFeatures.length;i<len;i++){
                document.getElementById('new-tag-feature').value = newFeatures[i];
                jQuery('#feature .ajaxtag input.button.tagadd').click();
            }
        }

        function addAPauthor(){
            jQuery('#coauthors_hidden_input').remove();
            jQuery('.suggest.coauthor-row:first-child').append('<input id="coauthors_hidden_input" name="coauthors[]" value="the-associated-press" type="hidden">');
        }

        function addWaPoauthor(){
            jQuery('#coauthors_hidden_input').remove();
            jQuery('.suggest.coauthor-row:first-child').append('<input id="coauthors_hidden_input" name="coauthors[]" value="the-washington-post" type="hidden">');
        }

        function checkDPSPOnline() {
            document.getElementById('following_usergroups12195').checked = true;
        }

        function suggestSomeTags(tags) {
            tagsHTML = '<script>';
            tagsHTML += 'function slugItUp(inText) {';
            tagsHTML += 'return inText.toLowerCase().replace(/[^\\\w\ ]+/g,\'\').replace(/ +/g,\'-\');';
            tagsHTML += '}';
            tagsHTML += 'function addSuggestedTag(newSuggestedTag) {';
            tagsHTML += 'document.getElementById(\'new-tag-post_tag\').value = newSuggestedTag;';
            tagsHTML += 'jQuery(\'#post_tag .ajaxtag input.button.tagadd\').click();';
            tagsHTML += 'var delTag = \'#tagSuggest_\' + slugItUp(newSuggestedTag);';
            tagsHTML += 'jQuery(delTag).remove();';
            tagsHTML += '}';
            tagsHTML += 'function closeSuggestedTags() {';
            tagsHTML += 'jQuery(\'#autoProducerSuggestedTags\').remove();';
            tagsHTML += '}';
            tagsHTML += 'jQuery(\'body, html\').animate({ scrollTop: jQuery(\'#autoProducerSuggestedTags\').offset().top - 70 }, \'fast\');';
            tagsHTML += '</script>';
            tagsHTML += '<div style="width:88%;padding:.5em 1em;border:1px solid DarkRed;font-size:1em;color:DarkRed;" id="autoProducerSuggestedTags">';
            tagsHTML += '<p style="color:black;font-size:1.1em;">I have some suggested tags for you -- click to add them!</p>';
            tagsHTML += '<ul style="list-style-type:none;text-indent:none;font-size:1.2em;">';
            for (var i=0,len=tags.length;i<len;i++){
                var slug = slugItUp(tags[i]);
                tagsHTML += '<li id="tagSuggest_'+slug+'" onClick="javascript:addSuggestedTag(\''+tags[i]+'\')" style="cursor:pointer;margin:0 0 .25em;padding:0;">+ '+tags[i]+'</li>';
            }
            tagsHTML += '</ul>';
            tagsHTML += '<p style="color:black;margin-top:1em;font-size:1.1em;text-align:right;cursor:pointer;" onClick="javascript:closeSuggestedTags();"><strong>Close</strong></p>';
            tagsHTML += '</div>';
            jQuery('#tagsdiv-post_tag .inside').prepend(tagsHTML);
        }

        function trumpThatBitch(options,args) {
            var contentArgs = [];
            contentArgs.wire = true;
            if (typeof args.WaPoauthorSelect != 'undefined' && args.WaPoauthorSelect === true) {
                addWaPoauthor();
            }
            if (typeof args.APauthorSelect != 'undefined' && args.APauthorSelect === true) {
                addAPauthor();
            }
            if ((typeof options.related != 'undefined' && options.related === true) || args.selectRelated === true) {
                contentArgs.related = true;
            }
            if (typeof options['check-sections'] != 'undefined' && options['check-sections'].indexOf('94') > -1) {
                checkDPSPOnline();
            }
            if (typeof options.title != 'undefined' && options.title == 'Weather Story') {
                contentArgs.wx = true;
            }
            if (typeof options.title != 'undefined' && options.title == 'Recipes') {
                contentArgs['rel-section'] = true;
            }
            if (typeof options.title != 'undefined' && options.title == 'Crime Story' && !args.homicideSelect) {
                contentArgs.crime = true;
            }
            if (args.homicideSelect) {
                contentArgs.homicide = true;
            }
            if (args.informSelect) {
                contentArgs.inform = true;
            }
            if (args.youtubeSelect) {
                contentArgs.youtube = true;
            }
            if (args.newsletterSelect) {
                contentArgs.newsletter = true;
            }
            if (args.promoSelect) {
                contentArgs.promos = true;
            }
            if (options.title == 'YourHub Crime Blotter') {
                contentArgs['related-override'] = true;
                document.getElementById('fm-mason_post_settings-0-schema-0-featured_image_settings-0').value = 'hide';
            }
            if (typeof options['check-sections'] != 'undefined') {
                checkSections(options['check-sections']);
            }
            if (typeof options['add-tags'] != 'undefined') {
                addTag(options['add-tags']);
            }
            if (typeof options.features != 'undefined') {
                addFeatures(options.features);
            }
            if (typeof options['primary-section'] != 'undefined' || typeof options['primary-tag'] != 'undefined') {
                primaryOptions(options['primary-section'],options['primary-tag']);
            }
            if (typeof options['apple-news'] != 'undefined') {
                checkAppleNewsBoxes(options['apple-news']);
            }
            var tagsSuggested = processContent(contentArgs);
            suggestSomeTags(tagsSuggested);
        }

        function processContent(args) {
            String.prototype.capitalizeFirstLetters = function() {
                var words = this.replace(/,(?=[^\s])/g, ", ").split(/[\s]+/);
                var wordsOut = [];
                for(i=0,len=words.length;i<len;i++) {
                    if (words[i].toLowerCase() == 'and') {
                        wordsOut.push(words[i].toLowerCase());
                    } else {
                        wordsOut.push(words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase());
                    }
                }
                wordsOut = wordsOut.join(' ');
                if (wordsOut.match(/,\s*$/)) {
                    wordsOut = wordsOut.replace(/,\s*$/, "");
                }
                return wordsOut;
            };
            var excerpt = document.getElementById('excerpt').textContent;
            var newExcerpt = false;
            var content = document.getElementById('content');
            var relExists = false;
            var tagLen = autoProducerTagList.length;
            var suggestedTags = [];
            var tagContent = content.textContent.toLowerCase();
            while(tagLen-- && tagLen >= 0) {
                if (new RegExp("\\b"+autoProducerTagList[tagLen].toLowerCase()+"\\b").test(tagContent)) {
                    suggestedTags.push(autoProducerTagList[tagLen]);
                }
            }
            var splitters = /\n\n|<\/p><p>|<\/p>\n<p>|[\s]{2,5}<p>|<p>|<\/p> <p>|<\/p> <p \/> <p>/;
            var grafs = content.textContent.split(splitters);
            if (grafs[0].toLowerCase().startsWith('by') || grafs[0].toLowerCase().startsWith('[caption') || grafs[0].toLowerCase().startsWith('<strong>by')) {
                if (grafs[1].toLowerCase().startsWith('by') || grafs[1].toLowerCase().startsWith('[caption') || grafs[0].toLowerCase().startsWith('<strong>by')) {
                    newExcerpt = stripTheHTML(grafs[2].replace(/\[.+\]/g,''));    
                } else {
                    newExcerpt = stripTheHTML(grafs[1].replace(/\[.+\]/g,''));
                }
            } else {
                newExcerpt = stripTheHTML(grafs[0].replace(/\[.+\]/g,''));
            }
            var grafsClean = [];
            for(i=0,len=grafs.length;i<len;i++) {
                if (grafs[i].match(/\[related_articles/) !== null) {
                    relExists = true;
                }
                if (grafs[i].match(/<p \/>/) === null && grafs[i].length > 0 && !(grafs[i].match(/&nbsp;/) && grafs[i].length < 7)) {
                    grafsClean.push(grafs[i].replace('</p>','').replace('(AP) —','--').replace('&#8212;',' '));
                }
            }
            if (args.wire) {                
                if (grafsClean[0].toLowerCase().startsWith('by')) {
                    var byline = grafsClean[0];
                    var bylineSplit = '';
                    var author = document.getElementById('coauthors_hidden_input').value;
                    if (byline.toLowerCase() == 'by the associated press') {
                        bylineSplit = 'APonly';
                    } else {
                        var index = byline.lastIndexOf(',');
                        if (byline.indexOf('(c)') > -1) {
                            bylineSplit = byline.split('(c)')[0].substr(0,index).capitalizeFirstLetters().replace('By ','').trim();
                        } else if (author != 'the-associated-press') {
                            bylineSplit = byline.substr(0,index).capitalizeFirstLetters().replace('By ','');
                        } else {
                            bylineSplit = byline.capitalizeFirstLetters().replace('By ','');
                        }
                    }
                    if (author == 'the-associated-press') {
                        if (bylineSplit == 'APonly') {
                            grafsClean.shift();
                        } else {
                            grafsClean[0] = '<strong>By ' + bylineSplit + '</strong>, <em>The Associated Press</em>';
                        }
                    } else if (author == 'the-washington-post') {
                        grafsClean[0] = '<strong>By ' + bylineSplit + '</strong>, <em>The Washington Post</em>';
                    }
                }
                if (excerpt.length < 10) {
                    excerpt = newExcerpt;
                }
                var excerptDateline = excerpt.substring(0,excerpt.indexOf('(AP) —'));
                var newExcerptText = excerpt.replace(excerptDateline,'').replace('(AP) —','').trim();
                document.getElementById('excerpt').value = newExcerptText;
            }
            if (args.related && !relExists) {
                var relPlace = (grafsClean.length-4 < 2) ? 2 : ((grafsClean.length > 24) ? 11 : grafsClean.length-4);
                if (grafsClean.length >= 6 || args['related-override']) {
                    grafsClean.splice(relPlace, 0, '[related_articles location="right" show_article_date="true" article_type="automatic-primary-tag"]');
                } else if (args['rel-section']) {
                    grafsClean.splice(relPlace, 0, '[related_articles location="right" show_article_date="true" article_type="automatic-primary-section"]');
                }
            }
            if (args.wx) {
                grafsClean.splice(3, 0, '[cq comment="ASIDE PLACED BELOW"]\n<aside class=\'related alignright\'> [dfm_iframe src=\'http://extras.denverpost.com/weather/widget-iframe.html\' width=\'300px\' height=\'590px\'] </aside>[cq comment="ASIDE PLACED ABOVE"]');
                grafsClean.push('<a href="http://www.thedenverchannel.com/weather">Click here for more Denver7 weather coverage</a>.');
            }
            if (args.crime && !args.wx) {
                var crimemap = {
                    neighborhoods: Array('Wellshire',  'CBD',  'University Hills',  'Overland',  'Speer',  'Gateway / Green Valley Ranch',  'Ruby Hill',  'Marston',  'North Capitol Hill',  'City Park',  'Indian Creek',  'Five Points',  'Sun Valley',  'Westwood',  'Cole',  'Washington Park West',  'Platt Park',  'Harvey Park South',  'Villa Park',  'Athmar Park',  'Skyland',  'North Park Hill',  'Sunnyside',  'Southmoor Park',  'Jefferson Park',  'Capitol Hill',  'Windsor',  'Barnum West',  'Virginia Village',  'Montbello',  'Bear Valley',  'Goldsmith',  'Stapleton',  'Chaffee Park',  'Cory-Merrill',  'Northeast Park Hill',  'Union Station',  'Washington Park',  'Barnum',  'Elyria-Swansea',  'Civic Center',  'Hampden South',  'Globeville',  'City Park West',  'Clayton',  'Cheesman Park',  'Country Club',  'Hale',  'Mar Lee',  'Lincoln Park',  'Berkeley',  'West Highland',  'Harvey Park',  'Regis',  'East Colfax',  'Whittier',  'Belcaro',  'Hampden',  'Fort Logan',  'College View / South Platte',  'West Colfax',  'Baker',  'Kennedy',  'Cherry Creek',  'DIA',  'Congress Park',  'South Park Hill',  'Rosedale',  'Valverde',  'Lowry Field',  'Washington Virginia Vale',  'Auraria',  'Hilltop',  'Highland',  'Montclair',  'University',  'University Park',  'Sloan Lake'),
                    get_markup: function() {
                        if ( this.type == '1' ) {
                            return '[cq comment="ASIDE PLACED BELOW"]\n<aside class="related right alignright">\n' +
                            '<h2 class="widget-title"><a href="http://crime.denverpost.com/">Denver Crime</a></h2>\n' +
                            '<p>See our <a href="http://crime.denverpost.com/neighborhood/' + this.slug + '/">index of reported crimes in Denver\'s ' + this.neighborhood + ' neighborhood</a>.</p>\n' +
                            '<p><strong>Also,</strong> ' + this.get_random_feature() + '.</p>\n' +
                            '</aside>[cq comment="ASIDE PLACED ABOVE"]';
                        }
                        else if ( this.type === '' ) {
                            return '[cq comment="ASIDE PLACED BELOW"]\n<aside class="related right alignright">\n' +
                            '<h2 class="widget-title"><a href="http://crime.denverpost.com/">Denver Crime</a></h2>\n' +
                            '<div style="width:100%;height: 150px;overflow:hidden"><a href="http://crime.denverpost.com/crime/' + this.slug + '/"><img src="' + this.get_random_image() + '" alt="Denver crime map" width="100%" style="width:100%;margin-top:-40px"></a></div>\n' +
                            '<p>See our <a href="http://crime.denverpost.com/crime/' + this.slug + '/">map, report and neighborhood rankings of ' + this.crime + ' in Denver</a>.</p>\n' +
                            '<p><strong>Also,</strong> ' + this.get_random_feature() + '.</p>\n' +
                            '</aside>[cq comment="ASIDE PLACED ABOVE"]';
                        }
                    },
                    image_list: ['http://www.denverpost.com/wp-content/uploads/2017/01/denver-crime-map11.png', 'http://www.denverpost.com/wp-content/uploads/2017/01/denver-crime-map4.png', 'http://www.denverpost.com/wp-content/uploads/2017/01/denver-crime-map3.png', 'http://www.denverpost.com/wp-content/uploads/2017/01/denver-crime-map2.png', 'http://www.denverpost.com/wp-content/uploads/2016/10/denver-crime-map.png'],
                    get_random_image: function() {
                        var ceiling = this.image_list.length;
                        var index = Math.floor(Math.random() * ceiling);
                        return this.image_list[index];
                    },
                    feature_list: [{'compare crime rates across Denver neighborhoods': 'http://crime.denverpost.com/neighborhood/compare/'}, {'see our Denver crime map': 'http://crime.denverpost.com/map/'}, {'see the Denver-city crime report': 'http://crime.denverpost.com/city/'}, {'see our list of neighborhood crime reports': 'http://crime.denverpost.com/neighborhood/'}],
                    get_random_feature: function () {
                        // Pull a random item from this.feature_list
                        var ceiling = this.feature_list.length;
                        var index = Math.floor(Math.random() * ceiling);
                        var item = this.feature_list[index];
                        var key = Object.keys(item)[0];
                        return '<a href="' + item[key] + '">' + key + '</a>';
                    },
                    get_type: function () {
                        this.type = prompt('Enter 1 for a neighborhood crime promo or hit enter for a crime-specific promo');
                        return this.type;
                    },
                    get_neighborhood: function(message) {
                        message = (typeof message == 'undefined') ? '' : message;
                        this.neighborhood = prompt(message + 'Type in the name of the neighborhood');
                        if ( this.neighborhoods.indexOf(this.neighborhood) === -1 ) {
                            if ( message === '' ) this.get_neighborhood("That's not a valid neighborhood\n");
                            else this.get_neighborhood("This is a list of valid neighborhoods: " + this.neighborhoods.join(", "));
                        }
                        this.slug = this.slugify(this.neighborhood);
                    },
                    get_crime: function() {
                        crime_id = prompt('Hit enter for Violent Crimes, type 1 for Assaults, 2 for Bank Robberies, 3 for Bike Thefts, 4 for Burglaries, 5 for Car Thefts, 6 for DUIs, 7 for hit and runs, 8 for Domestic Violence, 9 for Homicides, 10 for Property Crimes, 11 for Sexual Assault, 12 for Rape, 13 for Robberies, 14 for Drug & Alcohol, 15 for Larceny');
                        this.crime = 'violent crimes'; this.slug = 'violent';
                        if ( crime_id.indexOf('10') >= 0 ) { this.crime = 'property crimes'; this.slug = 'property'; }
                        else if ( crime_id.indexOf('11') >= 0 ) { this.crime = 'sexual assaults'; this.slug = 'sexual-assault'; }
                        else if ( crime_id.indexOf('12') >= 0 ) { this.crime = 'rapes'; this.slug = 'sexual-assault/rape'; }
                        else if ( crime_id.indexOf('13') >= 0 ) { this.crime = 'robberies'; this.slug = 'robbery'; }
                        else if ( crime_id.indexOf('14') >= 0 ) { this.crime = 'drug and alcohol crimes'; this.slug = 'drug-alcohol'; }
                        else if ( crime_id.indexOf('15') >= 0 ) { this.crime = 'larceny'; this.slug = 'larceny'; }
                        else if ( crime_id.indexOf('16') >= 0 ) { this.crime = ''; this.slug = ''; }
                        else if ( crime_id.indexOf('17') >= 0 ) { this.crime = ''; this.slug = ''; }
                        else if ( crime_id.indexOf('18') >= 0 ) { this.crime = ''; this.slug = ''; }
                        else if ( crime_id.indexOf('19') >= 0 ) { this.crime = ''; this.slug = ''; }
                        else if ( crime_id.indexOf('20') >= 0 ) { this.crime = ''; this.slug = ''; }
                        else if ( crime_id.indexOf('1') >= 0 ) { this.crime = 'assaults'; this.slug = 'assault'; }
                        else if ( crime_id.indexOf('2') >= 0 ) { this.crime = 'bank robberies'; this.slug = 'robbery/robbery-bank'; }
                        else if ( crime_id.indexOf('3') >= 0 ) { this.crime = 'bike thefts'; this.slug = 'theft-bicycle'; }
                        else if ( crime_id.indexOf('4') >= 0 ) { this.crime = 'burglaries'; this.slug = 'burglary'; }
                        else if ( crime_id.indexOf('5') >= 0 ) { this.crime = 'car thefts'; this.slug = 'auto-theft'; }
                        else if ( crime_id.indexOf('6') >= 0 ) { this.crime = 'DUIs'; this.slug = 'traffic-accident-dui-duid'; }
                        else if ( crime_id.indexOf('7') >= 0 ) { this.crime = 'hit-and-runs'; this.slug = 'traffic-accident-hit-and-run'; }
                        else if ( crime_id.indexOf('8') >= 0 ) { this.crime = 'domestic violence'; this.slug = 'dv'; }
                        else if ( crime_id.indexOf('9') >= 0 ) { this.crime = 'homicides'; this.slug = 'homicide'; }
                    },
                    init: function () {
                        if ( grafsClean.length > 5 ) this.pos = grafsClean.length - 3;

                        if ( this.get_type() == '1' ) this.get_neighborhood();
                        else this.get_crime();

                        grafsClean.splice(this.pos, 0, this.get_markup());
                    },
                    slugify: function(str) {
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
                        }
                    };
                    crimemap.init();
                }
            if (args.inform) {
                loop:
                while(true) {
                    var vidId = prompt('What is the Inform ID of the video you want to embed?\n\nNote: Embeds always appear at the top of a story, but can be moved with CTRL+X and CTRL+V\n\n','');
                    if (vidId.length == 8 && vidId.match(/^[0-9]+$/) !== null) {
                        break loop;
                    } else {
                        alert('You must enter an 8-digit number.');
                    }
                }
                loop:
                while(true) {
                    var listId = prompt('What is the Inform ID of the video you want to embed? (Hit ENTER for "News")\n\n' +
                        'Here are some of the most common playlist IDs:\n\n' +
                            'Business: 18444\n' +
                            'The Cannabist: 18445\n' +
                            'DPTV - Up To Date: 18457\n' +
                            'News: 18464 (default)\n' +
                            'News - Guns: 18548\n' +
                            'Politics: 18470\n' +
                            'Politics - Elections: 18471\n' +
                            'Sports: 18474\n' +
                            'Sports - Broncos: 18477\n\n','18464');
                    if (listId.length == 5 && listId.match(/^[0-9]+$/) !== null) {
                        break loop;
                    } else {
                        alert('You must enter an 5-digit number.');
                    }
                }
                loop:
                while(true) {
                    var autoPlay = prompt('Should it Autoplay? (Hit ENTER for "NO")\n\n' +
                        'Options:\n\n' +
                            'No Autoplay: 0 (default)\n' +
                            'Autoplay: 1\n' +
                            'Play on mouse-over: 3\n' +
                            'Play when scrolled into view: 7\n','0');
                    if (autoPlay === '0' || autoPlay === '1' || autoPlay === '7' || autoPlay === '3') {
                        break loop;
                    } else {
                        alert('You must enter a 1-digit number.');
                    }
                }
                var markup = '[cq  comment="VIDEO PLACED BELOW"]\n' +
'<div class="ndn_embed" style="width:100%;" data-config-pb="0" data-config-widget-id="' + autoPlay + '" data-config-type="VideoPlayer/Single" data-config-tracking-group="90115" data-config-playlist-id="' + listId + '" data-config-video-id="' + vidId + '" data-config-site-section="denverpost" data-config-width="100%" data-config-height="9/16w"></div> \n' +
'[cq  comment="VIDEO PLACED ABOVE"]';
                grafsClean.splice(0, 0, markup);
            }
            if (args.youtube) {
                loop:
                while(true) {
                    var vidIdRaw = prompt('What is the YouTube ID or URL of the video you want to embed?\n\nNote: Embeds always appear at the top of a story, but can be moved with CTRL+X and CTRL+V\n\n','');
                    vidId = (vidIdRaw.match(/youtube/) !== null) ? vidIdRaw.replace('https://','').replace('http://','').replace('www.','').replace('youtube.com/','').replace('watch?v=','').replace('embed/','').replace('?autoplay=1') : vidIdRaw;
                    if (vidId.length >= 11 && vidId.match(/^[A-za-z0-9_-]+$/) !== null) {
                        break loop;
                    } else {
                        alert(vidId + ' is not a valid YouTube URL or ID. Try again.');
                    }
                }
                loop:
                while(true) {
                    var autoPlay = prompt('Should it Autoplay? (Hit ENTER for "NO")\n\n' +
                        'Options:\n\n' +
                            'No Autoplay: 0 or ENTER\n' +
                            'Autoplay: 1\n','0');
                    if (autoPlay === '0' || autoPlay === '1') {
                        break loop;
                    } else {
                        alert('You must enter 0 or 1.');
                    }
                }
                var markup = '[dfm_iframe src="https://www.youtube.com/embed/' + vidId + '?autoplay=' + autoPlay + '" width="100%" advanced_fields="true" allowfullscreen="yes" scrolling="no" frameborder="0"/]';
                grafsClean.splice(0, 0, markup);
            }
            if (args.newsletter) {
                var newsletters = {
                    '1': {
                        'which': 'news',
                        'name': 'Mile High Roundup'
                    },
                    '2': {
                        'which': 'sportsdaily',
                        'name': 'Sports Daily newsletter'
                    },
                    '3': {
                        'which': 'bronxinsider',
                        'name': 'Broncos Insider'
                    },
                    '4': {
                        'which': 'marijuana',
                        'name': 'Cannabist Newsletter'
                    },
                    '5': {
                        'which': 'theknow',
                        'name': 'entertainment, dining and things to do newsletter'
                    },
                    '6': {
                        'which': 'techplus',
                        'name': 'Tech+ newsletter'
                    }
                };
                var newsletterPromptText = 'Which newsletter do you want to plug? (Hit ENTER for the Roundup)\n\n' +
                    'Options:\n\n';
                for(var object in newsletters){
                    if (newsletters.hasOwnProperty(object)) {
                        newsletterPromptText += '        ( ' + object + ' ) ' + newsletters[object].name + '\n';
                    }
                }
                newsletterPromptText += '\nEnter your selection:\n\n';
                loop:
                while(true) {
                    var newsletterId = prompt(newsletterPromptText,'1');
                    if (newsletters[newsletterId].which !== 'undefined') {
                        break loop;
                    } else {
                        alert('I\'m afraid I can\'t do that, Dave.');
                    }
                }
                var markup = '<aside>\n' +
'[dfm_iframe src="http://extras.denverpost.com/app/mailer-rules/email-signup.html?which=' + newsletters[newsletterId].which + '&name=' + encodeURIComponent(newsletters[newsletterId].name) + '" width="100%" height="120px"]\n' +
'</aside>';
                grafsClean.push(markup);
            }
            if (args.promos) {
                var promos = [1,2,3,4,5].sort(function() { return 0.5 - Math.random(); });
                promos.pop(); promos.pop();
                var item = promos.pop();
                var editing = true;
                var ceiling = 10;
                if ( content.textContent.indexOf('in-article-promo') !== -1 ) {
                    promos = [];
                    item = undefined;
                }
                if ( typeof item !== 'undefined' ) {
                    var section_id = prompt('Select the type of news to insert:\n\n\n' +
                    'News:\n' +
                        '(1) Soft news, (2) Hard news, (18) Business, (17) Real estate, (19) Tech, (20) Featured homes, (15) General Politics, (24) Trump Admin., (23) Colo. Leg., (26) Colorado Cold Cases, (27) Top Workplaces\n\n' +
                    'Sports:\n' +
                        '(Enter) Sports, (3) Broncos, (4) Nuggets, (5) Rockies\n\n' +
                    'Features:\n' +
                        '(6) Entertainment, (7) Restaurants, (8) Food, (9) Ask Amy, (10) Books, (11) Movies, (12) Home & Garden, (16) Travel, (25) Lifestyle\n\n' +
                    'Misc:\n' +
                        '(13) YourHub, (14) Editorials, (21) Season to Share, (22) Stock Show, (420) Marijuana\n\n\n' +
                    'Selection:', '');
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
                    else if ( section_id.indexOf('22') >= 0 ) { section = 'stock-show'; }
                    else if ( section_id.indexOf('23') >= 0 ) { section = 'colorado-legislature'; }
                    else if ( section_id.indexOf('24') >= 0 ) { section = 'trump-administration'; }
                    else if ( section_id.indexOf('25') >= 0 ) { section = 'lifestyle'; }
                    else if ( section_id.indexOf('26') >= 0 ) { section = 'colorado-cold-cases'; }
                    else if ( section_id.indexOf('27') >= 0 ) { section = 'top-workplaces'; }
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
                var firstPromo = (args.crime || args.wx) ? 9 : 4;
                var nextPromo = (args.crime || args.wx) ? 20 : 17;
                if ( grafsClean.length > 12 ) {
                    grafsClean.splice(firstPromo, 0, '[dfm_iframe src=\'https://extras.denverpost.com/app/in-article-promo/' + section + '-' + item + '.html\' width=\'100%\' height=\'100px\']');
                    item = promos.pop();
                    if ( grafsClean.length > nextPromo ) {
                        grafsClean.splice(Math.floor(grafsClean.length/2) + 1, 0, '[dfm_iframe src=\'https://extras.denverpost.com/app/in-article-promo/' + section + '-' + item + '.html\' width=\'100%\' height=\'100px\' scrolling=\'no\']');
                        item = promos.pop();
                    }
                }
                if ( typeof item !== 'undefined' && grafsClean[grafsClean.length-1].indexOf('in-article') === -1 && !(args.newsletter) ) {
                    grafsClean.splice(grafsClean.length, 0, '[dfm_iframe src=\'https://extras.denverpost.com/app/in-article-promo/' + section + '-' + item + '.html\' width=\'100%\' height=\'100px\' scrolling=\'no\']');
                }
            }
            if (args.homicide && !(args.crime || args.wx)) {
                grafsClean.splice(3, 0, '[cq comment="ASIDE PLACED BELOW"]\n<aside class=\'related alignright\'> <h2 class=\'widget-title\'><a href=\'/denver-homicides/\'>Homicide Report</a></h2>\n' +
'<div style="width:100%;height: 150px;overflow:hidden"><a href=\'/denver-homicides/\'><img src=\'http://www.denverpost.com/wp-content/uploads/2016/10/homicide-map-denver.png\' alt=\'Denver Homicide Map\' border=\'0\'></a></div> <p>Follow this year\'s <a href=\'/denver-homicides/\'>homicides in Denver</a>, and track the city\'s homicide rate. See also: <a href="http://crime.denverpost.com/map/">Denver crime map</a>.</p> </aside>\n[cq comment="ASIDE PLACED ABOVE"]');
            }
            document.getElementById('content').value = grafsClean.join('\n\n');
            return suggestedTags;
        }

        function insertCX() {
            var bookmarkletSource = document.createElement('script');
            bookmarkletSource.setAttribute('src', 'https://extras.denverpost.com/app/bookmarklet/js/cx-src.js?v='+vSec());
            document.body.appendChild(bookmarkletSource);
        }

        function insertClosures() {
            var bookmarkletSource = document.createElement('script');
            bookmarkletSource.setAttribute('src', 'https://extras.denverpost.com/app/bookmarklet/js/weather-closures.js?v='+vSec());
            document.body.appendChild(bookmarkletSource);
        }

        var APsuccessText = '<div class="ap-success"><h3>I can do that!</h3><p>Here\'s a random GIF while you wait. Blame Giphy if it\'s ... bad.</p><p><img src="' + randomGif + '" /></p><p><input name="readonly" value="' + randomGif + '" readonly /></p></div>';
        var sectionSelect = 'fm-mason_post_settings-0-schema-0-primary_section-0';
        var tagSelect = 'fm-mason_post_settings-0-schema-0-primary_tag-0';
        var appleNewsSections = {
            'broncos': 'apple-news-section-a39ee59b-d872-39ad-a323-b46261ea34ad',
            'colorado-news':'apple-news-section-f7f303a0-da3b-3a93-8c2c-93be489a30a6',
            'sports':'apple-news-section-3f7e6dbd-9845-39a3-ab67-14118fbd4a0e',
            'politics': 'apple-news-section-befc81a6-ec36-3426-9992-0ce17c5782f4',
            'business':'apple-news-section-9c5c2844-09ca-3e86-8315-87224d14c790',
            'entertainment':'apple-news-section-e401a8c2-26e7-3871-8ede-782e7e582af4',
            'lifestyle':'apple-news-section-c81ed803-584d-3a4a-b125-09beb6cf0f8b',
            'cannabist':'apple-news-section-aa2f2d08-860e-32b4-a1d3-765ea19a85d7',
            'opinion':'apple-news-section-4c9d0650-2499-3637-b87f-f9355a2a3471',
        };
        var options = autoProducerOptions;
        var validOptions = [];
        for(var object in options){
            if (options.hasOwnProperty(object)) {
                validOptions.push(object);
            }
        }

        function modifyDialog() {
            jQuery('#auto-producer').keydown(function (event) {
                if (event.keyCode == 13) {
                    jQuery("#btnOne").trigger("click");
                    return false;
                }
            });
            jQuery('.tooltip-link').on('mouseenter',function(){
                var tipText = jQuery(this).data("tooltip");
                jQuery('.tipGraf').html(tipText).css('display','block');
            }).on('mouseleave',function(){
                jQuery('.tipGraf').html('').css('display','none');            
            });
            jQuery("#APoptionSelect").get(0).focus();
        }

        function APdialogText(options){
            var output = '<div class="ap-options"><p>Welcome to The Denver Post AUTO🤖PRODUCER™ for Articles. Here\'s a list of helper functions I can perform for you:</p>';
            output += '<div class="one-quarter">';
            output += '<ul>';
            var optsLength = Object.keys(options).length;
            var oneThird = Math.ceil(optsLength * 0.33);
            var twoThird = Math.ceil(optsLength * 0.66);
            var i = 0;
            for(var object in options){
                var relStar = (options[object].related) ? ' <span class="red-star">*</span>' : ' ';
                var tooltipString = '<p>Sets <strong>Primary Section</strong> to:<br />' + options[object]['help-primary-section'] + '</p>';
                tooltipString += '<p>Sets <strong>Primary Tag</strong> to:<br />' + options[object]['help-primary-tag'] + '</p>';
                tooltipString += '<p>Selects these <strong>Sections</strong>:<br />' + options[object]['help-sections'] + '</p>';
                tooltipString += '<p>Adds these <strong>Tags</strong>:<br />' + options[object]['add-tags'].join(', ') + '</p>';
                tooltipString += '<p>Adds <strong>Apple News</strong> sections:<br />' + options[object]['apple-news'] + '</p>';
                tooltipString += '<p>Adds these <strong>Features</strong>:<br />' + options[object].features.join(', ') + '</p>';
                if (options.hasOwnProperty(object)) {
                    output += '<li>( ' + pad(object) + ' ) ' + options[object].title + relStar + ' <a class="tooltip-link" data-tooltip="' + HTMLescape(tooltipString) + '" href="#" tabindex="0">(?)</a></li>';
                }
                if (i == oneThird || i == twoThird) {
                    output += '</ul></div><div class="one-quarter"><ul>';
                }
                i++;
            }
            output += '</ul>';
            output += '</div>';
            output += '<div class="one-quarter">';
            output += '<div class="tipGraf" style="display:none;"></div>';
            output += '</div>';
            output += '<div class="clear"></div>';
            output += '<div class="one-third">';
            output += '<p>Enter selection: <input type="text" id="APoptionSelect" tabindex="1"></p>';
            output += '</div>';
            output += '<div class="one-third">';
            output += '<p>Insert Related by Primary Tag? <span class="red-star">*</span> <input type="checkbox" id="relatedSelect" tabindex="2" /><br />';
            output += 'Insert Inform video? <input type="checkbox" id="informSelect" tabindex="4" /><br />';
            output += 'Change author to AP? <span class="blue-star">*</span> <input type="checkbox" id="APauthorSelect" tabindex="6" /><br />';
            output += 'Insert Homicide Report? <span class="mag-star">*</span> <input type="checkbox" id="homicideSelect" tabindex="8" /></p>';
            output += '</div>';
            output += '<div class="one-third">';
            output += '<p>Insert in-article Promos? <input type="checkbox" id="promoSelect" tabindex="3" /><br />';
            output += 'Insert YouTube video? <input type="checkbox" id="youtubeSelect" tabindex="5" /><br />';
            output += 'Insert Newsletter widget? <input type="checkbox" id="newsletterSelect" tabindex="7" /><br />';
            output += 'Change author to WaPo? <span class="blue-star">*</span> <input type="checkbox" id="WaPoauthorSelect" tabindex="9" /></p>';
            output += '</div>';
            output += '<div class="clear"></div>';
            output += '<p class="red-small">Items with a star insert Related by Primary Tag automatically.<br />Related items will only be inserted on articles with 6 or more paragraphs.</p>';
            output += '<p class="blue-small">AP will override WaPo if both are checked; you WILL NOT see the new author until you save.</p>';
            output += '<p class="mag-small">Overrides the Crime Map if inserting with the "Crime Story" option.</p>';
            output += '<div class="ap-help"><a href="https://extras.denverpost.com/app/bookmarklet/ap-help.html" target="_blank">AUTO🤖PRODUCER™ Help</a></div></div>';
            return output;
        }

        function processAPform() {
            var args = [];
            var selectFunction = jQuery('#APoptionSelect').val();
            args['selectRelated'] = jQuery('#relatedSelect').prop('checked');
            args['APauthorSelect'] = jQuery('#APauthorSelect').prop('checked');
            args['WaPoauthorSelect'] = jQuery('#WaPoauthorSelect').prop('checked');
            args['promoSelect'] = jQuery('#promoSelect').prop('checked') ? true : false;
            args['informSelect'] = jQuery('#informSelect').prop('checked') ? true : false;
            args['youtubeSelect'] = jQuery('#youtubeSelect').prop('checked') ? true : false;
            args['newsletterSelect'] = jQuery('#newsletterSelect').prop('checked') ? true : false;
            args['homicideSelect'] = jQuery('#homicideSelect').prop('checked') ? true : false;
            if (validOptions.indexOf(String(selectFunction)) !== -1) {
                jQuery('#auto-producer').html(APsuccessText);
                trumpThatBitch(options[selectFunction],args);
                setTimeout(function(){ jQuery('#auto-producer').dialog('close'); },1250);
            } else {
                var again = confirm('That\'s not a valid option. Try again, or Cancel to quit.');
                if (again === false) {
                    jQuery('#auto-producer').dialog('close');
                } else {
                    return false;
                }
            }
        }

        jQuery('#auto-producer').html(APdialogText(options));
        jQuery('#auto-producer').dialog({
            autoOpen: false,
            buttons: [
                {
                    id: "btnCapture",
                    text: "CAPTURE",
                    click: function () {
                        captureNew();
                    },
                    tabindex: 17
                },
                {
                    id: "btnClosures",
                    text: "+Closures",
                    click: function () {
                        insertClosures();
                    },
                    tabindex: 16
                },
                {
                    id: "btnCX",
                    text: "+CX",
                    click: function () {
                        insertCX();
                    },
                    tabindex: 14
                },
                {
                    id: "btnCancel",
                    text: "CANCEL",
                    click: function(){
                        jQuery(this).dialog('close');
                    },
                    tabindex: 11
                },
                {
                    id: "btnOne",
                    text: "AUTO🤖PRODUCE™!",
                    click: function () {
                        processAPform();
                    },
                    tabindex: 10
                }
            ],
            title: 'Denver Post AUTO🤖PRODUCER™' + APversion,
            resize: 'auto',
            modal: true,
            minWidth: 940,
            position: { my: 'center', at: 'center', of: window, collision: "none" },
            create: function (event, ui) {
                jQuery(event.target).parent().css('position', 'fixed');
            },
            open: function(event, ui) { modifyDialog(); }
        });
        jQuery('#auto-producer').dialog('open');
    }

    function autoProducerContentHub(randomGif) {
        var options = {
            '1': {
                'title': 'Daily Camera',
                'search-term': 'daily camera',
                'default': ' checked',
            },
            '2': {
                'title': 'Longmont Times-Call',
                'search-term': 'times-call',
                'default': false,
            },
            '3': {
                'title': 'Loveland Reporter-Herald',
                'search-term': 'reporter-herald',
                'default': false,
            },
            '4': {
                'title': 'The Cannabist',
                'search-term': 'cannabist',
                'default': false,
            },
            '5': {
                'title': 'The Know',
                'search-term': 'the know',
                'default': false,
            },
            '6': {
                'title': 'San Jose Mercury News',
                'search-term': 'mercury news',
                'default': false,
            },
            '7': {
                'title': 'Fort Morgan Times',
                'search-term': 'fort morgan times',
                'default': false,
            }
        };

        var APsuccessText = '<div class="ap-success"><h3>Waiting for freakin\' Content Hub...</h3><p>Here\'s a random GIF while you wait. Blame Giphy if it\'s ... bad.</p><p><img src="' + randomGif + '" id="waiting-gif" /></p><p><input name="readonly" value="' + randomGif + '" readonly /></p></div>';

        function modifyDialog() {
            jQuery('#auto-producer').keydown(function (event) {
                if (event.keyCode == 13) {
                    jQuery("#btnOne").trigger("click");
                    return false;
                }
            });
            jQuery("input[name=searchname]:checked").focus();

        }

        function APdialogText(options){
            var output = '<div class="ap-options"><p>Welcome to The Denver Post AUTO🤖SEARCHER™ for CONTENT HUB. Here\'s what I can do for you:</p>';
            output += '<p>';
            for(var object in options){
                if (options.hasOwnProperty(object)) {
                    var tabind = (options[object]['default']) ? ' tabindex="1"' : ' tabindex="-1"';
                    output += '<input type="radio" name="searchname" value="' + options[object]['search-term'] + '" ' + tabind + options[object]['default'] + '> ' + options[object]['title'] + '<br />';
                }
            }
            output += '</p>';
            output += '<div class="clear"></div>';
            output += '<p>Add a search term? <input type="text" id="APoptionSelect" tabindex="2"></p>';
            output += '<div class="ap-help"><a href="https://extras.denverpost.com/app/bookmarklet/ap-help.html" target="_blank">AUTO🤖PRODUCER™ Help</a></div></div>';
            return output;
        }

        function processAPform() {
            var selectFunction = jQuery('#APoptionSelect').val();
            var selectSearch = jQuery("input[name=searchname]:checked").val();
            var searchString = (selectFunction !== '') ? selectSearch + ' ' + selectFunction : selectSearch;
            jQuery('#hub_search-search-input').val(searchString);
            jQuery('#auto-producer').html(APsuccessText);
            var imageLoad = setInterval(function(){
                if (jQuery('#waiting-gif').height() > 10) {
                    clearInterval(imageLoad);
                    jQuery('#search-submit').trigger("click");
                }
            },500);
        }

        jQuery('#auto-producer').html(APdialogText(options));
        jQuery('#auto-producer').dialog({
            autoOpen: false,
            buttons: [
                {
                    id: "btnCancel",
                    text: "Cancel",
                    click: function(){
                        jQuery(this).dialog('close');
                    },
                    tabindex: 4
                },
                {
                    id: "btnOne",
                    text: "AUTO🤖SEARCH™!",
                    click: function () {
                        processAPform();
                    },
                    tabindex: 3
                }
            ],
            title: 'Denver Post AUTO🤖SEARCHER™' + APversion,
            resize: 'auto',
            modal: true,
            minWidth: 900,
            position: { my: 'center', at: 'center', of: window, collision: "none" },
            create: function (event, ui) {
                jQuery(event.target).parent().css('position', 'fixed');
            },
            open: function(event, ui) { modifyDialog(); }
        });
        jQuery('#auto-producer').dialog('open');
    }

    function autoProducerWireHub(randomGif) {
        var options = {
            '0': {
                'title': 'None',
                'search-term': '',
                'default': ' checked',
            },
            '1': {
                'title': 'Associated Press',
                'search-term': 'AP ',
                'default': false,
            },
            '2': {
                'title': 'Washington Post',
                'search-term': 'washington post ',
                'default': false,
            },
            '3': {
                'title': 'Bloomberg (experimental)',
                'search-term': 'bloomberg ',
                'default': false,
            }
        };
        var APsuccessText = '<div class="ap-success"><h3>Waiting for freakin\' Wire Hub...</h3><p>Here\'s a random GIF while you wait. Blame Giphy if it\'s ... bad.</p><p><img src="' + randomGif + '" id="waiting-gif" /></p><p><input name="readonly" value="' + randomGif + '" readonly /></p>';

        function modifyDialog() {
            jQuery('#auto-producer').keydown(function (event) {
                if (event.keyCode == 13) {
                    jQuery("#btnOne").trigger("click");
                    return false;
                }
            });
            jQuery("input[name=searchname]:checked").focus();
        }

        function APdialogText(options){
            var output = '<div class="ap-options"><p>Welcome to The Denver Post AUTO🤖SEARCHER™ for WIRE HUB. Here\'s what I can do for you:</p>';
            output += '<div class="one-half"><p><strong>Select a news source:</strong></p>';
            for(var object in options){
                if (options.hasOwnProperty(object)) {
                    var tabind = (options[object]['default']) ? ' tabindex="1"' : ' tabindex="-1"';
                    output += '<input type="radio" name="searchname" value="' + options[object]['search-term'] + '" ' + tabind + options[object]['default'] + '> ' + options[object]['title'] + '<br />';
                }
            }
            output += '</div>';
            output += '<div class="one-half"><p><strong>Select a date range:</strong></p>';
            output += '<input type="radio" name="searchlength" value="0" tabindex="-1" /> No date range<br />';
            output += '<input type="radio" name="searchlength" value="1" tabindex="2" checked /> 1 day<br />';
            output += '<input type="radio" name="searchlength" value="2" tabindex="-1" /> 2 days<br />';
            output += '<input type="radio" name="searchlength" value="7" tabindex="-1" /> 7 days<br />';
            output += '<input type="radio" name="searchlength" value="30" tabindex="-1" /> 30 days<br />';
            output += '</div>';
            output += '<div class="clear"></div>';
            output += '<p>Add a search term? <input type="text" id="APoptionSelect" tabindex="3"></p>';
            output += '<div class="ap-help"><a href="https://extras.denverpost.com/app/bookmarklet/ap-help.html" target="_blank">AUTO🤖PRODUCER™ Help</a></div></div>';
            return output;
        }

        function fillDates(days) {
            if (days !== 0) {
                var now = new Date();
                var backup = now - 1000 * 60 * 60 * 24 * days;
                var then = new Date(backup);
                document.getElementById('dfm_hub_start_mm').value = padNum(then.getMonth() + 1);
                document.getElementById('dfm_hub_start_dd').value = padNum(then.getDate());
                document.getElementById('dfm_hub_start_yyyy').value = then.getFullYear();
                document.getElementById('dfm_hub_end_mm').value = padNum(now.getMonth() + 1);
                document.getElementById('dfm_hub_end_dd').value = padNum(now.getDate() + 1);
                document.getElementById('dfm_hub_end_yyyy').value = now.getFullYear();
            }
        }

        function processAPform() {
            var searchLength = jQuery('input[name=searchlength]:checked').val();
            var selectFunction = jQuery('#APoptionSelect').val();
            var selectSearch = jQuery("input[name=searchname]:checked").val();
            var searchString = (selectFunction !== '') ? selectSearch + selectFunction : selectSearch;
            fillDates(searchLength);
            jQuery('#hub_search-search-input').val(searchString);
            jQuery('#auto-producer').html(APsuccessText);
            var imageLoad = setInterval(function(){
                if (jQuery('#waiting-gif').height() > 10) {
                    clearInterval(imageLoad);
                    jQuery('#search-submit').trigger("click");
                }
            },500);
        }

        jQuery('#auto-producer').html(APdialogText(options));
        jQuery('#auto-producer').dialog({
            autoOpen: false,
            buttons: [
                {
                    id: "btnCancel",
                    text: "Cancel",
                    click: function(){
                        jQuery(this).dialog('close');
                    },
                    tabindex: 5
                },
                {
                    id: "btnOne",
                    text: "AUTO🤖SEARCH™!",
                    click: function () {
                        processAPform();
                    },
                    tabindex: 4
                }
            ],
            title: 'Denver Post AUTO🤖SEARCHER™' + APversion,
            resize: 'auto',
            modal: true,
            minWidth: 900,
            position: { my: 'center', at: 'center', of: window, collision: "none" },
            create: function (event, ui) {
                jQuery(event.target).parent().css('position', 'fixed');
            },
            open: function(event, ui) { modifyDialog(); }
        });
        jQuery('#auto-producer').dialog('open');
    }

    function autoProducerSearch(randomGif) {
        var options = {
            '1': {
                'title': 'Associated Press',
                'search-term': 'associated press',
                'default': ' checked',
            }
        };
        var APsuccessText = '<div class="ap-success"><h3>Waiting for the freakin\' Article Search...</strong></h3><p>Here\'s a random GIF while you wait. Blame Giphy if it\'s ... bad.</p><p ><img src="' + randomGif + '" id="waiting-gif" /></p><p><input name="readonly" value="' + randomGif + '" readonly /></p>';

        function modifyDialog() {
            jQuery('#auto-producer').keydown(function (event) {
                if (event.keyCode == 13) {
                    jQuery("#btnOne").trigger("click");
                    return false;
                }
            });
            jQuery("input[name=searchlength]:checked").focus();
        }

        function APdialogText(options){
            var output = '<div class="ap-options"><p>Welcome to The Denver Post AUTO🤖SEARCHER™ for ARTICLES. Here\'s what I can do for you:</p>';
            /* output += '<div class="one-half"><p><strong>Select a news source:</strong></p>';
            for(var object in options){
                if (options.hasOwnProperty(object)) {
                    var tabind = (options[object]['default']) ? ' tabindex="1"' : ' tabindex="-1"';
                    output += '<input type="radio" name="searchname" value="' + options[object]['search-term'] + '" ' + tabind + options[object]['default'] + '> ' + options[object]['title'] + '<br />';
                }
            }
            output += '</div>'; */
            output += '<div class="one-half"><p><strong>Select a date range:</strong></p>';
            output += '<input type="radio" name="searchlength" value="0" tabindex="-1" /> No date range<br />';
            output += '<input type="radio" name="searchlength" value="1" tabindex="2" checked /> 1 day<br />';
            output += '<input type="radio" name="searchlength" value="2" tabindex="-1" /> 2 days<br />';
            output += '<input type="radio" name="searchlength" value="7" tabindex="-1" /> 7 days<br />';
            output += '<input type="radio" name="searchlength" value="30" tabindex="-1" /> 30 days<br />';
            output += '</div>';
            output += '<div class="clear"></div>';
            output += '<p>Add a search term? <input type="text" id="APoptionSelect" tabindex="3"></p>';
            output += '<div class="ap-help"><a href="https://extras.denverpost.com/app/bookmarklet/ap-help.html" target="_blank">AUTO🤖PRODUCER™ Help</a></div></div>';
            return output;
        }

        function fillDates(days) {
            var now = new Date();
            var backup = now - 1000 * 60 * 60 * 24 * days;
            var then = new Date(backup);
            jQuery('select[name="dfm_start_mm"]').val(padNum(then.getMonth() + 1));
            jQuery('select[name="dfm_start_dd"]').val(padNum(then.getDate()));
            jQuery('select[name="dfm_start_yyyy"]').val(then.getFullYear());
            jQuery('select[name="dfm_end_mm"]').val(padNum(now.getMonth() + 1));
            jQuery('select[name="dfm_end_dd"]').val(padNum(now.getDate()) + 1);
            jQuery('select[name="dfm_end_yyyy"]').val(now.getFullYear());
        }

        function processAPform() {
            var searchLength = jQuery('input[name=searchlength]:checked').val();
            var selectFunction = jQuery('#APoptionSelect').val();
            /* var selectSearch = jQuery("input[name=searchname]:checked").val(); 
            var searchString = (selectFunction != '') ? selectSearch + ' ' + selectFunction : selectSearch; */
            fillDates(searchLength);
            jQuery('#post-search-input').val(selectFunction);
            jQuery('#auto-producer').html(APsuccessText);
            var imageLoad = setInterval(function(){
                if (jQuery('#waiting-gif').height() > 10) {
                    clearInterval(imageLoad);
                    jQuery('#post-query-submit').trigger("click");
                }
            },500);
        }

        jQuery('#auto-producer').html(APdialogText(options));
        jQuery('#auto-producer').dialog({
            autoOpen: false,
            buttons: [
                {
                    id: "btnCancel",
                    text: "Cancel",
                    click: function(){
                        jQuery(this).dialog('close');
                    },
                    tabindex: 5
                },
                {
                    id: "btnOne",
                    text: "AUTO🤖SEARCH™!",
                    click: function () {
                        processAPform();
                    },
                    tabindex: 4
                }
            ],
            title: 'Denver Post AUTO🤖SEARCHER™' + APversion,
            resize: 'auto',
            modal: true,
            minWidth: 900,
            position: { my: 'center', at: 'center', of: window, collision: "none" },
            create: function (event, ui) {
                jQuery(event.target).parent().css('position', 'fixed');
            },
            open: function(event, ui) { modifyDialog(); }
        });
        jQuery('#auto-producer').dialog('open');
    }

    function autoProducerPick(randomGif) {
        if (loc.indexOf('edit.php') >-1) {
            autoProducerSearch(randomGif);
        } else if (loc.indexOf('content_hub_view') >-1) {
            autoProducerContentHub(randomGif);
        } else if (loc.indexOf('wire_hub_view') >-1) {
            autoProducerWireHub(randomGif);
        } else {
            autoProducerPost(randomGif);
        }
    }

    var loc = window.location.href;
    var allTags = [];
    if (document.body.classList.contains('modal-open') || loc.indexOf('upload.php') > -1) {
        var bookmarkletSource = document.createElement('script');
        bookmarkletSource.setAttribute('src', 'https://extras.denverpost.com/app/bookmarklet/js/photo-cleanup.min.js?v='+vSec());
        document.body.appendChild(bookmarkletSource);
    } else {
        if (!document.body.contains(document.getElementById('auto-producer'))) {
            var APstyle = window.document.createElement('link');
            APstyle.setAttribute('rel','stylesheet');
            APstyle.setAttribute('href','https://extras.denverpost.com/app/bookmarklet/auto-producer.min.css?v='+vSec());
            window.document.body.appendChild(APstyle);
            var s2 = window.document.createElement('script');
            s2.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js');
            window.document.body.appendChild(s2);
            var tagJS = window.document.createElement('script');
            tagJS.setAttribute('src','https://extras.denverpost.com/app/bookmarklet/autoproducer/ap-taglist.js?v='+vSec());
            window.document.body.appendChild(tagJS);
            var optionsJS = window.document.createElement('script');
            optionsJS.setAttribute('src','https://extras.denverpost.com/app/bookmarklet/js/ap-options.min.js?v='+vSec());
            window.document.body.appendChild(optionsJS);
            var APdiv = window.document.createElement('div');
            APdiv.setAttribute('id','auto-producer');
            window.document.body.appendChild(APdiv);
        }

        var tagJSint = setInterval(function() {
            if (typeof autoProducerTagList == 'undefined') {
                clearInterval(tagJSint);
            }
        }, 20);

        var optionsJSint = setInterval(function() {
            if (typeof autoProducerOptions == 'undefined') {
                clearInterval(optionsJSint);
            }
        }, 20);

        var UILoaded = setInterval(function() {
            if (typeof jQuery.ui.dialog != 'undefined') {
                clearInterval(UILoaded);
                var randomGifin = '';
                jQuery.ajax({
                    url:'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC',
                    type: 'GET',
                    success: function(response) {
                        randomGifin = response.data.image_url;
                        randomGifin = randomGifin.replace('http:','https:');
                    }
                });
                var gifInt = setInterval(function() {
                    if (typeof randomGifin != 'undefined' && randomGifin.indexOf('giphy.gif') > -1) {
                        clearInterval(gifInt);
                        autoProducerPick(randomGifin);
                    }
                }, 10);
            }
        }, 50);
    }
}());