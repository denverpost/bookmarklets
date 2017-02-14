javascript:(function () {
    var dt = new Date();
    var secs = dt.getSeconds() + (60 * dt.getMinutes());
    var bookmarkletSource = document.createElement('script'); 
    bookmarkletSource.setAttribute('src', 'https://extras.denverpost.com/app/bookmarklet/js/auto-producer.min.js?v='+secs);
    document.body.appendChild(bookmarkletSource); 
}());