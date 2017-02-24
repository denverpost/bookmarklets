javascript:(function(){
    String.prototype.capitalizeFirstLetters = function() {
        var words = this.split(/[\s]+/);
        var wordsOut = [];
        for(i=0,len=words.length;i<len;i++) {
            wordsOut.push(words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase());
        }
        return wordsOut.join(' ');
    }
    var content = document.getElementById('content');
    content = content.replace('(AP) —','--');
    var splitters = /\n\n|<\/p><p>|<\/p>\n<p>|    <p>|[\s]{2,5}|<p>|<\/p> <p>|<\/p> <p \/> <p>/;
    var grafs = content.textContent.split(splitters);
    grafsClean = [];
    for(i=0,len=grafs.length;i<len;i++) {
        if (grafs[i].match(/<p \/>/) === null) {
            grafsClean.push(grafs[i].replace('</p>',''));
        }
    }
    if (grafsClean[0].toLowerCase().startsWith('by')) {
        var byline = grafsClean[0];
        var bylineSplit = '';
        if (byline.indexOf('(c)') > -1) {
            bylineSplit = byline.split('(c)')[0].split(',')[0].capitalizeFirstLetters().replace('By ','').trim();
        } else {
            bylineSplit = byline.split(',')[0].capitalizeFirstLetters().replace('By ','');
        }
    }
    var author = document.getElementById('coauthors_hidden_input').value;
    if (author == 'the-associated-press') {
        grafsClean[0] = 'By <strong>' + bylineSplit + '</strong>, <em>The Associated Press</em>';
    } else if (author == 'the-washington-post') {
        grafsClean[0] = 'By <strong>' + bylineSplit + '</strong>, <em>The Washington Post</em>';
    }
    document.getElementById('content').value = grafsClean.join('\n\n');
})();