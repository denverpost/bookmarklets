javascript:(function() {
    function isValid(str) {
        var string = parseInt(str);
        if (string >= 0 && strong <= 99) {
            return true;
        } else {
            return false;
        }
    }

    function checkTagBoxes(tags){
        for(var i=0,len=tags.length;i<len;i++){
            document.getElementById(tags[i]).checked = true;
        }
    }

    function primaryOptions(sectionPrimary,tagPrimary){
        var sectionSelect = 'fm-mason_post_settings-0-schema-0-primary_section-0';
        var tagSelect = 'fm-mason_post_settings-0-schema-0-primary_tag-0';
        document.getElementById(sectionSelect).value = sectionPrimary;
        document.getElementById(tagSelect).value = tagPrimary;
    }

    function addTag(newTags){
        for(var i=0,len=newTags.length;i<len;i++){
            document.getElementById('new-tag-post_tag').value = newTags[i];
            var button = jQuery('#post_tag .ajaxtag input.button.tagadd').click();
        }
    }

    function trumpThatBitch() {
        var tags = ['in-category-11580', 'in-category-75', 'in-category-81', 'in-category-48', 'in-category-39', 'in-category-59'];
        var newTags = ['Donald Trump'];
        var sectionPrimary = '11580';
        var tagPrimary = '1276';
        checkTagBoxes(tags);
        addTag(newTags);
        primaryOptions(sectionPrimary,tagPrimary)
    }

    loop:
    while(true) {
        var selectFunction = prompt('Welcome to AUTO-PRODUCER. How can I help?\n\n\n\
            ( 1 ) Trump Story\n\n\n\
        Enter selection (or "?" for help):\n','0');
        switch (selectFunction) {
            case '?':
                window.open('http://extras.denverpost.com/app/bookmarklet/ap-help.html', '_blank');
            case '1':
                trumpThatBitch();
                break loop;
            default:
                var again = confirm('That\'s not a valid option. Try again?');
                if (again == true) {
                    break loop;
                }
        }
    }
}());