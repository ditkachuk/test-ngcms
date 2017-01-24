'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var config = require('./config');

gulp.task('assemble', ['assets', 'scss', 'js', 'jade', 'angular-templates'], function() {});

    gulp.task('scss', function() {
        return gulp.src(config.paths.scss)
            .pipe(concat('styles.scss'))
            .pipe(sass({ outputStyle:    'compressed'})
            .on('error', sass.logError))
                .pipe(gulp.dest('dist/styles'));
    });

    gulp.task('js', ['js::libs', 'js::libs_styles', 'js::libs_assets'], function() {
        return gulp.src(config.paths.js)
            .pipe(concat('scripts.js'))
                .pipe(gulp.dest('dist/js'));
    });

        gulp.task('js::libs', function() {
            return gulp.src(config.paths.libs)
                .pipe(concat('libs.js'))
                    .pipe(gulp.dest('dist/js'));
        });

        gulp.task('js::libs_styles', function() {
            return gulp.src(config.paths.libs_styles)
                .pipe(concat('libs.css'))
                    .pipe(gulp.dest('dist/styles'));
        });

        gulp.task('js::libs_assets', function() {
            return gulp.src(config.paths.libs_assets)
                .pipe(gulp.dest('dist/styles'));
        });

    gulp.task('jade', function() {
        return gulp.src(config.paths.jade)
            .pipe(jade({pretty: true}))
                .pipe(gulp.dest('dist'));
    });

    gulp.task('assets', function() {
        gulp.src(['app/*.*', '!app/*.jade'])
            .pipe(gulp.dest('dist'));

        return gulp.src('app/assets/**/*')
            .pipe(gulp.dest('dist/assets'));
    });


    gulp.task('angular-templates', function() {
        return;
    });
