<?php

$tag_file = './ap-taglist.js';
$tags_start = 'var autoProducerTagList = ["';
$tags_end = '"];';

$tags_list = file_get_contents($tag_file);
$tags = array_map('stripslashes', explode(',',str_replace(array($tags_start,$tags_end,'"'),'',$tags_list)));

?>
<!DOCTYPE html>
<head>
	<title>AUTO🤖PRODUCER™ Tag Suggestion Manager</title>
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
					<h1>AUTO🤖PRODUCER™ Tag Suggestion Manager</h1>
				</div>
				<div class="large-8 medium-8 columns">
					<p>Manage tags to be suggested by AUTO🤖PRODUCER™. Click or use checkboxes to select items for deletion.</p>
					<p>If you're adding a duplicate, it simply won't add anything.</p>
				</div>
				<div class="large-4 medium-4 columns">
					<label
				</div>
			</div>
		</div>
		<div id="admin" class="row">
			<form id="listtags" name="listtags" method="post" action="ap-submit.php">
				<div class="large-12 columns">
					<fieldset>
						<legend> Add tags </legend>
						<div class="row add-new-tag">
							<div class="large-4 columns">
								<label for="addnewtag">Separate tags with commas:</label>
							</div>
							<div class="large-5 columns">
								<input type="text" name="addnewtag" />
							</div>
							<div class="large-3 columns">
								<input type="submit" value="SAVE CHANGES" class="button" />
							</div>
						</div>
					</fieldset>
				</div>
				<div class="large-12 columns">
					<fieldset>
						<legend> <?php echo count($tags); ?> tags </legend>
							<?php if (!count($tags)>0) { ?>
								<div class="row">
									<div class="large-12 columns text-center">
										<h2>No items to display!</h2>
									</div>
								</div>
							<?php } else { ?>
								<div class="row" id="tablehead">
									<div class="large-1 large-push-4 columns">
										<strong>Select</strong>
									</div>
									<div class="large-4 large-pull-2 columns">
										<strong>Tag text</strong>
									</div>
								</div>
								<?php foreach ($tags as $key => $value) { ?>
								<div class="row">
									<div class="large-1 large-push-4 columns">
										<input class="smallmargin" type="checkbox" name="tagdelete-<?php echo $key; ?>" id="tagdelete-<?php echo $key; ?>" value="1" />
									</div>
									<div class="large-5 large-pull-2 columns">
										<label for="tag-<?php echo $key; ?>"><?php echo $value; ?></label>
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
</body>
</html>