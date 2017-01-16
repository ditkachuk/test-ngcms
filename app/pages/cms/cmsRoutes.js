(function() {
    angular.module('app').config([
        '$stateProvider', '$urlRouterProvider', 
    function (
        $stateProvider, $urlRouterProvider
    ) {
        $stateProvider.state('pages.cms.users', {
            url: '/',
            templateUrl: '/pages/users/list.html',
            controller: 'usersController',
            controllerAs: 'users'
        });
    }]);
})();
