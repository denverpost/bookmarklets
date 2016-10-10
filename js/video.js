var content = jQuery('#content').text();
var video_id = prompt('What\'s the video id?');
var playlist_id = prompt('What\'s the video playlist id?');
var markup = '[cq comment="VIDEO PLACED BELOW"]<div data-config-widget-id="1" data-config-type="VideoPlayer/Single" data-config-tracking-group="90115" data-config-playlist-id="' + playlist_id + '" data-config-video-id="' + video_id + '" data-config-site-section="denverpost" data-config-width="100%" data-config-height="9/16w" data-config-pb="AUTOPLAY-CODE" class="ndn_embed" style="width: 100%"></div> [cq comment="VIDEO PLACED ABOVE"]\n\n';
jQuery('#content').text(markup + content);
