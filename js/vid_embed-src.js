javascript:(function() {
    var content = jQuery('#content');
    var grafs = content.text().split('\n\n');

    loop:
    while(true) {
        var vidId = prompt('What is the Inform ID of the video you want to embed?\n\nNote: Embeds always appear at the top of a story, but can be moved with CTRL+X and CTRL+V\n\n','');
        if (vidId.length == 8 && vidId.match(/^[0-9]+$/) != null) {
            break loop;
        } else {
            alert('You must enter an 8-digit number.');
        }
    }

    loop:
    while(true) {
        var listId = prompt('What is the Inform ID of the video you want to embed? (Hit ENTER for "News")\n\n\
            Here are some of the most common playlist IDs:\n\n\
                Business: 18444\n\
                The Cannabist: 18445\n\
                DPTV - Up To Date: 18457\n\
                News: 18464 (default)\n\
                News - Guns: 18548\n\
                Politics: 18470\n\
                Politics - Elections: 18471\n\
                Sports: 18474\n\
                Sports - Broncos: 18477\n\n','18464');
        if (listId.length == 5 && listId.match(/^[0-9]+$/) != null) {
            break loop;
        } else {
            alert('You must enter an 5-digit number.');
        }
    }

    loop:
    while(true) {
        var autoPlay = prompt('Should it Autoplay? (Hit ENTER for "NO")\n\n\
            Options:\n\n\
                No Autoplay: 0 (default)\n\
                Autoplay: 1\n\
                Play on mouse-over: 3\n\
                Play when scrolled into view: 7\n\
                ','0');
        if (autoPlay === '0' || autoPlay === '1' || autoPlay === '7' || autoPlay === '3') {
            break loop;
        } else {
            alert('You must enter an 1-digit number.');
        }
    }

    var markup = '[cq  comment="VIDEO PLACED BELOW"]\n\
        <div class="ndn_embed" style="width:100%;" data-config-pb="0" data-config-widget-id="' + autoPlay + '" data-config-type="VideoPlayer/Single" data-config-tracking-group="90115" data-config-playlist-id="' + listId + '" data-config-video-id="' + vidId + '" data-config-site-section="denverpost" data-config-width="100%" data-config-height="9/16w"></div> \n\
    [cq  comment="VIDEO PLACED ABOVE"]';

    grafs.splice(0, 0, markup);

    jQuery('#content').text(grafs.join('\n\n'));
}());