var content = jQuery('#content');
var grafs = content.text().split('\n\n');

var cx_date = new Date();
var monthNames = ["Jan. ","Feb. ","March ","April ","May ","June ","July ","Aug. ","Sept. ","Oct. ","Nov.","Dec. "];
var cx_month = monthNames[cx_date.getMonth()];
var amPm = ( cx_date.getHours() < 12 ) ? ' a.m.' : ' p.m.';
var cx_date_markup = cx_month +  cx_date.getDay() + ', ' + cx_date.getFullYear() + ' at ' + cx_date.getHours() + ':' + cx_date.getMinutes() + amPm;

var cx_content = prompt('Type or paste the correction language here. The Update date and time and all other formatting will be included automatically.\n\n', '');

var markup = '<hr />\n\n\
<strong>Updated ' + cx_date_markup + '</strong> <em>' + cx_content + '</em>\n\n\
<hr />';

grafs.splice(grafs.length, 0, markup);

jQuery('#content').text(grafs.join('\n\n'));
