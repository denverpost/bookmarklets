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
    };
    var title = document.querySelectorAll('[data-setting="title"] input[type="text"]')[0];
    var titleText = title.value;
    if (titleText.match(/APTOPIX/)) {
        title.value = titleText.replace('APTOPIX ','');
    }
    var caption = document.querySelectorAll('[data-setting="caption"] textarea')[0];
    document.querySelectorAll('[data-setting="description"] textarea')[0].value = caption.textContent;
    var captionText = caption.textContent.replace('FILE - ','');
    var afpCredit = false;
    var wapoCredit = false;
    if (captionText.match(/\/ AFP PHOTO \//)) {
        captionSplit = captionText.split("/ AFP PHOTO /");
        captionText = captionSplit[0];
        afpCredit = captionSplit[1];
    }
    if (captionText.match(/ MUST CREDIT\: /)) {
        captionSplit = captionText.split(" MUST CREDIT\: ");
        captionText = captionSplit[0];
        wapoCredit = captionSplit[1];
    }
    var re = /\(([^\(\)]{10,})\)/;
    var photoCred = '';
    var captionTextNew = '';
    var photoCredNew = '';
	if (locate.indexOf('upload.php') > -1) {
        photoCred = (re.test(captionText)) ? '('+captionText.match(re)[1]+')' : '';
        captionTextNew = captionText.replace(photoCred,'').replace(', Colorado.','.').trim();
        captionTextNew = abbrevMonths(captionTextNew);
    } else if (document.body.classList.contains('modal-open')) {
        photoCred = (re.test(captionText)) ? captionText.match(re)[1] : '';
        captionTextNew = captionText.replace('('+photoCred+')','').replace(', Colorado.','.').trim();
        captionTextNew = abbrevMonths(captionTextNew);
        if (afpCredit !== false) {
            afpCreditNew = afpCredit.replace('/AFP/Getty Images','').trim();
            credlen = afpCreditNew.length / 2;
            cred1 = afpCreditNew.substring(0,credlen).toLowerCase();
            cred2 = afpCreditNew.substring(credlen,afpCreditNew.length).toLowerCase();
            if (cred1 == cred2) {
                photoCredNew = cred1.capitalizeFirstLetters() + ', AFP/Getty Images';
            } else {
                photoCredNew = afpCreditNew.toLowerCase().capitalizeFirstLetters() + ', AFP/Getty Images';
            }
        } else if (wapoCredit !== false) {
            photoCredNew = wapoCredit;
        } else {
            if (photoCred.match(/AP Photo by/)) {
                if (photoCred.indexOf(', File') > -1) {
                    photoCredNew = photoCred.replace('AP Photo by ','').replace(', File','') + ', Associated Press file';
                } else {
                	photoCredNew = photoCred.replace('AP Photo by ','') + ', The Associated Press';
                }
            } else if (photoCred.match(/AP Photo\//)) {
                if (photoCred.indexOf(', File') > -1) {
                    photoCredNew = photoCred.replace('AP Photo/','').replace(', File','') + ', Associated Press file';
                } else {
                	photoCredNew = photoCred.replace('AP Photo/','') + ', The Associated Press';
                }
            } else if (photoCred.match(/Photo By/)) {
            	photoCredNew = photoCred.replace('Photo By ','').replace('/',', ').replace('The Denver Post via Getty Images','The Denver Post');
            } else if (photoCred.match(/Photo by/)) {
            	photoCredNew = photoCred.replace('Photo by ','').replace('/',', ').replace('The Denver Post via Getty Images','The Denver Post');
            }
        }
    }
    if (typeof document.querySelectorAll('.compat-field-credit td.field input[type="text"]')[0] != 'undefined') {
        var credit = document.querySelectorAll('.compat-field-credit td.field input[type="text"]')[0];
        credit.value = photoCredNew;
        jQuery(credit).keydown();
        jQuery(credit).keypress();
        jQuery(credit).keyup();
        jQuery(credit).blur();
        jQuery(credit).focus();
        jQuery(credit).change();
    }
    var dateline = captionTextNew.substring(0,captionTextNew.indexOf(':'));
    if (dateline.length === 0 || /[a-z]/.test(dateline) === false) {
        captionTextNew = captionTextNew.replace(dateline,'').replace(':','').replace('(L-r) ','').trim();
        caption.value = captionTextNew;
    }
    var altParent = document.querySelectorAll('[data-setting="alt"] input[type="text"]');
    var alt = altParent[0];
    var altText = '';
    var elipsis = (captionTextNew.length >= 6) ? ' ...' : '';
    if (captionTextNew.indexOf('file photo,') > -1 || captionTextNew.indexOf('In this photo taken') > -1) {
        if (captionTextNew.indexOf('In this photo taken') > -1) {
            altText = trim_words(captionTextNew.replace(/([^\,]*\,){3}/, ''),6);
        } else if (captionTextNew.indexOf('file photo,') > -1) {
            altText = trim_words(captionTextNew.replace(/([^\,]*\,){3}/, ''),6);
        }
        altText = altText.trim() + elipsis;
        altText = altText.charAt(0).toUpperCase() + altText.slice(1);
    } else {
        altText = trim_words(captionTextNew,6) + elipsis;
    }
    alt.value = altText;
    var customCaption = document.querySelectorAll('.compat-field-custom_caption td.field textarea')[0];
    customCaption.focus();
}());