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
    var splitters = /\n\n|<\/p><p>|<\/p>\n<p>|    <p>|[\s]{2,5}|<p>/;
    var grafs = content.textContent.split(splitters);
    if (grafs[0].toLowerCase().startsWith('by')) {
        var byline = grafs[0];
        var bylineSplit = '';
        if (byline.indexOf('(c)') > -1) {
            bylineSplit = byline.split('(c)')[0].split(',')[0].capitalizeFirstLetters().replace('By ','').trim();
        } else {
            bylineSplit = byline.split(',')[0].capitalizeFirstLetters().replace('By ','');
        }
        console.log(bylineSplit);
    }
    var author = document.getElementById('coauthors_hidden_input').value;
    if (author == 'the-associated-press') {
        grafs[0] = 'By <strong>' + bylineSplit + '</strong>, <em>The Associated Press</em>';
        console.log(grafs[0]);
    } else if (author == 'the-washington-post') {
        grafs[0] = 'By <strong>' + bylineSplit + '</strong>, <em>The Washington Post</em>';
        console.log(grafs[0]);
    }
    document.getElementById('content').value = grafs.join('\n\n');
})();