<?php

// Work out images sizes to render based on device
//
if ( wp_is_mobile() ) :
	$size = 'work_item_lg';
	$size_for_opt = 'work_item_sm';
else :
	$size = 'work_item_xlg';
	$size_for_opt = 'work_item_lg';
endif;

$work_image = get_field("work_image");

$work_opt_image_1 = get_field("work_opt_image_1");
$work_opt_image_2 = get_field("work_opt_image_2");
$work_opt_image_3 = get_field("work_opt_image_3");
$work_opt_image_4 = get_field("work_opt_image_4");

// Get iframe code from acf field and strip the src value out to insert into page
//
$iframeCode = get_field('work_embed');

// Get the src from the iframe code
preg_match('/src="([^"]+)"/', $iframeCode, $match);
$iframeSrc = $match[1];
?>

<div class="work-header">
	<p class="work-header__subtitle"><a href="<?php echo esc_url( get_permalink( get_page_by_title( 'Home' ) ) ); ?>work">Our work</a></p>
	<h1 class="work-header__title"><?php the_field("work_title") ?></h1>
	<div class="work-header__media" style="background-image: url(<?php echo $work_image['sizes'][$size]; ?>)"></div>
</div>

<section class="section">
	<div class="section__block">
		<div class="row">
			<div class="col-lg-6">
				<div class="work-item__block">
					<p><?php the_field("work_description") ?></p>
				</div>
			</div>
			<div class="col-lg-6 mt-2-desktop-down">
				<iframe width="100%" height="320" src="<?php echo $iframeSrc ?>" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>
		</div>
	</div>
</section>

<?php if ( get_field("work_quote") ) : ?>
	<section class="section">
		<div class="section__block">
			<div class="row">
				<div class="col-12">
					<div class="work-item__block">
						<p class="quote">
							<q><?php the_field("work_quote") ?></q>
							<span>- <?php the_field("work_quote_name") ?></span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
<?php endif; ?>

<?php if ($work_opt_image_1 || $work_opt_image_2 || $work_opt_image_3 || $work_opt_image_4) : ?>
	<div class="img-grid img-grid--work">
		<?php if ($work_opt_image_1) : ?>
			<div class="img-grid__item">
				<img src="<?php echo $work_opt_image_1['sizes'][$size_for_opt]; ?>" alt="Screenshot from <?php the_field("work_title") ?>">
			</div>
		<?php endif; ?>
		<?php if ($work_opt_image_2) : ?>
			<div class="img-grid__item">
				<img src="<?php echo $work_opt_image_2['sizes'][$size_for_opt]; ?>" alt="Screenshot from <?php the_field("work_title") ?>">
			</div>
		<?php endif; ?>
		<?php if ($work_opt_image_3) : ?>
			<div class="img-grid__item">
				<img src="<?php echo $work_opt_image_3['sizes'][$size_for_opt]; ?>" alt="Screenshot from <?php the_field("work_title") ?>">
			</div>
		<?php endif; ?>
		<?php if ($work_opt_image_4) : ?>
			<div class="img-grid__item">
				<img src="<?php echo $work_opt_image_4['sizes'][$size_for_opt]; ?>" alt="Screenshot from <?php the_field("work_title") ?>">
			</div>
		<?php endif; ?>
	</div>
<?php endif; ?>
