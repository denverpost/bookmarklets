var content = jQuery('#content');
var grafs = content.text().split('\n\n');
var markup = '[related_articles location="right" show_article_date="true" article_type="automatic-primary-tag"]';
var len = grafs.length;
if (len >= 6) {
	grafs.splice(len-4, 0, markup);
}
jQuery('#content').text(grafs.join('\n\n'));
