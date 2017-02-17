(function() {
    angular.module('components').service('notyService', [
        '$rootScope', 'notify',
    function(
        $rootScope, notify
    ) {
        var self = this;

        $rootScope.$on('noty', function(e, text) {
            self.notify({
                classes: 'alert-danger',
                message: text
            });
        });

        $rootScope.$on('noty::save', function(e, text) {
            self.notify({
                duration: 2000,
                classes: 'alert-success',
                message: 'Данные сохранены'
            });
        });
    }]);

    angular.module('components').run(['notyService', function() {}]);
})();
