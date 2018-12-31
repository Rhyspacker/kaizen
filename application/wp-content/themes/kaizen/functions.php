<?php
/**
 * kaizen functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package kaizen
 */

	// Remove Emojis
	remove_action('wp_head', 'print_emoji_detection_script', 7);
	remove_action('wp_print_styles', 'print_emoji_styles');

	// WP Head Cleanup
	function my_head_cleanup() {
		// Category Feeds
		remove_action( 'wp_head', 'feed_links_extra', 3 );

		// Post and Comment Feeds
		remove_action( 'wp_head', 'feed_links', 2 );

		// EditURI link
		remove_action( 'wp_head','rsd_link' );

		// Windows Live Writer
		remove_action( 'wp_head','wlwmanifest_link' );

		// index link
		remove_action( 'wp_head','index_rel_link' );

		// previous link
		remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );

		// start link
		remove_action( 'wp_head', 'start_post_rel_link', 10,0 );

		// Links for Adjacent Posts
		remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );

		// WP version
		remove_action( 'wp_head', 'wp_generator' );
	};
	add_action('init', 'my_head_cleanup');

	// Remove comment support
	//
	// - Removes from admin menu
	add_action( 'admin_menu', 'my_remove_admin_menus' );
	function my_remove_admin_menus() {
	    remove_menu_page( 'edit-comments.php' );
	}
	// - Removes from post and pages
	add_action('init', 'remove_comment_support', 100);

	function remove_comment_support() {
	    remove_post_type_support( 'post', 'comments' );
	    remove_post_type_support( 'page', 'comments' );
	}
	// - Removes from admin bar
	function kaizen_admin_bar_render() {
	    global $wp_admin_bar;
	    $wp_admin_bar->remove_menu('comments');
	}
	add_action( 'wp_before_admin_bar_render', 'kaizen_admin_bar_render' );

/*
// ========================================= //
	Custom Functions
// ========================================= //
*/

// Remove Posts from admin menu
add_action('admin_menu', function() {
    remove_menu_page('edit.php');
});

function remove_admin_bar_links() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('new-post');
    $wp_admin_bar->remove_menu('new-page');
    $wp_admin_bar->remove_menu('new-cpt');
}
add_action( 'wp_before_admin_bar_render', 'remove_admin_bar_links' );


// turn off pagination for the archive page
add_action('parse_query', function($query) {
  if (is_post_type_archive('work')) {
    $query->set('nopaging', 1);
  }
});

// Create custom site identity fields for social

function kaizen_new_customiser_settings($wp_customize) {

	// Remove unneccessary sections from customiser
	$wp_customize->remove_section( 'title_tagline');
  $wp_customize->remove_section( 'static_front_page');
  $wp_customize->remove_section( 'custom_css');

	$wp_customize->add_section( 'social_links', array(
    'title' => 'Social Links',
    'priority' => 35,
  ));

	$wp_customize->add_setting('facebook_social');
	$wp_customize->add_control(
	    new WP_Customize_Control(
	        $wp_customize,
	        'facebook_social',
	        array(
	            'label' => 'Facebook Social Link',
							'section' => 'social_links',
	            'settings' => 'facebook_social',
	            'type' => 'url',
	        )
	    )
	);

	$wp_customize->add_setting('instagram_social');
	$wp_customize->add_control(
	    new WP_Customize_Control(
	        $wp_customize,
	        'instagram_social',
	        array(
	            'label' => 'Instagram Social Link',
							'section' => 'social_links',
	            'settings' => 'instagram_social',
	            'type' => 'url',
	        )
	    )
	);

	$wp_customize->add_setting('vimeo_social');
	$wp_customize->add_control(
	    new WP_Customize_Control(
	        $wp_customize,
	        'vimeo_social',
	        array(
	            'label' => 'Vimeo Social Link',
							'section' => 'social_links',
	            'settings' => 'vimeo_social',
	            'type' => 'url',
	        )
	    )
	);
}

add_action('customize_register', 'kaizen_new_customiser_settings', 50);

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
