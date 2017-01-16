(function() {
    angular.module('app').config([
        '$stateProvider', '$urlRouterProvider', 
    function (
        $stateProvider, $urlRouterProvider
    ) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('pages', {
            url: '',
            abstract: true,
            templateUrl: '/pages/template.html'
        });

        $stateProvider.state('pages.cms', {
            url: '/cms',
            templateUrl: '/pages/cms/template.html'
        });

        $stateProvider.state('pages.public', {
            url: '/',
            templateUrl: '/pages/public/template.html'
        });

        $stateProvider.state('pages.guest', {
            url: '/guest',
            templateUrl: '/pages/guest/template.html'
        });
    }]);
})();
