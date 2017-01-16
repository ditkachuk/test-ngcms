(function() {
    angular.module('modules').service('notyService', ['$rootScope', function($rootScope) {
        var self = this;

        $.noty.defaults.theme = 'metroui';
        $.noty.defaults.type = 'error';

        $rootScope.$on('noty', function(e, data) {
            self.noty(data);
        });

        $rootScope.$on('noty::save', function(e, data) {
            self.noty({
                timeout: 2000,
                type: 'success',
                text: 'Данные сохранены'
            });
        });

        self.noty = function(settings) {
            noty(settings);
        };
    }]);

    angular.module('modules').run(['notyService', function() {}]);
})();
