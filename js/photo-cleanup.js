javascript:
(function() {
	function trim_words(theString, numWords) {
	    expString = theString.split(/\s+/,numWords);
	    theNewString=expString.join(" ");
	    return theNewString;
	}
	var captionParent = document.querySelectorAll('[data-setting="caption"] textarea');
	var caption = captionParent[0];
	var descriptionParent = document.querySelectorAll('[data-setting="description"] textarea');
	var description = descriptionParent[0];
	var altParent = document.querySelectorAll('[data-setting="alt"] input[type="text"]');
	var alt = altParent[0];
	var captionText = caption.textContent;
	var altText = trim_words(captionText,6) + ' ...';
	description.value = captionText;
	alt.value = altText;
	var creditParent = document.querySelectorAll('.compat-field-credit td.field input[type="text"]');
	var credit = creditParent[0];
	var re = /\((.*)\)/;
	var photoCred = captionText.match(re)[1];
	var captionTextNew = captionText.replace('('+photoCred+')','').trim();
	photoCredNew = photoCred.replace('Photo by ','').replace('/',', ');
	credit.value = photoCredNew;
	var dateline = captionTextNew.substring(0,captionTextNew.indexOf(':'));
	if (dateline.length == 0 || /[a-z]/.test(dateline) == false) {
		captionTextNew = captionTextNew.replace(dateline,'').replace(':','').trim();
		caption.value = captionTextNew;
	}
    var titleParent = document.querySelectorAll('[data-setting="title"] input[type="text"]');
    titleParent.focus;
});