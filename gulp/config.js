'use strict';

(function() {
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

    var webserverConfig = {
        "https": false,
        "hostname": "localhost",
        "host": "127.0.0.1",
        "port": 9003,
        "open": false,
        "livereload": true
    };

    module.exports.webserver = webserverConfig;
    module.exports.paths = pathsCfg;
})();
