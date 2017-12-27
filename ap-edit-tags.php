<?php

echo 'started'."\n";

$tag_file = './ap-tagignore.js';
$tags_start = 'var autoProducerTagList = [';
$tags_end = '];';

$tags_list = file_get_contents($tag_file);
$tags = array_map('stripslashes', explode(',',str_replace(array($tags_start,$tags_end,'"'),'',$tags_list)));

$tagsets_file = './ap-tagsets.js';
$tagsets_start = 'var autoProducerTagSets = ';
$tagsets_end = ';';

$tagsets_list = file_get_contents($tagsets_file);
var_dump($tagsets_list);
$tagsets_list = trim(str_replace(array($tagsets_start,$tagsets_end),'',$tagsets_list));
var_dump($tagsets_list);
$tagsets = json_decode($tagsets_list,true);

var_dump($tagsets);

?>
<!DOCTYPE html>
<head>
	<title>AUTO-PRODUCER Tag Suggestion Manager</title>
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
					<li class="top-top"><a href="ap-edit-types.php"><strong>EDIT STORY TYPES</strong></a></li>
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
					<h1>AUTO-PRODUCER Tag Suggestion Editor</h1>
					<p>Tag suggestions rely on two things: an ignore list for bad tags that return too many false positives, and tag sets which determine a tag to suggest based on words and phrases that are not the same as the tag itself. This interface allows you to add or remove each type.</p>
					<p>PROTIP: Hit CTRL+ENTER (CMD+ENTER for Macs) anywhere on this page to submit. Be careful!</p>
				</div>
			</div>
		</div>
		<div id="admin" class="row">
			<form id="listtags" name="listtags" method="post" action="ap-submit.php">
				<div class="large-5 columns">
					<h2>Ignore list</h2>
					<p>Manage tags to be ignored when by AUTO-PRODUCER offers suggestions. Click or use checkboxes to select items for deletion.</p>
					<p>If you're adding a duplicate, it simply won't add anything.</p>
					<fieldset>
						<legend> Add tags to ignore </legend>
							<label for="addnewtag">Separate tags with commas:</label>
							<input type="text" name="addnewtag" />
							<input type="submit" value="SAVE CHANGES" class="button" />
					</fieldset>
					<fieldset>
						<legend> <?php echo count($tags); ?> tags </legend>
							<?php if (!count($tags)>0) { ?>
								<div class="row">
									<div class="large-12 columns text-center">
										<h3>No ignored tags to display!</h3>
									</div>
								</div>
							<?php } else { ?>
								<div class="row tablehead">
									<div class="large-2 columns">
										<strong>Select</strong>
									</div>
									<div class="large-10 columns">
										<strong>Tag text</strong>
									</div>
								</div>
								<?php foreach ($tags as $key => $value) { ?>
								<div class="row">
									<div class="large-2 columns">
										<input class="smallmargin" type="checkbox" name="tagdelete-<?php echo $key; ?>" id="tagdelete-<?php echo $key; ?>" value="1" />
									</div>
									<div class="large-10 columns">
										<label for="tag-<?php echo $key; ?>"><?php echo $value; ?></label>
									</div>
								</div>
							<?php } ?>
						<?php } ?>
						<input type="hidden" name="tags_save" value="true" />
					</fieldset>
				</div>
				<div class="large-7 columns">
					<fieldset>
						<legend> Add a tag set </legend>
							<label for="addnewtag">Input the tag to suggest here:</label>
							<input type="text" name="addnewtagset" />
							<input type="submit" value="SAVE CHANGES" class="button" />
					</fieldset>
					<fieldset>
						<legend> <?php echo count($tags); ?> tags </legend>
							<?php if (!count($tags)>0) { ?>
								<div class="row">
									<div class="large-12 columns text-center">
										<h3>No tag sets to display!</h3>
									</div>
								</div>
							<?php } else { ?>
								<div class="row tablehead">
									<div class="large-2 columns">
										<strong>Select</strong>
									</div>
									<div class="large-4 columns">
										<strong>Tag to suggest</strong>
									</div>
									<div class="large-6 columns">
										<strong>Trigger terms</strong>
									</div>
								</div>
								<?php foreach ($tags as $key => $value) { ?>
								<div class="row">
									<div class="large-2 columns">
										<input class="smallmargin" type="checkbox" name="tagdelete-<?php echo $key; ?>" id="tagsetdelete-<?php echo $key; ?>" value="1" />
									</div>
									<div class="large-4 columns">
										<div class="large-3 columns">
										<label for="tagset-<?php echo $key; ?>"><?php echo $value; ?></label>
									</div>
									</div>
									<div class="large-6 columns">
										<label for="tagset-<?php echo $key; ?>"><?php echo $value; ?></label>
									</div>
								</div>
							<?php } ?>
						<?php } ?>
						<input type="hidden" name="tags_save" value="true" />
					</fieldset>
				</div>
			</form>
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
		document.body.addEventListener('keydown', function(e) {
			if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
			    document.forms["listtags"].submit();
			}
		});
	</script>
</body>
</html>