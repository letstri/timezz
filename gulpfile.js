// Plugins
const gulp = require('gulp');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const del = require('del');

// Compilation
gulp.task('compile', () => {
  return gulp.src('src/timezz.js')
    .pipe(babel({
      presets: ['es2015', 'stage-0'],
    }))
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      preserveComments: 'some',
    }))
    .pipe(gulp.dest('dist'));
});

// main task
gulp.task('default', ['build']);

// clean «dist» before build
gulp.task('clean', () => del.sync('dist'));

// building
gulp.task('build', ['clean', 'compile']);
