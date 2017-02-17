'use strict';

var gulp = require('gulp');
var merge = require('gulp-merge');
var plumber = require('gulp-plumber');
var _if = require('gulp-if');
var filter = require('gulp-filter');
var replace = require('gulp-replace');
var uglify  = require('gulp-uglify');
var minify  = require('gulp-clean-css');
var templates  = require('gulp-angular-templatecache');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var bower = require('main-bower-files');
var config = require('./config');

gulp.task('assemble', ['assets', 'less', 'js', 'jade'], function() {
    if (config.production) return angularTemplates();
});

    gulp.task('less', function() {
        return gulp.src(config.paths.less)
            .pipe(_if(!config.production, plumber()))
                .pipe(concat('styles.less'))
                .pipe(less({plugins: [autoprefix]}))
                .pipe(_if(config.production, minify()))
            .pipe(gulp.dest('dist/styles'));
    });

    gulp.task('js', ['js::libs', 'js::libs_styles', 'js::libs_assets'], function() {
        return gulp.src(
                config.paths.js.concat(
                    [ './app/config.' + (config.production ? 'prod' : 'dev') + '.js']
                )
            )
            .pipe(_if(!config.production, plumber()))
                .pipe(concat('scripts.js'))
                .pipe(_if(config.production, uglify()))
            .pipe(gulp.dest('dist/js'));
    });

        gulp.task('js::libs', function() {
            return gulp.src(bower())
                .pipe(_if(!config.production, plumber()))
                .pipe(filter(config.filters.js))
                    .pipe(concat('libs.js'))
                    .pipe(_if(config.production, uglify()))
                .pipe(gulp.dest('dist/js'));
        });

        gulp.task('js::libs_styles', function() {
            return gulp.src(bower())
                .pipe(_if(!config.production, plumber()))
                .pipe(filter(config.filters.css))
                    .pipe(concat('libs.css'))
                    .pipe(_if(config.production, minify()))
                .pipe(gulp.dest('dist/styles'));
        });

        gulp.task('js::libs_assets', function() {
            return merge(
                gulp.src(bower())
                    .pipe(filter(config.filters.assets))
                    .pipe(gulp.dest('dist/styles')),
                gulp.src(bower())
                    .pipe(filter(config.filters.fonts))
                    .pipe(gulp.dest('dist/fonts'))
            );
        });

    gulp.task('jade', function() {
        return gulp.src(config.paths.jade)
            .pipe(_if(!config.production, plumber()))
                .pipe(jade({
                    pretty: true,
                    locals: {production: config.production}
                }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('assets', function() {
        gulp.src(['app/*.*', '!app/*.jade'])
            .pipe(gulp.dest('dist'));

        return gulp.src('app/assets/**/*')
            .pipe(gulp.dest('dist/assets'));
    });


    function angularTemplates() {
        return gulp.src(config.paths.templates)
            .pipe(templates())
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'));
    };
