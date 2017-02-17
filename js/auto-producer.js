javascript:
(function() {
    var APversion = ' v0.8.1';
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

    serialize = function(obj, prefix) {
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
    };

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
            var newTitle = prompt('What should we call this option?\n\n','');
            var newRelated = confirm('Should Related by Primary Tag be added to stories automatically?');
            optionObject['title'] = newTitle;
            optionObject['check-sections'] = captureSections();
            optionObject['add-tags'] = captureTags();
            optionObject['primary-section'] = document.getElementById(sectionSelect).value;
            optionObject['primary-tag'] = document.getElementById(tagSelect).value;
            optionObject['apple-news'] = captureAppleNews();
            optionObject['related'] = newRelated;
            var tagString = '#'+tagSelect+' option[value="'+optionObject['primary-tag']+'"]';                        
            optionObject['help-primary-tag'] = jQuery(tagString).text();
            optionObject['help-sections'] = captureSectionsHelp();
            var secString = '#'+sectionSelect+' option[value="'+optionObject['primary-section']+'"]';
            optionObject['help-primary-section'] = jQuery(secString).text();
            var i = document.createElement("img");
            i.style.cssText = 'display:none;';
            i.src = 'http://www.denverpostplus.com/app/autoproducer/ap-new.php?'+serialize(optionObject);
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
            if ( (typeof sectionPrimary != 'undefined' && sectionPrimary != '') && document.getElementById(sectionSelect).value == '' )  {
                document.getElementById(sectionSelect).value = sectionPrimary;
            }
            if ( (typeof tagPrimary != 'undefined' && tagPrimary != '') && document.getElementById(tagSelect).value == '' ) {
                document.getElementById(tagSelect).value = tagPrimary;
            }
        }

        function addTag(newTags){
            for(var i=0,len=newTags.length;i<len;i++){
                document.getElementById('new-tag-post_tag').value = newTags[i];
                var button = jQuery('#post_tag .ajaxtag input.button.tagadd').click();
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

        function trumpThatBitch(options,args) {
            if (typeof args['WaPoauthorSelect'] != 'undefined' && args['WaPoauthorSelect'] == true) {
                addWaPoauthor();
            }
            if (typeof args['APauthorSelect'] != 'undefined' && args['APauthorSelect'] == true) {
                addAPauthor();
            }
            if ((typeof options['related'] != 'undefined' && options['related'] == true) || args['selectRelated'] == true) {
                relatedPrimaryTag();
            }
            if (options['title'] == 'Weather Story') {
                weatherWidget();
            }
            if (options['title'] == 'Crime Story' && !args['homicideSelect']) {
                insertCrime();
            }
            if (args['informSelect']) {
                insertInform();
            }
            if (args['promoSelect']) {
                insertPromos();
            }
            if (typeof options['check-sections'] != 'undefined') {
                checkSections(options['check-sections']);
            }
            if (typeof options['add-tags'] != 'undefined') {
                addTag(options['add-tags']);
            }
            if (typeof options['primary-section'] != 'undefined' || typeof options['primary-tag'] != 'undefined') {
                primaryOptions(options['primary-section'],options['primary-tag']);
            }
            if (typeof options['apple-news'] != 'undefined') {
                checkAppleNewsBoxes(options['apple-news']);
            }
        }

        function relatedPrimaryTag() {
            var dt = new Date();
            var secs = dt.getSeconds() + (60 * dt.getMinutes());
            var bookmarkletSource = document.createElement('script');
            bookmarkletSource.setAttribute('src', 'https://extras.denverpost.com/app/bookmarklet/js/related-tag.min.js?v='+secs);
            document.body.appendChild(bookmarkletSource);
        }

        function weatherWidget() {
            var dt = new Date();
            var secs = dt.getSeconds() + (60 * dt.getMinutes());
            var bookmarkletSource = document.createElement('script');
            bookmarkletSource.setAttribute('src', 'https://extras.denverpost.com/app/bookmarklet/js/weather.js?v='+secs);
            document.body.appendChild(bookmarkletSource);
        }

        function insertInform() {
            var dt = new Date();
            var secs = dt.getSeconds() + (60 * dt.getMinutes());
            var bookmarkletSource = document.createElement('script');
            bookmarkletSource.setAttribute('src', 'https://extras.denverpost.com/app/bookmarklet/js/vid_embed-src.js?v='+secs);
            document.body.appendChild(bookmarkletSource);
        }

        function insertCX() {
            var dt = new Date();
            var secs = dt.getSeconds() + (60 * dt.getMinutes());
            var bookmarkletSource = document.createElement('script');
            bookmarkletSource.setAttribute('src', 'https://extras.denverpost.com/app/bookmarklet/js/cx-src.js?v='+secs);
            document.body.appendChild(bookmarkletSource);
        }

        function insertCrime() {
            var dt = new Date();
            var secs = dt.getSeconds() + (60 * dt.getMinutes());
            var bookmarkletSource = document.createElement('script');
            bookmarkletSource.setAttribute('src', 'https://extras.denverpost.com/app/bookmarklet/js/crime.js?v='+secs);
            document.body.appendChild(bookmarkletSource);
        }

        function insertHomicides() {
            var dt = new Date();
            var secs = dt.getSeconds() + (60 * dt.getMinutes());
            var bookmarkletSource = document.createElement('script');
            bookmarkletSource.setAttribute('src', 'https://extras.denverpost.com/app/bookmarklet/js/homicidereport.js?v='+secs);
            document.body.appendChild(bookmarkletSource);
        }

        function insertClosures() {
            var dt = new Date();
            var secs = dt.getSeconds() + (60 * dt.getMinutes());
            var bookmarkletSource = document.createElement('script');
            bookmarkletSource.setAttribute('src', 'https://extras.denverpost.com/app/bookmarklet/js/weather-closures.js?v='+secs);
            document.body.appendChild(bookmarkletSource);
        }

        function insertPromos() {
            var dt = new Date();
            var secs = dt.getSeconds() + (60 * dt.getMinutes());
            var bookmarkletSource = document.createElement('script');
            bookmarkletSource.setAttribute('src', 'https://extras.denverpost.com/app/bookmarklet/js/inarticlepromo-src.js?v='+secs);
            document.body.appendChild(bookmarkletSource);
        }

        var APsuccessText = '<h3 style="text-align:center;"><strong style="color:#067a51;">I can do that!</strong></h3><p style="text-align:center">Here\'s a random GIF while you wait...blame Giphy if it\'s ... bad.</p><p style="text-align:center;"><img src="' + randomGif + '" style="margin:1em auto;width:60%;" /></p><p style="text-align:center;"><input name="readonly" value="' + randomGif + '" readonly style="width:60%;background:#efefef;border:1px solid #d5d5d5;text-align:center;" /></p>';
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
        var options = {
            '0': {
                'title': 'Do Nothing',
                'add-tags': [],
                'help-sections': 'Does not add sections or tags!',
                'related' : false,
            },
            '1': {
                'title': 'Trump Story',
                'check-sections': ['48','11580','75','81','39','59'],
                'add-tags': ['Donald Trump'],
                'primary-section': '11580',
                'primary-tag': '1276',
                'apple-news': ['politics'],
                'related' : true,
                'help-primary-tag': 'Donald Trump',
                'help-sections': 'Latest News, News, Nation and World News, Politics, National Politics, Trump Administration',
                'help-primary-section': 'Trump Administration',
            },
            '10': {
                'title': 'Nation / World Story',
                'check-sections': ['48','39','59'],
                'add-tags': [],
                'primary-section': '59',
                'primary-tag': '',
                'apple-news': [],
                'related' : false,
                'help-primary-tag': '',
                'help-sections': 'Latest News, News, Nation and World News',
                'help-primary-section': 'Nation and World News',
            },
            '20': {
                'title': 'Colorado News',
                'check-sections': ['48','39','47'],
                'add-tags': [],
                'primary-section': '47',
                'primary-tag': '',
                'apple-news': ['colorado-news'],
                'related' : true,
                'help-primary-tag': '',
                'help-sections': 'Latest News, News, Colorado News,',
                'help-primary-section': 'Colorado News',
            },
            '21': {
                'title': 'Colorado Wildfires',
                'check-sections': ['48','39','47','65'],
                'add-tags': ['wildfires','Colorado wildfires 2017'],
                'primary-section': '65',
                'primary-tag': '11673',
                'apple-news': ['colorado-news'],
                'related' : true,
                'help-primary-tag': 'Colorado wildfires 2017',
                'help-sections': 'Latest News, News, Colorado News, Colorado Wildfires',
                'help-primary-section': 'Colorado Wildfires',
            },
            '22': {
                'title': 'Crime Story',
                'check-sections': ['48','40','47','39'],
                'add-tags': [],
                'primary-section': '40',
                'primary-tag': '',
                'apple-news': ['colorado-news'],
                'related' : false,
                'help-primary-tag': '',
                'help-sections': 'Latest News, News, Colorado News, Crime &amp; Courts',
                'help-primary-section': 'Crime &amp; Courts',
            },
            '23': {
                'title': 'Weather Story',
                'check-sections': ['48','64','47','39'],
                'add-tags': [],
                'primary-section': '64',
                'primary-tag': '',
                'apple-news': ['colorado-news'],
                'related' : true,
                'help-primary-tag': '',
                'help-sections': 'Latest News, News, Colorado News, Weather',
                'help-primary-section': 'Weather',
            },
            '31': {
                'title': 'Colorado Legislature',
                'check-sections': ['48','39','47','79','80','75'],
                'add-tags': [],
                'primary-section': '79',
                'primary-tag': '',
                'apple-news': ['politics'],
                'related' : false,
                'help-primary-tag': '',
                'help-sections': 'Latest News, News, Colorado News, Politics, Local Politics, Colorado Legislature',
                'help-primary-section': 'Colorado Legislature',
            },
            '40': {
                'title': 'Business Story',
                'check-sections': ['48','15'],
                'add-tags': ['More Business News'],
                'primary-section': '15',
                'primary-tag': '7864',
                'apple-news': ['business'],
                'related' : false,
                'help-primary-tag': 'More Business News',
                'help-sections': 'Latest News, Business',
                'help-primary-section': 'Business',
            },
            '41': {
                'title': 'Technology Story',
                'check-sections': ['48','15','27'],
                'add-tags': ['More Business News'],
                'primary-section': '27',
                'primary-tag': '7864',
                'apple-news': ['business'],
                'related' : false,
                'help-primary-tag': 'More Business News',
                'help-sections': 'Latest News, Business, Technology',
                'help-primary-section': 'Technology',
            },
            '51': {
                'title': 'Ask Amy',
                'check-sections': ['48','85','83','84','6710','9101'],
                'add-tags': ['advice','Ask Amy','relationship advice'],
                'primary-section': '85',
                'primary-tag': '7819',
                'apple-news': ['lifestyle'],
                'related' : true,
                'help-primary-tag': 'Ask Amy, advice, relationship advice',
                'help-sections': 'Latest News, Ask Amy, Lifestyle, Entertainment / Lifestyle, Family, Lifestyle Columnists',
                'help-primary-section': 'Ask Amy',
            },
            '52': {
                'title': 'Movie Review',
                'check-sections': ['48','33','30','9101'],
                'add-tags': ['movie reviews'],
                'primary-section': '33',
                'primary-tag': '4289',
                'apple-news': ['entertainment'],
                'related' : false,
                'help-primary-tag': 'movie reviews',
                'help-sections': 'Latest News, Movies, Entertainment, Entertainment / Lifestyle',
                'help-primary-section': 'Movies',
            },
            '53': {
                'title': 'Restaurants &amp; Dining',
                'check-sections': ['48','83','90','9101'],
                'add-tags': [],
                'primary-section': '90',
                'primary-tag': '',
                'apple-news': ['entertainment'],
                'related' : true,
                'help-primary-tag': '',
                'help-sections': 'Latest News, Lifestyle, Restaurants &amp; Dining, Entertainment / Lifestyle',
                'help-primary-section': 'Restaurants &amp; Dining',
            },
            '54': {
                'title': 'Travel Story',
                'check-sections': ['48','93'],
                'add-tags': [],
                'primary-section': '93',
                'primary-tag': '',
                'apple-news': ['entertainment','lifestyle'],
                'related' : false,
                'help-primary-tag': '',
                'help-sections': 'Latest News, Travel',
                'help-primary-section': 'Travel',
            },
            '55': {
                'title': 'Book Review',
                'check-sections': ['30','32','48'],
                'add-tags': ['book reviews'],
                'primary-section': '32',
                'primary-tag': '6989',
                'apple-news': ['entertainment'],
                'related': true,
                'help-primary-tag': 'book reviews',
                'help-sections': 'Entertainment, Books, Latest News',
                'help-primary-section': 'Books',
            },
            '61': {
                'title': 'YourHub Crime Blotter',
                'check-sections': ['48','2222','40'],
                'add-tags': ['crime blotter'],
                'primary-section': '2222',
                'primary-tag': '4241',
                'apple-news': ['colorado-news'],
                'related' : true,
                'help-primary-tag': 'crime blotter',
                'help-sections': 'Latest News, YourHub, Crime &amp; Courts',
                'help-primary-section': 'YourHub',
            },
            '62': {
                'title': 'YourHub Biz Profile',
                'check-sections': ['48','2222','15'],
                'add-tags': ['YourHub business profile'],
                'primary-section': '2222',
                'primary-tag': '4280',
                'apple-news': ['colorado-news'],
                'related' : true,
                'help-primary-tag': 'YourHub business profile',
                'help-sections': 'Latest News, YourHub, Business',
                'help-primary-section': 'YourHub',
            }
        };

        var optsLength = Object.keys(options).length;

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
            var output = '<p style="margin-bottom:0;">Welcome to The Denver Post AUTO🤖PRODUCER™ for Articles. Here\'s a list of helper functions I can perform for you:</p>';
            output += '<div style="width:33%;float:left;display:inline-block;">';
            output += '<ul>';
            var i = 0;
            var nobreak = true;
            for(var object in options){
                var relStar = (options[object]['related']) ? ' <span style="color:darkred;font-weight:bold;">*</span>' : ' ';
                var tooltipString = '<p>Sets <strong>Primary Section</strong> to:<br />' + options[object]['help-primary-section'] + '</p>';
                tooltipString += '<p>Sets <strong>Primary Tag</strong> to:<br />' + options[object]['help-primary-tag'] + '</p>';
                tooltipString += '<p>Selects these <strong>Sections</strong>:<br />' + options[object]['help-sections'] + '</p>';
                tooltipString += '<p>Adds these <strong>Tags</strong>:<br />' + options[object]['add-tags'].join(', ') + '</p>';
                tooltipString += '<p>Adds <strong>Apple News</strong> sections:<br />' + options[object]['apple-news'] + '</p>';
                if (options.hasOwnProperty(object)) {
                    output += '<li>( ' + pad(object) + ' ) ' + options[object]['title'] + relStar + ' <a class="tooltip-link" data-tooltip="' + HTMLescape(tooltipString) + '" href="#" tabindex="0">(?)</a></li>';
                }
                if (i > (optsLength / 2) && i > 10 && nobreak == true) {
                    output += '</ul></div><div style="width:33%;float:left;display:inline-block;"><ul>';
                    nobreak = false;
                }
                i++;
            }
            output += '</ul>';
            output += '</div>';
            output += '<div style="width:33%;float:left;display:inline-block;">';
            output += '<div class="tipGraf" style="display:none;"></div>';
            output += '</div>';
            output += '<div style="width:100%;height:0;display:block;clear:both;"></div>';
            output += '<div style="width:33%;float:left;display:inline-block;">';
            output += '<p>Enter selection: <input type="text" id="APoptionSelect" tabindex="1"></p>';
            output += '</div>';
            output += '<div style="width:33%;float:left;display:inline-block;">';
            output += '<p>Insert Related by Primary Tag?<span style="color:darkred;font-weight:bold;">*</span> <input type="checkbox" id="relatedSelect" tabindex="2" /><br />';
            output += 'Change author to AP?<span style="color:darkblue;font-weight:bold;">*</span> <input type="checkbox" id="APauthorSelect" tabindex="3" /><br />';
            output += 'Change author to WaPo?<span style="color:darkblue;font-weight:bold;">*</span> <input type="checkbox" id="WaPoauthorSelect" tabindex="4" /></p>';
            output += '</div>';
            output += '<div style="width:33%;float:left;display:inline-block;">';
            output += '<p>Insert in-article Promos? <input type="checkbox" id="promoSelect" tabindex="2" /><br />';
            output += 'Insert Inform video? <input type="checkbox" id="informSelect" tabindex="3" /><br />';
            output += 'Insert Homicide Report?<span style="color:magenta;font-weight:bold;">*</span> <input type="checkbox" id="homicideSelect" tabindex="4" /></p>';
            output += '</div>';
            output += '<div style="width:100%;height:0;display:block;clear:both;"></div>';
            output += '<p style="font-size:85%;color:darkred;margin-bottom:0;">Items with a star insert Related by Primary Tag automatically.<br />Related items will only be inserted on articles with 6 or more paragraphs.</p>';
            output += '<p style="font-size:85%;color:darkblue;margin-bottom:0;">AP will override WaPo if both are checked; you WILL NOT see the new author until you save.</p>';
            output += '<p style="font-size:85%;color:magenta;margin-bottom:0;">Overrides the Crime Map if inserting with the "Crime Story" option.</p>';
            output += '<div style="text-align:right;font-size:85%;margin-bottom:0;"><a href="https://extras.denverpost.com/app/bookmarklet/ap-help.html" target="_blank">AUTO🤖PRODUCER™ Help</a></div>';
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
            args['homicideSelect'] = jQuery('#homicideSelect').prop('checked') ? true : false;
            if (validOptions.indexOf(selectFunction) != -1) {
                jQuery('#auto-producer').html(APsuccessText);
                trumpThatBitch(options[selectFunction],args);
                setTimeout(function(){ jQuery('#auto-producer').dialog('close'); },1250);
            } else {
                var again = confirm('That\'s not a valid option. Try again, or Cancel to quit.');
                if (again == false) {
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
                    id: "btnHomicides",
                    text: "+Homicides",
                    click: function () {
                        insertHomicides();
                    },
                    tabindex: 15
                },
                {
                    id: "btnCrime",
                    text: "+Crime Map",
                    click: function () {
                        insertCrime();
                    },
                    tabindex: 15
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
                    id: "btnInform",
                    text: "+Inform",
                    click: function () {
                        insertInform();
                    },
                    tabindex: 13
                },
                {
                    id: "btnPromos",
                    text: "+Promos",
                    click: function () {
                        insertPromos();
                    },
                    tabindex: 12
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
            minWidth: 900,
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

        var APsuccessText = '<h3 style="text-align:center;"><strong style="color:#067a51;">Waiting for freakin\' Content Hub...</strong></h3><p style="text-align:center">Here\'s a random GIF while you wait...blame Giphy if it\'s ... bad.</p><p style="text-align:center;"><img src="' + randomGif + '" style="margin:1em auto;width:60%;" id="waiting-gif" /></p><p style="text-align:center;"><input name="readonly" value="' + randomGif + '" readonly style="width:60%;background:#efefef;border:1px solid #d5d5d5;text-align:center;" /></p>';

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
            var output = '<p>Welcome to The Denver Post AUTO🤖SEARCHER™ for CONTENT HUB. Here\'s what I can do for you:</p>';
            output += '<p>';
            for(var object in options){
                if (options.hasOwnProperty(object)) {
                    var tabind = (options[object]['default']) ? ' tabindex="1"' : ' tabindex="-1"';
                    output += '<input type="radio" name="searchname" value="' + options[object]['search-term'] + '" ' + tabind + options[object]['default'] + '> ' + options[object]['title'] + '<br />';
                }
            }
            output += '</p>';
            output += '<div style="width:100%;height:0;display:block;clear:both;"></div>';
            output += '<p>Add a search term? <input type="text" id="APoptionSelect" tabindex="2"></p>';
            output += '<div style="text-align:right;font-size:85%;margin-bottom:0;"><a href="https://extras.denverpost.com/app/bookmarklet/ap-help.html" target="_blank">AUTO🤖PRODUCER™ Help</a></div>';
            return output;
        }

        function processAPform() {
            var selectFunction = jQuery('#APoptionSelect').val();
            var selectSearch = jQuery("input[name=searchname]:checked").val();
            var searchString = (selectFunction != '') ? selectSearch + ' ' + selectFunction : selectSearch;
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
            '1': {
                'title': 'Associated Press',
                'search-term': 'associated press',
                'default': ' checked',
            },
            '2': {
                'title': 'Washington Post',
                'search-term': 'washington post',
                'default': false,
            },
            '3': {
                'title': 'Bloomberg (experimental)',
                'search-term': 'bloomberg',
                'default': false,
            }
        };
        var APsuccessText = '<h3 style="text-align:center;"><strong style="color:#067a51;">Waiting for freakin\' Wire Hub...</strong></h3><p style="text-align:center">Here\'s a random GIF while you wait...blame Giphy if it\'s ... bad.</p><p style="text-align:center;"><img src="' + randomGif + '" style="margin:1em auto;width:60%;" id="waiting-gif" /></p><p style="text-align:center;"><input name="readonly" value="' + randomGif + '" readonly style="width:60%;background:#efefef;border:1px solid #d5d5d5;text-align:center;" /></p>';

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
            var output = '<p>Welcome to The Denver Post AUTO🤖SEARCHER™ for WIRE HUB. Here\'s what I can do for you:</p>';
            output += '<div style="width:50%;float:left;display:inline-block;"><p><strong>Select a news source:</strong></p>';
            for(var object in options){
                if (options.hasOwnProperty(object)) {
                    var tabind = (options[object]['default']) ? ' tabindex="1"' : ' tabindex="-1"';
                    output += '<input type="radio" name="searchname" value="' + options[object]['search-term'] + '" ' + tabind + options[object]['default'] + '> ' + options[object]['title'] + '<br />';
                }
            }
            output += '</div>';
            output += '<div style="width:50%;float:left;display:inline-block;"><p><strong>Select a date range:</strong></p>';
            output += '<input type="radio" name="searchlength" value="1" tabindex="2" checked /> 1 day<br />';
            output += '<input type="radio" name="searchlength" value="2" tabindex="-1" /> 2 days<br />';
            output += '<input type="radio" name="searchlength" value="7" tabindex="-1" /> 7 days<br />';
            output += '</div>';
            output += '<div style="width:100%;height:0;display:block;clear:both;"></div>';
            output += '<p>Add a search term? <input type="text" id="APoptionSelect" tabindex="3"></p>';
            output += '<div style="text-align:right;font-size:85%;margin-bottom:0;"><a href="https://extras.denverpost.com/app/bookmarklet/ap-help.html" target="_blank">AUTO🤖PRODUCER™ Help</a></div>';
            return output;
        }

        function fillDates(days) {
            var now = new Date();
            var backup = now - 1000 * 60 * 60 * 24 * days;
            var then = new Date(backup);
            document.getElementById('dfm_hub_start_mm').value = padNum(then.getMonth() + 1);
            document.getElementById('dfm_hub_start_dd').value = padNum(then.getDate());
            document.getElementById('dfm_hub_start_yyyy').value = then.getFullYear();
            document.getElementById('dfm_hub_end_mm').value = padNum(now.getMonth() + 1);
            document.getElementById('dfm_hub_end_dd').value = padNum(now.getDate());
            document.getElementById('dfm_hub_end_yyyy').value = now.getFullYear();
        }

        function processAPform() {
            var searchLength = jQuery('input[name=searchlength]:checked').val();
            var selectFunction = jQuery('#APoptionSelect').val();
            var selectSearch = jQuery("input[name=searchname]:checked").val();
            var searchString = (selectFunction != '') ? selectSearch + ' ' + selectFunction : selectSearch;
            fillDates(searchLength);
            jQuery('#hub_search-search-input').val(searchString);
            jQuery('#auto-producer').html(APsuccessText);
            var imageLoad = setInterval(function(){
                console.log(jQuery('#waiting-gif').height());
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
        var APsuccessText = '<h3 style="text-align:center;"><strong style="color:#067a51;">Waiting for the freakin\' Article Search...</strong></h3><p style="text-align:center">Here\'s a random GIF while you wait...blame Giphy if it\'s ... bad.</p><p style="text-align:center;"><img src="' + randomGif + '" style="margin:1em auto;width:60%;" id="waiting-gif" /></p><p style="text-align:center;"><input name="readonly" value="' + randomGif + '" readonly style="width:60%;background:#efefef;border:1px solid #d5d5d5;text-align:center;" /></p>';

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
            var output = '<p>Welcome to The Denver Post AUTO🤖SEARCHER™ for ARTICLES. Here\'s what I can do for you:</p>';
            /* output += '<div style="width:50%;float:left;display:inline-block;"><p><strong>Select a news source:</strong></p>';
            for(var object in options){
                if (options.hasOwnProperty(object)) {
                    var tabind = (options[object]['default']) ? ' tabindex="1"' : ' tabindex="-1"';
                    output += '<input type="radio" name="searchname" value="' + options[object]['search-term'] + '" ' + tabind + options[object]['default'] + '> ' + options[object]['title'] + '<br />';
                }
            }
            output += '</div>'; */
            output += '<div style="width:50%;float:left;display:inline-block;"><p><strong>Select a date range:</strong></p>';
            output += '<input type="radio" name="searchlength" value="1" tabindex="2" checked /> 1 day<br />';
            output += '<input type="radio" name="searchlength" value="2" tabindex="-1" /> 2 days<br />';
            output += '<input type="radio" name="searchlength" value="7" tabindex="-1" /> 7 days<br />';
            output += '</div>';
            output += '<div style="width:100%;height:0;display:block;clear:both;"></div>';
            output += '<p>Add a search term? <input type="text" id="APoptionSelect" tabindex="3"></p>';
            output += '<div style="text-align:right;font-size:85%;margin-bottom:0;"><a href="https://extras.denverpost.com/app/bookmarklet/ap-help.html" target="_blank">AUTO🤖PRODUCER™ Help</a></div>';
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
            jQuery('select[name="dfm_end_dd"]').val(padNum(now.getDate()));
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
                console.log(jQuery('#waiting-gif').height());
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
        var loc = window.location.href;
        if (loc.indexOf('post.php') > -1) {
            autoProducerPost(randomGif);
        } else if (loc.indexOf('edit.php') >-1) {
            autoProducerSearch(randomGif);
        } else if (loc.indexOf('content_hub_view') >-1) {
            autoProducerContentHub(randomGif);
        } else if (loc.indexOf('wire_hub_view') >-1) {
            autoProducerWireHub(randomGif);
        }
    }

    if (!document.body.contains(document.getElementById('auto-producer'))) {
        var s2 = window.document.createElement('script');
        s2.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js');
        window.document.body.appendChild(s2);
        var APdiv = window.document.createElement('div');
        APdiv.setAttribute('id','auto-producer');
        window.document.body.appendChild(APdiv);
        var APstyle = window.document.createElement('link');
        APstyle.setAttribute('type','text/css');
        APstyle.setAttribute('rel','https://extras.denverpost.com/app/bookmarklet/auto-producer.css');
        window.document.body.appendChild(APstyle);
    }

    var UILoaded = setInterval(function() {
        if (typeof jQuery.ui.dialog != 'undefined') {
            clearInterval(UILoaded);
            var randomGifin = '';
            var randomGiphy = jQuery.ajax({
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
}());