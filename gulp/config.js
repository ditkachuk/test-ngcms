'use strict';

var pathsCfg = {
    jade: 'app/**/*.jade',
    less: [
        'app/styles/bootstrap.less',
        'app/styles/style.less',
        'app/styles/**/*.less',
    ],
    js: [
        'app/pages/*.js',
        'app/pages/**/*.js',
        'app/components/*.js',
        'app/components/**/*.js'
    ],
    templates: [
        'dist/**/*.html',
        '!dist/index.html'
    ]
};

var filtersCfg = {
    js: '**/*.js',
    css: '**/*.css',
    fonts: [
        '**/*.{eot,otf,svg,ttf,woff,woff2}',
        '!**/*.js',
        '!**/*.css'
    ],
    assets: [
        '**/*',
        '!**/*.{eot,otf,svg,ttf,woff,woff2}',
        '!**/*.js',
        '!**/*.css'
    ]
};

var webserverConfig = {
    "https": false,
    "hostname": "localhost",
    "host": "127.0.0.1",
    "port": 9003,
    "open": false,
    "livereload": true
};

module.exports = {
    webserver: webserverConfig,
    filters: filtersCfg,
    paths: pathsCfg,

    production: true
};
