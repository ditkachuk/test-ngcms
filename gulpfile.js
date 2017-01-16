var gulp = require('gulp');
var webserver = require('gulp-webserver');
var rimraf = require('rimraf');

var jade = require('gulp-jade');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var webserverConfig = {
    "https": false,
    "hostname": "localhost",
    "host": "127.0.0.1",
    "port": 9003,
    "open": false,
    "livereload": true
};

var pathsCfg = {
    jade: 'app/**/*.jade',
    scss: [
        'app/styles/style.scss',
        'app/styles/**/*.scss',
    ],
    js: [
        'app/pages/*.js',
        'app/pages/**/*.js',
        'app/components/*.js',
        'app/components/**/*.js'
    ],
    libs: [
        'app/libs/jquery/*.js', // for file order
        'app/libs/bootstrap/*.js',
        'app/libs/**/*.js',
    ],
    libs_styles: 'app/libs/**/*.css',
    libs_assets: [
        'app/libs/bootstrap/**/*',
        '!app/libs/**/*.js',
        '!app/libs/**/*.css',
    ]
};

gulp.task('default', ['dev']);
gulp.task('build', ['distbuild']);

gulp.task('distbuild', ['assemble', 'angular-templates'], function() {
    return gulp.src('dist/**/*')
        .pipe(gulp.dest('build'));
});

gulp.task('dev', ['assemble'], function() {
    gulp.watch(pathsCfg.js, ['js']);
    gulp.watch(pathsCfg.scss, ['scss']);
    gulp.watch(pathsCfg.jade, ['jade']);

    return gulp.src('dist')
        .pipe(webserver(webserverConfig));
});

    gulp.task('assemble', ['assets', 'scss', 'js', 'jade'], function() {});

        gulp.task('scss', function() {
            return gulp.src(pathsCfg.scss)
                .pipe(concat('styles.scss'))
                .pipe(sass({ outputStyle:    'compressed'})
                .on('error', sass.logError))
                    .pipe(gulp.dest('dist/styles'));
        });

        gulp.task('js', ['js::libs', 'js::libs_styles', 'js::libs_assets'], function() {
            return gulp.src(pathsCfg.js)
                .pipe(concat('scripts.js'))
                    .pipe(gulp.dest('dist/js'));
        });

            gulp.task('js::libs', function() {
                return gulp.src(pathsCfg.libs)
                    .pipe(concat('libs.js'))
                        .pipe(gulp.dest('dist/js'));
            });

            gulp.task('js::libs_styles', function() {
                return gulp.src(pathsCfg.libs_styles)
                    .pipe(concat('libs.css'))
                        .pipe(gulp.dest('dist/styles'));
            });

            gulp.task('js::libs_assets', function() {
                return gulp.src(pathsCfg.libs_assets)
                    .pipe(gulp.dest('dist/styles'));
            });

        gulp.task('jade', function() {
            return gulp.src(pathsCfg.jade)
                .pipe(jade({pretty: true}))
                    .pipe(gulp.dest('dist'));
        });

        gulp.task('assets', ['clear'], function() {
            gulp.src(['app/*.*', '!app/*.jade'])
                .pipe(gulp.dest('dist'));

            return gulp.src('app/assets/**/*')
                .pipe(gulp.dest('dist/assets'));
        });

    gulp.task('clear', function() {
        return rimraf.sync('dist');
    });

    gulp.task('angular-templates', function() {
        return;
    });

gulp.task('test', function() {
    return gulp.src('build')
        .pipe(webserver(webserverConfig));
});
