<?php
/**
 * kaizen functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package kaizen
 */

if ( ! function_exists( 'kaizen_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function kaizen_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on kaizen, use a find and replace
		 * to change 'kaizen' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'kaizen', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'kaizen' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'kaizen_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
	}
endif;
add_action( 'after_setup_theme', 'kaizen_setup' );


/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

/*
// ========================================= //
	Custom Functions
// ========================================= //
*/

// Remove Posts from admin menu
add_action('admin_menu', function() {
    remove_menu_page('edit.php');
});

// turn off pagination for the archive page
add_action('parse_query', function($query) {
  if (is_post_type_archive('work')) {
    $query->set('nopaging', 1);
  }
});

// Responsive ACF images
function awesome_acf_responsive_image($image_id,$image_size,$max_width){

	// check the image ID is not blank
	if($image_id != '') {

		// set the default src image size
		$image_src = wp_get_attachment_image_url( $image_id, $image_size );

		// set the srcset with various image sizes
		$image_srcset = wp_get_attachment_image_srcset( $image_id, $image_size );

		// generate the markup for the responsive image
		echo 'src="'.$image_src.'" srcset="'.$image_srcset.'" sizes="(max-width: '.$max_width.') 100vw, '.$max_width.'"';

	}
}

/*
// ========================================= //
	Custom Image Sizes
// ========================================= //
*/

// Work
add_image_size( "work_item_sm", 515, 305, true );
add_image_size( "work_item_lg", 860, 470, true );
add_image_size( "work_item_xlg", 1200, 600, true );

// Team
add_image_size( "team_member", 400, 400, true );

/*
// ========================================= //
	Custom Post Types
// ========================================= //
*/

function work_post_type() {
	$labels = array(
		'name' => 'Work',
		'singular_name' => 'Work',
		'add_new' => 'Add Work Item',
		'all_items' => 'All Items',
		'add_new_item' => 'Add Work Item',
		'edit_item' => 'Edit Work Item',
		'new_item' => 'New Work Item',
		'view_item' => 'View Work Item',
		'search_item' => 'Search Work',
		'not_found' => 'No items found',
		'not_found_in_trash' => 'No items found in trash',
		'parent_item_colon' => 'Parent Item'
	);
	$args = array(
		'labels' => $labels,
		'public' => true,
		'has_archive' => true,
		'publicly_queryable' => true,
		'query_var' => true,
		'rewrite' => true,
		'capability_type' => 'post',
		'hierarchical' => false,
		'supports' => array(
			'title',
			'custom-fields',
			'editor'
		),
		'menu_position' => 4,
		'exclude_from_search' => true,
		'show_ui' => true, // defaults to true so don't have to include
		'show_in_menu' => true, // defaults to true so don't have to include
	);

	register_post_type('work', $args);
}
add_action( 'init', 'work_post_type');

function team_post_type() {
	$labels = array(
		'name' => 'Team',
		'singular_name' => 'Team Member',
		'add_new' => 'Add Team Member',
		'all_items' => 'All Team Members',
		'add_new_item' => 'Add Team Member',
		'edit_item' => 'Edit Team Member',
		'new_item' => 'New Team Member',
		'view_item' => 'View Team Member',
		'search_item' => 'Search Team Members',
		'not_found' => 'No Team Members found',
		'not_found_in_trash' => 'No Team Members found in trash',
		'parent_item_colon' => 'Parent Item'
	);
	$args = array(
		'labels' => $labels,
		'public' => true,
		'has_archive' => true,
		'publicly_queryable' => true,
		'query_var' => true,
		'rewrite' => true,
		'capability_type' => 'post',
		'hierarchical' => false,
		'supports' => array(
			'title',
			'custom-fields',
			'editor'
		),
		'menu_position' => 5,
		'exclude_from_search' => true,
		'show_ui' => true, // defaults to true so don't have to include
		'show_in_menu' => true, // defaults to true so don't have to include
	);

	register_post_type('team', $args);
}
add_action( 'init', 'team_post_type');
