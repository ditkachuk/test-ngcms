'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var rimraf = require('rimraf');
var filter = require('gulp-filter');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var config = require('./config');

gulp.task('build', ['dist:build'], function() {
    var manifest = gulp.src('build/rev-manifest.json');

    return gulp.src('dist/index.html')
        .pipe(revReplace({
            manifest: manifest,
            replaceInExtensions: ['.html']
        }))
        .pipe(gulp.dest('build'));
});

    gulp.task('dist:build', ['clear:build', 'assemble'], function() {
        var revFilter = filter([config.filters.js, config.filters.css], {restore: true});
        var cssFilter = filter(config.filters.css, {restore: true});
        return gulp.src('dist/**/*')
            .pipe(gulp.dest('build'))
                .pipe(revFilter)
                    .pipe(rev())
                .pipe(revFilter.restore)
                .pipe(gulp.dest('build'))
                .pipe(rev.manifest())
                .pipe(gulp.dest('build'));
    });

        gulp.task('clear:build', function() {
            return rimraf.sync('build');
        });

gulp.task('build:server', ['build'], function() {
    return gulp.src('build')
        .pipe(webserver(config.webserver));
});

gulp.task('build:heroku', ['build'], function() {
    var connect = require('gulp-connect');
    
    return connect.server({
        root: './build',
        port: process.env.PORT || 1000,
        liverreload: false
    });
});
