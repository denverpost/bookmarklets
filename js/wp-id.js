javascript:(function(){
	var bodyClasses = document.getElementsByTagName("body")[0].classList;
	for (var i = 0, len = bodyClasses.length; i < len; i++) {
	    if (/postid-.*/.test(bodyClasses[i])) {
	      alert(bodyClasses[i].replace('postid-',''));
	  }
	}
})();