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

// Main task
gulp.task('default', ['build']);

// Watch task
gulp.task('watch', () => {
  gulp.watch('src/timezz.js', ['build']);
});

// Clean 'dist' before build
gulp.task('clean', () => del.sync('dist'));

// building
gulp.task('build', ['clean', 'compile']);
