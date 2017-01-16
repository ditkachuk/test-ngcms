(function() {
    // сервис для работы с модалом подтверждения
    angular.module('modules').service('acceptModalService', ['$q', 'baseModalService', function($q, baseModalService) {
        var self = this;

        self.accept = function(message) {
            return baseModalService.show({
                templateUrl: '/components/modules/modals/accept/accept_modal.html',
                controller: 'acceptModalController',
                inputs: {
                    message: message
                }
            });
        };
    }]);

    angular.module('modules').controller('acceptModalController', [
        '$scope', 'close', 'message',
    function(
        $scope, close, message
    ) {
        $scope.message = message;

        $scope.accept = function() {
            close(true, 200);
        };

        $scope.cancel = function() {
            close(false, 200);
        };
    }]);
})();
