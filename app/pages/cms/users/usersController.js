(function() {
    angular.module('app').controller('usersController', [
            'userService', 'acceptModalService', 'accountService',
        function (
            userService, acceptModalService, accountService
        ) {
            var self = this;
            self.loading = [];

            self.roles = userService.userRoles;

            self.load = function() {
                var load = userService.list().then(function(response) {
                    self.list = response.data;
                });

                self.loading.push(load);
            };

            self.save = function(user) {
                var load = userService.save(user);
                self.loading.push(load);
            };

            self.delete = function(user) {
                acceptModalService.accept('Удалить пользователя ' + user.login + '?').then(function() {
                    var load = userService.delete(user);
                    self.loading.push(load);
                });
            };

            self.load();
        }
    ]);
})();
