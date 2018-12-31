<?php

// Work out image size to render based on device
//
if ( wp_is_mobile() ) :
	$size = 'work_item_sm';
else :
	$size = 'work_item_lg';
endif;

$work_item_image = get_field("work_image");

?>

<article class="card">
	<div class="card__inner">
		<div class="card__media" style="background-image: url(<?php echo $work_item_image['sizes'][$size]; ?>)"></div>
		<h3 class="card__title"><?php the_field("work_title") ?></h3>
		<a href="<?php the_permalink() ?>" class="btn btn--light card__link">View <span class="sr-only"><?php the_field("work_title") ?></a>
	</div>
</article>
