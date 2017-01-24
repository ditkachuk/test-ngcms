'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var rimraf = require('rimraf');
var config = require('./config');

gulp.task('build', ['clear:build'], function() {
    gulp.start('dist:build');
});

    gulp.task('dist:build', ['assemble'], function() {
        return gulp.src('dist/**/*')
            .pipe(gulp.dest('build'));
    });

    gulp.task('clear:build', function() {
        return rimraf.sync('build');
    });

gulp.task('build:test', function() {
    return gulp.src('build')
        .pipe(webserver(config.webserver));
});
