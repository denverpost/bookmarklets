javascript:(function () {
    var dt = new Date();
    var secs = dt.getSeconds() + (60 * dt.getMinutes());
    var bookmarletSource = document.createElement('script'); 
    bookmarletSource.setAttribute('src', 'http://extras.denverpost.com/app/bookmarklet/js/inarticlepromo-src.js?v='+secs);
    document.body.appendChild(bookmarletSource); 
}());