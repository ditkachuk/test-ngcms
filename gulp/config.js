'use strict';

(function() {
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
        ]
    };

    var filters = {
        js: '**/*.js',
        css: '**/*.css',
        fonts: [
            '**/*.{eot,otf,svg,ttf,woff,woff2}',
            '!**/*.js',
            '!**/*.css',
            '!**/*.less'
        ],
        assets: [
            '**/*',
            '!**/*.{eot,otf,svg,ttf,woff,woff2}',
            '!**/*.js',
            '!**/*.css',
            '!**/*.less'
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

    module.exports.webserver = webserverConfig;
    module.exports.filters = filters;
    module.exports.paths = pathsCfg;
})();
