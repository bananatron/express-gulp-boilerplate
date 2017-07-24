var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer'); //https://github.com/postcss/autoprefixer#options
var minify = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');

// var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var babelify = require('babelify');
var rename = require('gulp-rename');

// Server start
gulp.task('default', function () {

  gulp.start('js');
  gulp.watch(['frontend/js/**/*'], ['js']);

  gulp.start('styles');
  gulp.watch(['frontend/styles/*', 'frontend/styles/vendor/**/*'], ['styles']);

  nodemon({
    // verbose: true,
    script: 'bin/www',
    ext: 'js html',
    ignore: ['frontend/**/*', 'gulpfile.js', 'public/**/*'],
    env: { 'NODE_ENV': 'development' }
  })
})

// CSS
gulp.task('styles', function() {
  return gulp.src([
      'frontend/styles/*',
      'frontend/styles/vendor/*'
    ])
    .pipe(sourcemaps.init()) // Init sourcemaps
    .pipe(sass().on('error', sass.logError)) // Parse Sass
    .pipe(concat('styles.min.css')) // Combine all Sass files into one
    .pipe(autoprefixer({ // Add necessary vendor prefixes
      browsers: ['last 4 versions', '> 10%'],
      remove: false // Don't strip old prefixes
    }))
    .pipe(minify({compatibility: 'ie9'})) // Minify
    .pipe(sourcemaps.write('/')) // Output sourcemaps
    .pipe(gulp.dest('public/stylesheets/')); // Output file
});

// JS
gulp.task('js', function() {
  return gulp.src('frontend/js/entry.js')
    .pipe(sourcemaps.init()) // Init sourcemaps
      .pipe(browserify({
        insertGlobals : true,
        transform: ['babelify'],
        debug : true //TODO change for production
      }))

      .pipe(rename('bundle.js'))
    .pipe(sourcemaps.write('/')) // Output sourcemaps
    .pipe(gulp.dest('public/js'))
});
