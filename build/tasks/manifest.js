// -------------------------------------------
//  Generate manifest
// -------------------------------------------

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('manifest', function() {
  var basePath = './dist/';
  return gulp.src([
    basePath +  '**/*',
    '!' + basePath + 'manifest.appcache',
    '!' + basePath + '*.html',
    '!' + basePath + '**/*.mp3'
  ]).pipe($.manifest({
      preferOnline: true,
      network: ['*'],
      filename: 'manifest.appcache',
      timestamp: true
    }))
    .pipe(gulp.dest(basePath));
});

gulp.task('webAppManifest', function() {
  return gulp.src('./src/resources/manifest.json')
    .pipe(gulp.dest('./dist/assets'));
});
