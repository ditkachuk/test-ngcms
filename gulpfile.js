var gulp = require('gulp');
var fs = require('fs');

// gulp dir js files
fs.readdirSync('./gulp').filter(function(file) {
    return (/\.(js)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});

gulp.task('default', ['dev']);
