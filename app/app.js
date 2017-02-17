(function() {
    angular.module('app', [
    //libs
        'ui.router',
    //components
        'components',
        'templates'
    ]);

    angular.module('app').config([
        '$compileProvider',
        '$httpProvider',
    function(
        $compileProvider,
        $httpProvider
    ) {
        $compileProvider.debugInfoEnabled(appConfig.debugInfoEnabled);
        $httpProvider.useApplyAsync(true);
    }]);

    angular.module('app').run(['$http', function ($http) {
        $http.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' };
    }]);
})();