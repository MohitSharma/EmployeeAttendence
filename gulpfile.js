var gulp = require('gulp'),
  gutil = require('gulp-util'),
  del = require('del'),
  webserver = require('gulp-webserver'),
  runSequence = require('run-sequence'),
    src = {};

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'build/*', '!build/.git'], {dot: true}));

gulp.task('js', function() {
  src.js = ['app/js/**/*'];
  return gulp.src(src.js)
      .pipe(gulp.dest('build/js'));
});

gulp.task('jsLibs', function() {
    src.jsLibs = ['node_modules/angular/*', 'node_modules/angular-animate/*', 'node_modules/angular-route/*', 'node_modules/angular-ui-bootstrap/*'];
    return gulp.src(src.jsLibs)
        .pipe(gulp.dest('build/js/lib/angular'));
});

gulp.task('images', function() {
    src.images = ['app/images/**/*'];
    return gulp.src(src.images)
        .pipe(gulp.dest('build/images'));
});

gulp.task('html', function() {
  src.html = ['app/*.html'];
  return gulp.src(src.html)
      .pipe(gulp.dest('build'));
});

gulp.task('views', function() {
  src.views = ['app/views/**/*'];
  return gulp.src(src.views)
      .pipe(gulp.dest('build/views'));
});

gulp.task('css', function() {
  src.css = ['app/css/*.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'];
  return gulp.src(src.css)
      .pipe(gulp.dest('build/css'))
});

gulp.task('fonts', function() {
    src.css = ['node_modules/bootstrap/dist/fonts/*'];
    return gulp.src(src.css)
        .pipe(gulp.dest('build/fonts'))
});

gulp.task('watch', function() {
  gulp.watch(src.js, ['js']);
  gulp.watch(src.css, ['css']);
  gulp.watch(src.html, ['html']);
  gulp.watch(src.views, ['views']);
});

gulp.task('webserver', function() {
  gulp.src('build/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['clean'], function(cb) {
    runSequence(['html', 'views', 'js', 'jsLibs', 'css', 'fonts', 'images', 'webserver', 'watch'], cb);
});
