function getTheContent(){
	var content = jQuery('#content').text();
	content = content.replace(new RegExp("<p>", 'g'),"\n\n");
	content = content.replace(new RegExp("</p>", 'g'),"\n\n");
	content = content.replace(new RegExp("  ", 'g')," ");
	content = content.replace(new RegExp("   ", 'g')," ");
	content = content.replace(new RegExp("  ", 'g')," ");
	content = content.replace(new RegExp("\n&nbsp;\n", 'g'),"\n");
	content = content.replace(new RegExp("\n \n", 'g'),"\n\n");
	content = content.replace(new RegExp("\n \n", 'g'),"\n\n");
	content = content.replace(new RegExp("\n\n\n", 'g'),"\n\n");
	content = content.replace(new RegExp("\n\n\n", 'g'),"\n\n");
	content = content.replace(new RegExp("\n\n\n", 'g'),"\n\n");
	return content.split('\n\n');
}
var grafs = getTheContent();
badGraf = grafs.indexOf("&mdash;&mdash;&mdash;");
grafs.length = badGraf;
var markup = '[related_articles location="right" show_article_date="true" article_type="automatic-primary-tag"]';
var len = grafs.length;
if (len >= 6) {
	grafs.splice(len-4, 0, markup);
}
jQuery('#content').text(grafs.join('\n\n'));
