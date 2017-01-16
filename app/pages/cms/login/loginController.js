(function() {
    // контроллер формы логина
    angular.module('app').controller('loginController', [
        '$scope', 'accountService', 'formUtils',
    function(
        $scope, accountService, formUtils
    ) {
        var self = this;
        initData();
        self.loading = [];

        self.submit = function(form) {
            self.requestError = '';
            var isValid = formUtils.check_forms_valid(self, form);
            if (!isValid) return;

            var promise = accountService.login(self.info).catch(function(error) {
                if (error.status) self.requestError = 'Имя или пароль указаны неверно';
            });

            self.loading.push(promise);
        };

        function initData() {
            self.info = {
                type : "loginpass",
                agent: true,
                login : "",
                password : ""
            };
        }
    }]);
})();