javascript:(function() {
    function isValid(str) {
        var string = parseInt(str);
        if (string >= 0 && strong <= 99) {
            return true;
        } else {
            return false;
        }
    }

    function checkSections(tags){
        for(var i=0,len=tags.length;i<len;i++){
            document.getElementById('in-category-'+tags[i]).checked = true;
        }
    }

    function checkAppleNewsBoxes(boxes){
        for(var i=0,len=boxes.length;i<len;i++){
            console.log(boxes[i]);
            console.log(appleNewsSections[boxes[i]]);
            document.getElementById(appleNewsSections[boxes[i]]).checked = true;
        }
    }

    function primaryOptions(sectionPrimary,tagPrimary){
        var sectionSelect = 'fm-mason_post_settings-0-schema-0-primary_section-0';
        var tagSelect = 'fm-mason_post_settings-0-schema-0-primary_tag-0';
        if (sectionPrimary.length >= 1) {
            document.getElementById(sectionSelect).value = sectionPrimary;
        }
        if (tagPrimary.length >= 1) {
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
        if (options['check-sections'].length >= 1){
            checkSections(options['check-sections']);
        }
        if (options['add-tags'].length >= 1) {
            addTag(options['add-tags']);
        }
        if (options['primary-section'].length >= 1 || options['primary-tag'].length >= 1) {
            primaryOptions(options['primary-section'],options['primary-tag'])
        }
        if (options['apple-news'].length >= 1) {
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
            'check-sections': ['11580', '75', '81', '48', '39', '59'],
            'add-tags': ['Donald Trump'],
            'primary-section': '11580',
            'primary-tag': '1276',
            'apple-news': ['politics'],
        },
        '2': {
            'check-sections': ['40','47','39'],
            'add-tags': [''],
            'primary-section': '40',
            'primary-tag': '',
            'apple-news': ['colorado-news'],
        },
        '3': {
            'check-sections': ['40','47','39'],
            'add-tags': [''],
            'primary-section': '40',
            'primary-tag': '',
            'apple-news': ['colorado-news'],
        },
    }

    loop:
    while(true) {
        var selectFunction = prompt('Welcome to AUTO-PRODUCER. How can I help?\n\n\n\
            ( 1 ) Trump Story\n\
            ( 2 ) Crime Story\n\
        \n\nEnter selection (or "?" for help):\n','0');
        switch (selectFunction) {
            case '?':
                window.open('http://extras.denverpost.com/app/bookmarklet/ap-help.html', '_blank');
            case '1':
                trumpThatBitch(options['1']);
                break loop;
            default:
                var again = confirm('That\'s not a valid option. Try again?');
                if (again == true) {
                    break loop;
                }
        }
    }
}());