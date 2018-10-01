/**
 * Plugins
 */
// main plugins
const gulp = require('gulp');
const del = require('del');
const notify = require('gulp-notify');
const eslint = require('gulp-eslint');

// JS plugins
const minifyJS = require('gulp-minify');
const babel = require('gulp-babel');

/**
 * Config
 */
const paths = {
  dist: 'dist',
  src: {
    js: 'src/**/*.js',
  },
};

/**
 * Functions
 */
gulp.task('lint', () => {
  return gulp.src(paths.src.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('scripts', ['lint'], () => {
  return gulp.src(paths.src.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel()
      .on('error', notify.onError({
        message: '<%= error.message %>',
        title: 'Babel Error!',
      })))
    .pipe(minifyJS({
      ext: {
        min: '.min.js',
      },
      noSource: true,
    }))
    .pipe(gulp.dest(paths.dist));
});

// Default task
gulp.task('default', ['scripts'], () => {
  gulp.watch(paths.src.js, ['lint', 'scripts']);
});

gulp.task('del', () => {
  return del.sync(paths.dist);
});
