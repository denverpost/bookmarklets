(function() {
	var locate = window.location.href;
	function trim_words(theString, numWords) {
        var expString = theString.split(/\s+/,numWords);
        var theNewString = expString.join(' ');
        return theNewString;
    }
    function abbrevMonths(captionTextAbbrev) {
    	return captionTextAbbrev.replace(' January ',' Jan. ').replace(' February ',' Feb. ').replace(' August ',' Aug. ').replace(' September ',' Sept. ').replace(' October ',' Oct. ').replace(' November ',' Nov. ').replace(' December ',' Dec. ');
    }
    String.prototype.capitalizeFirstLetters = function() {
        var words = this.split(/[\s]+/);
        var wordsOut = [];
        for(i=0,len=words.length;i<len;i++) {
            wordsOut.push(words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase());
        }
        return wordsOut.join(' ');
    }
    var captionParent = document.querySelectorAll('[data-setting="caption"] textarea');
    var caption = captionParent[0];
    var descriptionParent = document.querySelectorAll('[data-setting="description"] textarea');
    var description = descriptionParent[0];
    var altParent = document.querySelectorAll('[data-setting="alt"] input[type="text"]');
    var alt = altParent[0];
    var captionText = caption.textContent.replace('FILE - ','');
    description.value = captionText;
    var afpCredit = false;
    if (captionText.match(/\/ AFP PHOTO \//)) {
        captionSplit = captionText.split("/ AFP PHOTO /");
        captionText = captionSplit[0]
        afpCredit = captionSplit[1];
    }
    var creditParent = document.querySelectorAll('.compat-field-credit td.field input[type="text"]');
    var credit = (creditParent[0] != 'undefined') ? creditParent[0] : false;
    var re = /\(([^\(\)]{10,})\)/;
    var photoCred = '';
    var captionTextNew = '';
	if (locate.indexOf('upload.php') > -1) {
        photoCred = (re.test(captionText)) ? '('+captionText.match(re)[1]+')' : '';
        captionTextNew = captionText.replace(photoCred,'').replace(', Colorado.','.').trim();
        captionTextNew = abbrevMonths(captionTextNew);
    } else if (document.body.classList.contains('modal-open')) {
        photoCred = (re.test(captionText)) ? captionText.match(re)[1] : '';
        captionTextNew = captionText.replace('('+photoCred+')','').replace(', Colorado.','.').trim();
        captionTextNew = abbrevMonths(captionTextNew);
        var photoCredNew = '';
        if (afpCredit) {
            afpCreditNew = afpCredit.replace('/AFP/Getty Images','').trim();
            credlen = afpCreditNew.length / 2;
            cred1 = afpCreditNew.substring(0,credlen).toLowerCase();
            cred2 = afpCreditNew.substring(credlen,afpCreditNew.length).toLowerCase();
            if (cred1 == cred2) {
                photoCredNew = cred1.capitalizeFirstLetters() + ', AFP/Getty Images';
            } else {
                photoCredNew = afpCreditNew.toLowerCase().capitalizeFirstLetters() + ', AFP/Getty Images';
            }
        } else {
            if (photoCred.match(/AP Photo by/)) {
            	photoCredNew = photoCred.replace('AP Photo by ','') + ', The Associated Press';
            } else if (photoCred.match(/AP Photo\//)) {
            	photoCredNew = photoCred.replace('AP Photo/','') + ', The Associated Press';
            } else if (photoCred.match(/Photo By/)) {
            	photoCredNew = photoCred.replace('Photo By ','').replace('/',', ').replace('The Denver Post via Getty Images','The Denver Post');
            } else if (photoCred.match(/Photo by/)) {
            	photoCredNew = photoCred.replace('Photo by ','').replace('/',', ').replace('The Denver Post via Getty Images','The Denver Post');
            }
        }
        if (credit !== false) {
            credit.value = photoCredNew;
        }
    }
    var dateline = captionTextNew.substring(0,captionTextNew.indexOf(':'));
    if (dateline.length === 0 || /[a-z]/.test(dateline) === false) {
        captionTextNew = captionTextNew.replace(dateline,'').replace(':','').trim();
        caption.value = captionTextNew;
    }
    var elipsis = (captionTextNew.length <= 6) ? ' ...' : '';
    var altText = trim_words(captionTextNew,6) + elipsis;
    alt.value = altText;
    var titleParent = document.querySelectorAll('[data-setting="title"] input[type="text"]');
    var title = titleParent[0];
    var titleText = title.value;
    if (titleText.match(/APTOPIX/)) {
    	title.value = titleText.replace('APTOPIX ','');
    }
    altParent.focus;
}());