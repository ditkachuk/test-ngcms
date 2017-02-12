'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var rimraf = require('rimraf');
var config = require('./config');

var lesshint = require('gulp-lesshint');

gulp.task('dev', ['clear', 'lint'], function() {
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

gulp.task('lint', () => {
    return gulp.src(config.paths.less)
        .pipe(lesshint({}))
        .pipe(lesshint.reporter())
        .pipe(lesshint.failOnError());
});

gulp.task('default', ['dev']);
