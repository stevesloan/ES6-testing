// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
});

// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(['src/js/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('all.min.js'))
    //.pipe(babel())
    //.pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Concatenate & Minify JS
gulp.task('vendors', function() {
  return gulp.src(['src/vendor/*.js'])
    .pipe(concat('all.min.js'))
    //.pipe(gulp.dest('dist/js'))
    //.pipe(rename('all.min.js'))
    //.pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('move', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['babel', 'scripts']);
  gulp.watch('scss/*.scss', ['sass']);
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './dist',
  });

  gulp.watch('src/vendors/*.js', ['vendors']);
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/*.html', ['move']);
});

// Default Task
gulp.task('default', ['sass', 'scripts', 'vendors', 'serve']);
