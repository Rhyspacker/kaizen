<?php

$team_member_image = get_field("team_member_image");

?>

<div class="team__member">
	<div class="team__member__img">
		<img src="<?php echo $team_member_image['sizes']['team_member'] ?>" alt="Photo of <?php the_field("team_member_name") ?>" class="img-fluid">
	</div>
	<div class="team__member__content">
		<h3 class="team__member__name">
			<?php the_field("team_member_name") ?>
		</h3>
		<p class="team__member__role">
			<?php the_field("team_member_role") ?>
		</p>
		<?php if ( get_field('team_member_linkedin') || get_field('team_member_twitter') ) : ?>
		<p class="team__member__social">
			<?php if ( get_field('team_member_linkedin') ) : ?>
				<a href="<?php the_field('team_member_linkedin') ?>" class="btn">LinkedIn</a>
			<?php endif; ?>
			<?php if ( get_field('team_member_twitter') ) : ?>
				<a href="<?php the_field('team_member_twitter') ?>" class="btn">Twitter</a>
			<?php endif; ?>
			<?php if ( get_field('team_member_instagram') ) : ?>
				<a href="<?php the_field('team_member_instagram') ?>" class="btn">Instagram</a>
			<?php endif; ?>
		</p>
		<?php endif; ?>
	</div>
</div>
