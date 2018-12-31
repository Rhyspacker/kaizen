<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package kaizen
 */

// Get work item's description, truncate it to 150 characters and set it to meta description
$meta_description_work_item = substr(get_field("work_description"), 0, 150) . "...";

get_header();
?>

<div class="page">
	<div class="container">
		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/work-item-single', get_post_type() );
		endwhile;
		?>

	</div>
</div>

<?php
get_footer();
