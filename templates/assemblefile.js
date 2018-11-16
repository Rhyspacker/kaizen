var assemble = require('assemble');

// Automated Plugins (gulp)
//
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

// Manual plugins (non gulp)
//
var browserSync = require('browser-sync').create();
var del = require('del');
var watch = require('base-watch');

// Set up app
//
var app = assemble();
var config = require('./config.json');
var project = config.project;

// Setup watch
//
app.use(watch());

// Clean
//
app.task('clean', function() {
  return del('dist/*');
});

// JS
//
app.task('js', function() {

  return app.src('src/js/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.include())
    .pipe(plugins.rename({prefix: project.shortname + '.'}))
    .pipe(app.dest(config.dest.js))
    .pipe(browserSync.stream());
});

// SASS
//
app.task('sass', function() {

  return app.src('src/css/sass/*.scss')
    .pipe(plugins.sass({ outputStyle: 'expanded' }).on('error', plugins.sass.logError))
    .pipe(plugins.rename({prefix: project.shortname + '.'}))
    .pipe(plugins.autoprefixer({
      browsers: ['> 1%', 'last 3 versions'],
      cascade: false
    }))
    .pipe(app.dest(config.dest.css))
    .pipe(browserSync.stream());
});

// HTML
//
app.task('html', function() {

	handlebars = require('handlebars');
	helpers = require('handlebars-helpers')({
	  handlebars: handlebars
	});

	app.partials(['src/_components/**/*.hbs']);
  app.layouts('src/_layouts/*.hbs');
  app.pages('src/pages/*.hbs');
  app.data({project: project});

  return app.toStream('pages', {layout: 'default'})
    .pipe(app.renderFile())
    .pipe(plugins.extname())
    .pipe(app.dest('dist'))
    .pipe(browserSync.reload({ stream: true }));
});

// IMAGES
//
app.task('images', function() {

  return app.src('src/img/**')
    .pipe(app.dest(config.dest.img))
});

// FILES
//
app.task('files', function() {

  return app.src('src/files/**')
    .pipe(app.dest(config.dest.files))
});

// SERVER
//
app.task('server', function() {

    browserSync.init({
        server: './dist',
        open: false
    });

    app.watch(['src/img/**'], ['images']);
    app.watch(['src/css/**/*.scss','src/_components/**/*.scss'], ['sass']);
    app.watch(['src/js/**/*.js','src/_components/**/*.js'], ['js']);
    app.watch(['src/_layouts/*.hbs','src/pages/*.hbs','src/_components/**/*.hbs'], ['html']);
    app.watch(['src/files'], ['files']).on('change', browserSync.reload);
});


// Default task
//
app.task('default', ['clean', 'html', 'sass', 'js', 'images', 'files', 'server']);

// Build task
//
app.task('build', ['clean', 'html', 'sass', 'js', 'images', 'files',], function() {

  app.src(config.dest.css+'/*.css')
    .pipe(plugins.cleanCss())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(app.dest(config.dest.css))

  app.src(config.dest.js+'/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(app.dest(config.dest.js))

  app.src(config.dest.img+'/**')
    .pipe(app.dest(config.dest.img));
});

// expose to assemble's CLI
//
module.exports = app;
