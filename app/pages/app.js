(function() {
    angular.module('app', [
    //libs
        'ngSanitize',
        'ui.router',
    //components
        'directives',
        'modules',
        'services'
    ]);

    angular.module('app').run(['$http', function ($http) {
        $http.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' };
    }]);
})();
