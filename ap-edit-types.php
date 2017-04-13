<?php

error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);

require_once './ap-sections.php';
// $all_sections and $all_tags arrays using 'Wordpress ID' -> 'Title'

$options_file = './ap-options.js';
$options_start = 'var autoProducerOptions = ';
$options_end = ';';

$options_list = file_get_contents($options_file);
$options_string = str_replace(array($options_start,$options_end),'',$options_list);
$options = json_decode($options_string);

$selected = FALSE;
if(isset($_POST['typeoption']) && isset($options->$_POST['typeoption'])) {
	$selected = $_POST['typeoption'];
}

?>
<!DOCTYPE html>
<head>
	<title>AUTO🤖PRODUCER™ Story Type Manager</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" type="text/css" href="//cdn.foundation5.zurb.com/foundation.css" />
	<link rel="stylesheet" type="text/css" href="style.css" />
	<style type="text/css">

	</style>
	<link rel="icon" href="http://extras.mnginteractive.com/live/media/favIcon/dpo/favicon.ico" type="image/x-icon" />

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
</head>

<body>
	<div id="snow"></div>
	<section id="header">

		<!-- NAVIGATION BAR -->
		<div id="top-bar-margin" class="sticky fixed">
			<nav class="top-bar" data-topbar="" role="navigation">
				<ul class="title-area">
					<li class="name">
						<a href="http://denverpost.com"><img src="http://extras.denverpost.com/candidate-qa/denver-2015/images/dp-logo-white.png" alt="The Denver Post logo" class="nav-logo"></a>
					</li>
				</ul>
				<section class="top-bar-section">
				<ul class="right">
					<li class="divider"></li>
					<li class="top-top"><a href="ap-edit-tags.php"><strong>EDIT STORY TYPES</strong></a></li>
					<li class="divider"></li>
				</ul>
			</section>
			</nav>
		</div> <!-- Closes top-bar-margin -->
	</section>
	<div id="wrapper">

		<div class="headerstyle">
			<div class="row">
				<div class="large-12 columns">
					<h1>AUTO🤖PRODUCER™ Story Type Manager</h1>
				</div>
				<div class="large-8 medium-8 columns">
					<p>Manage the Story Types available within AUTO🤖PRODUCER™. Select a Story Type from the dropdown to edit its details.</p>
				</div>
			</div>
		</div>
		<div id="admin" class="row">
			<form id="selecttype" name="selecttype" method="post" action="ap-edit-types.php">
				<div class="large-12 columns">
					<fieldset>
						<legend> Select </legend>
						<div class="row add-new-tag">
							<div class="large-6 large-centered columns">
								<select id="typeoption" name="typeoption" onchange="this.form.submit()">
									<option value="">Select story type...</option>
									<?php foreach ($options as $key => $value) { ?>
										<option value="<?php echo $key; ?>"<?php if($selected !== FALSE && $selected == $key) { echo ' selected="selected"';} ?>><?php echo $key.' - '.$value->title; ?></option>
									<?php } ?>
								</select>
							</div>
						</div>
					</fieldset>
				</div>
			</form>
			<?php if ($selected !== FALSE): 
				$option_selected = $options->$selected; ?>
			<?php echo "primary: ".$option_selected->{'primary-section'}; var_dump($options->$selected); ?>
			<form id="edittype" name="edittype" method="post" action="ap-submit.php">
				<div class="large-12 columns">
					<fieldset>
						<legend> Story type: <span style="color:SteelBlue"><?php echo $option_selected->title; ?></span> </legend>
						<?php $option = $options->$selected; ?>
						<div class="row">
							<div class="large-5 columns">
								<h5 class="text-center">Sections to select</h5>
							</div>
							<div class="large-2 columns">
								&nbsp;
							</div>
							<div class="large-5 columns">
								<h5 class="text-center">All sections</h5>
							</div>
						</div>
						<div class="row">
							<div class="large-4 columns">
								<select name="selectsectionsto" id="select-to-section" multiple size="8">
									<?php foreach ($option_selected->{'check-sections'} as $key => $value) { ?>
										<option value="<?php echo $value; ?>"><?php echo $all_sections[$value]; ?></option>
									<?php } ?>
							    </select>
							</div>
							<div class="large-4 columns">
							    <a href="JavaScript:void(0);" id="btn-add-section" class="button expand">&laquo; Add</a>
							    <a href="JavaScript:void(0);" id="btn-remove-section" class="button expand">Remove &raquo;</a>
							</div>
							<div class="large-4 columns">
							    <select name="selectsectionsfrom" id="select-from-section" multiple size="8">
									<?php foreach ($all_sections as $key => $value) { 
											if (!isset($option->{'check-sections'}[$key])) { ?>
											<option value="<?php echo $key; ?>"><?php echo $value; ?></option>
										<?php }
									} ?>
							    </select>
							</div>
						</div>
						<div class="row">
							<div class="large-5 columns">
								<h5 class="text-center">Tags to add</h5>
							</div>
							<div class="large-2 columns">
								&nbsp;
							</div>
							<div class="large-5 columns">
								<h5 class="text-center">All tags</h5>
							</div>
						</div>
						<div class="row">
							<div class="large-4 columns">
								<select name="selecttagsto" id="select-to-tag" multiple size="8">
									<?php foreach ($option_selected->{'add-tags'} as $value) { ?>
										<option value="<?php echo $value; ?>"><?php echo $value; ?></option>
									<?php } ?>
							    </select>
							</div>
							<div class="large-4 columns">
							    <a href="JavaScript:void(0);" id="btn-add-tag" class="button expand">&laquo; Add</a>
							    <a href="JavaScript:void(0);" id="btn-remove-tag" class="button expand">Remove &raquo;</a>
							</div>
							<div class="large-4 columns">
							    <select name="selecttagsfrom" id="select-from-tag" multiple size="8">
									<?php foreach ($all_tags as $value) { 
											if (!in_array($value,$option->{'add-tags'})) { ?>
											<option value="<?php echo $value; ?>"><?php echo $value; ?></option>
										<?php }
									} ?>
							    </select>
							</div>
						</div>
						<div class="row">
							<div class="large-6 columns">
								<h5 class="left">Primary section:</h5>
								<select name="sectionprimary" id="sectionprimary">
									<?php if (!isset($option_selected->{'primary-section'})) { ?>
										<option value="false">NONE</option>
									<?php } ?>
									<?php foreach ($all_sections as $key => $value) { ?>
										<option value="<?php echo $key; ?>"<?php if(isset($option_selected->{'primary-section'}) && $key == $option_selected->{'primary-section'}) { echo ' selected="selected"'; } ?>><?php echo $value; ?></option>
									<?php } ?>
								</select>
							</div>
							<div class="large-6 columns">
								<h5 class="left">Primary tag:</h5>
								<select name="tagprimary" id="tagprimary">
									<?php if (!isset($option_selected->{'primary-tag'})) { ?>
										<option value="false">NONE</option>
									<?php } ?>
									<?php foreach ($all_tags as $key => $value) { ?>
										<option value="<?php echo $key; ?>"<?php if(isset($option_selected->{'primary-tag'}) && $key == $option_selected->{'primary-tag'}) { echo ' selected="selected"'; } ?>><?php echo $value; ?></option>
									<?php } ?>
								</select>
							</div>
						</div>
						<input type="hidden" name="tags_save" value="true" />
					</fieldset>
				</div>
			</form>
		<?php endif; ?>
		</div>

		<footer>
		    <div class="row">
		      <div class="large-12 medium-12 small-12 columns">
		      <p style="text-align: right">Copyright &copy; 2017, The Denver Post</p>
		      </div>
		    </div>
		</footer>

	<script src="http://extras.denverpost.com/foundation/js/foundation.min.js"></script>
	<script>
		$(document).foundation();
	</script>
	<script>
		$(document).ready(function() {
 
	    $('#btn-add-section').click(function(){
	        $('#select-from-section option:selected').each( function() {
	                $('#select-to-section').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
	            $(this).remove();
	        });
	    });
	    $('#btn-remove-section').click(function(){
	        $('#select-to-section option:selected').each( function() {
	            $('#select-from-section').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
	            $(this).remove();
	        });
	    });
	    $('#btn-add-tag').click(function(){
	        $('#select-from-tag option:selected').each( function() {
	                $('#select-to-tag').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
	            $(this).remove();
	        });
	    });
	    $('#btn-remove-tag').click(function(){
	        $('#select-to-tag option:selected').each( function() {
	            $('#select-from-tag').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
	            $(this).remove();
	        });
	    });
	 
	});
	</script>
</body>
</html>