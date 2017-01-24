'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var rimraf = require('rimraf');
var config = require('./config');

gulp.task('dev', ['clear'], function() {
    gulp.start('dev:watch');
});

    gulp.task('dev:watch', ['clear', 'assemble'], function() {
        gulp.watch(config.paths.js, ['js']);
        gulp.watch(config.paths.scss, ['scss']);
        gulp.watch(config.paths.jade, ['jade']);

        return gulp.src('dist')
            .pipe(webserver(config.webserver));
    });

    gulp.task('clear', function() {
        return rimraf.sync('dist');
    });
