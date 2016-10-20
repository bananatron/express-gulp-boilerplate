var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer'); //https://github.com/postcss/autoprefixer#options
var minify = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');

// Server start
gulp.task('default', function () {
  gulp.watch(['frontend/styles/*', 'frontend/scss/vendor/*'], ['styles']);

  nodemon({
    script: 'bin/www'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})

// Style compilation and minification
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
    .pipe(minify({compatibility: 'ie8'})) // Minify
    .pipe(sourcemaps.write('/')) // Output sourcemaps
    .pipe(gulp.dest('public/stylesheets/')); // Output file
});