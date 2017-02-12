'use strict';

var gulp = require('gulp');
var filter = require('gulp-filter');
var replace = require('gulp-replace');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var bower = require('main-bower-files');
var config = require('./config');

gulp.task('assemble', ['assets', 'less', 'js', 'jade', 'angular-templates'], function() {});

    gulp.task('less', function() {
        return gulp.src(config.paths.less)
            .pipe(concat('styles.less'))
            .pipe(less({plugins: [autoprefix]}))
                .pipe(gulp.dest('dist/styles'));
    });

    gulp.task('js', ['js::libs', 'js::libs_styles', 'js::libs_assets'], function() {
        return gulp.src(config.paths.js)
            .pipe(concat('scripts.js'))
                .pipe(gulp.dest('dist/js'));
    });

        gulp.task('js::libs', function() {
            return gulp.src(bower())
                .pipe(filter(config.filters.js))
                .pipe(concat('libs.js'))
                    .pipe(gulp.dest('dist/js'));
        });

        gulp.task('js::libs_styles', function() {
            return gulp.src(bower())
                .pipe(filter(config.filters.css))
                .pipe(concat('libs.css'))
                    .pipe(gulp.dest('dist/styles'));
        });

        gulp.task('js::libs_assets', function() {
            gulp.src(bower())
                .pipe(filter(config.filters.assets))
                .pipe(gulp.dest('dist/styles'));

            return gulp.src(bower())
                .pipe(filter(config.filters.fonts))
                .pipe(gulp.dest('dist/fonts'));
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
