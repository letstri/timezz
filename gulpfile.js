var gulp   = require('gulp'),
    minify = require('gulp-minify'),
    del    = require('del');

gulp.task('build', ['clean'], function() {
  return gulp.src('src/jquery.timezz.js')
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('clean', function() {
  return del.sync('dist')
});