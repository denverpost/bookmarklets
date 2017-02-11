javascript:(function() {

    function checkSections(tags){
        for(var i=0,len=tags.length;i<len;i++){
            document.getElementById('in-category-'+tags[i]).checked = true;
        }
    }

    function checkAppleNewsBoxes(boxes){
        for(var i=0,len=boxes.length;i<len;i++){
            document.getElementById(appleNewsSections[boxes[i]]).checked = true;
        }
    }

    function primaryOptions(sectionPrimary,tagPrimary){
        var sectionSelect = 'fm-mason_post_settings-0-schema-0-primary_section-0';
        var tagSelect = 'fm-mason_post_settings-0-schema-0-primary_tag-0';
        if (typeof sectionPrimary != 'undefined') {
            document.getElementById(sectionSelect).value = sectionPrimary;
        }
        if (typeof tagPrimary != 'undefined') {
            document.getElementById(tagSelect).value = tagPrimary;
        }
    }

    function addTag(newTags){
        for(var i=0,len=newTags.length;i<len;i++){
            document.getElementById('new-tag-post_tag').value = newTags[i];
            var button = jQuery('#post_tag .ajaxtag input.button.tagadd').click();
        }
    }

    function trumpThatBitch(options) {
        if (typeof options['check-sections'] != 'undefined'){
            checkSections(options['check-sections']);
        }
        if (typeof options['add-tags'] != 'undefined') {
            addTag(options['add-tags']);
        }
        if (typeof options['primary-section'] != 'undefined' || typeof options['primary-tag'] != 'undefined') {
            primaryOptions(options['primary-section'],options['primary-tag'])
        }
        if (typeof options['apple-news'] != 'undefined') {
            checkAppleNewsBoxes(options['apple-news']);
        }
    }

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
        '1': {
            'title': 'Trump Story',
            'check-sections': ['48','11580','75','81','39','59'],
            'add-tags': ['Donald Trump'],
            'primary-section': '11580',
            'primary-tag': '1276',
            'apple-news': ['politics'],
        },
        '2': {
            'title': 'Crime Story',
            'check-sections': ['48','40','47','39'],
            'add-tags': [],
            'primary-section': '40',
            'primary-tag': '',
            'apple-news': ['colorado-news'],
        },
        '3': {
            'title': 'Weather Story',
            'check-sections': ['48','64','47','39'],
            'add-tags': [],
            'primary-section': '64',
            'primary-tag': '',
            'apple-news': ['colorado-news'],
        },
        '4': {
            'title': 'Business Story',
            'check-sections': ['48','15'],
            'add-tags': ['More Business News'],
            'primary-section': '15',
            'primary-tag': '7864',
            'apple-news': ['business'],
        },
        '5': {
            'title': 'Technology Story',
            'check-sections': ['48','15','27'],
            'add-tags': ['More Business News'],
            'primary-section': '27',
            'primary-tag': '7864',
            'apple-news': ['business'],
        },
        '6': {
            'title': 'Ask Amy',
            'check-sections': ['48','85','83','84','6710','9101'],
            'add-tags': ['advice','Ask Amy','relationship advice'],
            'primary-section': '85',
            'primary-tag': '7819',
            'apple-news': ['lifestyle'],
        },
        '7': {
            'title': 'Movie Review',
            'check-sections': ['48','33','30','9101'],
            'add-tags': ['movie reviews'],
            'primary-section': '33',
            'primary-tag': '4289',
            'apple-news': ['entertainment'],
        },
        '8': {
            'title': 'Travel Story',
            'check-sections': ['48','93'],
            'add-tags': [],
            'primary-section': '93',
            'primary-tag': '',
            'apple-news': ['entertainment','lifestyle'],
        },
        '9': {
            'title': 'Nation / World Story',
            'check-sections': ['48','39','59'],
            'add-tags': [],
            'primary-section': '59',
            'primary-tag': '',
            'apple-news': [],
        },
        '10': {
            'title': 'Colorado Legislature',
            'check-sections': ['48','39','47','79','80','75'],
            'add-tags': [],
            'primary-section': '79',
            'primary-tag': '',
            'apple-news': ['politics'],
        },
    }

    var validOptions = ['?'];
    for(var object in options){
        if (options.hasOwnProperty(object)) {
            validOptions.push(object);
        }
    }

    var APsuccessText = '<h3 style="text-align:center;"><strong style="color:#067a51;">I can do that!</strong></h3>\n\
     <p style="text-align:center;"><img src="https://extras.denverpost.com/oil-gas-deaths/img/loading.gif" style="margin:1em auto;width:15%;" /></p>';

    function APdialogText(options){
        var output = '<p>Welcome to The Denver Post AUTO-PRODUCER™. Here\'s a list of helper functions I can perform for you:</p>';
        output += '<ul>';
        for(var object in options){
            if (options.hasOwnProperty(object)) {
                output += '<li>( ' + object + ' ) ' + options[object]['title'] + '</li>';
            }
        }
        output += '</ul>';
        output += '<p>Enter selection (or "?" for help): <input type="text" id="APoptionSelect"></p>';
        return output;
    }

    function modifyDialog() {
        jQuery(".ui-dialog-titlebar-close").hide();
        jQuery(".ui-dialog").css('z-index','99999999');
        jQuery('#auto-producer').keydown(function (event) {
            if (event.keyCode == 13) {
                jQuery("#btnOne").trigger("click");
                return false;
            }
        });
        jQuery("#APoptionSelect").get(0).focus();
    }

    function processAPform() {
        var selectFunction = jQuery('#APoptionSelect').val();
        if (validOptions.indexOf(selectFunction) != -1) {
            jQuery('#auto-producer').html(APsuccessText);
            trumpThatBitch(options[selectFunction]);
            setTimeout(function(){ jQuery('#auto-producer').dialog('close'); },1600);
        } else {
            var again = confirm('That\'s not a valid option. Try again, or Cancel to quit.');
            if (again == false) {
                jQuery('#auto-producer').dialog('close');
            } else {
                return false;
            }
        }
    }

    function loadAPDialog() {
        jQuery('#auto-producer').html(APdialogText(options));
        jQuery('#auto-producer').dialog({
            autoOpen: false,
            buttons: [  
                {
                    id: "btnCancel",
                    text: "Cancel",
                    click: function(){
                        jQuery(this).dialog('close');
                    }
                },
                {
                    id: "btnOne",
                    text: "AUTO-PRODUCE™!",
                    click: function () {
                        processAPform();
                    }
                }
            ],
            title: 'Denver Post AUTO-PRODUCER™',
            resize: 'auto',
            modal: true,
            minWidth: 450,
            open: function(event, ui) { modifyDialog(); }
        });
        jQuery('#auto-producer').dialog('open');
    }

    if (!document.body.contains(document.getElementById('auto-producer'))) {
        var s2 = window.document.createElement('script');
        s2.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js');
        window.document.body.appendChild(s2);
        var APdiv = window.document.createElement('div');
        APdiv.setAttribute('id','auto-producer');
        window.document.body.appendChild(APdiv);
    }

    var UILoaded = setInterval(function() {
        if (typeof jQuery.ui.dialog != 'undefined') {
            clearInterval(UILoaded);
            loadAPDialog();
        }
    }, 100);
    
}());