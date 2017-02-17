(function() {
    // контроллер авторизации приложения
    angular.module('components').controller('authController', [
        '$rootScope', 'accountService', '$state',
    function(
        $rootScope, accountService, $state
    ) {
        var self = this;
        self.loading = [];
        self.user = accountService.user;

        $rootScope.$on('user:login', function() {
            self.user = accountService.user;
            $state.reload();
        });

        $rootScope.$on('user:logout', function() {
            self.user = null;
            $state.reload();
        });

        self.logout = function() {
            accountService.logout();
        };
    }]);
})();
