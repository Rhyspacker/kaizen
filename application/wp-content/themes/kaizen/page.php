<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package kaizen
 */

get_header();
?>

<div class="page">
  <div class="container">

    <?php if ( is_front_page() ) : ?>
      <section class="section section--intro">
        <div class="section__block">
          <div class="row">
            <div class="col-md-6">
              <h2 class="display-1 text--uppercase text-lh-1-25 mb-2">We imagine,<span class="br" aria-hidden="true"></span>capture and <span class="br" aria-hidden="true"></span>create.</h2>
            </div>
            <div class="col-md-6">
              <p class="lead">
                <?php the_field("home_introduction"); ?>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div class="img-grid">
        <div class="img-grid__item">
          <img src="<?php the_field("home_image_1"); ?>" alt="">
        </div>
        <div class="img-grid__item">
          <img src="<?php the_field("home_image_2"); ?>" alt="">
        </div>
        <div class="img-grid__item">
          <img src="<?php the_field("home_image_3"); ?>" alt="">
        </div>
      </div>

      <section class="section section--header-link mw--800">
        <div class="section__header">
          <div class="section__header__title">
            <h2 class="h2 text--center-tablet-down mb-0">Our work</h2>
            <div class="section__header__link">
              <a href="<?php echo esc_url( get_permalink( get_page_by_title( 'Home' ) ) ); ?>work" class="btn">All work</a>
            </div>
          </div>
        </div>
        <div class="section__block">
          <?php

            // Query the DB for the latest 2 work items and output in loop
            $the_query = new WP_Query(array(
              'post_type' => 'work',
              'orderby'	=> 'date',
              'order'	=> 'DESC',
              'posts_per_page' => 2,
            ));

            if ( $the_query->have_posts() ) :

              while ( $the_query->have_posts() ) :
                $the_query->the_post();
                get_template_part( 'template-parts/work-item', get_post_type() );

              endwhile;

            endif;
          ?>
        </div>
      </section>
    <?php endif ?>

    <?php if (is_page( 'Contact' )) : ?>
      <h1 class="sr-only">Contact us</h1>

      <section class="section">
        <div class="section__block text--center">
          <p class="lead mb-0">We're based in Jersey, UK.</p>
          <p class="lead mb-2">Got a project we can&nbsp;help&nbsp;with?<span class="br"></span>Please get in touch.</p>
          <ul class="list--unstyled">
            <li class="mb-2"><a href="mailto:<?php the_field("contact_email") ?>" class="btn btn--lg"><?php the_field("contact_email") ?></a></li>
            <li><a href="tel:<?php the_field("contact_phone") ?>" class="btn btn--lg"><?php the_field("contact_phone") ?></a></li>
          </ul>
        </div>
      </section>

      <section class="section section--team">
        <div class="section__header text--center">
          <h2 class="h2">Our team</h2>
        </div>
        <div class="section__block text--center">
          <div class="team">

            <?php

              // Query the DB for team members and output in loop
              $the_query = new WP_Query(array(
                'post_type' => 'team',
                'orderby'	=> 'date',
                'order'	=> 'DESC',
              ));

              if ( $the_query->have_posts() ) :

                while ( $the_query->have_posts() ) :
                  $the_query->the_post();
                  get_template_part( 'template-parts/team-member', get_post_type() );

                endwhile;

              endif;
            ?>

          </div>
        </div>
      </section>
		<?php endif; ?>

  </div>
</div>


<?php
get_footer();
