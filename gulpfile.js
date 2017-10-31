// plugins
const gulp     = require('gulp');
const minify   = require('gulp-minify');
const babel    = require('gulp-babel');
const concat   = require('gulp-concat');
const prettify = require('gulp-jsbeautifier');
const del      = require('del');

// compilation
gulp.task('scripts', () => {
  return gulp.src('src/jquery.timezz.js')
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('dist'));
});

// compilation to es6
gulp.task('es6', () => {
  return gulp.src('src/jquery.timezz.js')
    .pipe(concat('jquery.timezz-es2015.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(prettify({
      js: {
        indent_size: 2
      }
    }))
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('dist'));
});

// main task
gulp.task('default', ['build']);

// clean «dist» before build
gulp.task('clean', () => {
  return del.sync('dist');
});

// building
gulp.task('build', ['clean', 'scripts', 'es6']);
