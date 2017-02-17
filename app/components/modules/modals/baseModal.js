(function() {
    // сервис для работы с модалом подтверждения
    angular.module('components').service('baseModalService', [
        '$q', 'ModalService', '$document',
    function(
        $q, ModalService, $document
    ) {
        var self = this;
        var body = angular.element($document).find('body');

        self.show = function(settings) {
            var def = $q.defer();

            ModalService.showModal(settings).then(function(modal) {
                var $modal = angular.element(modal.element);
                body.addClass('with-modal');

                modal.close.then(function(response) {
                    body.removeClass('with-modal');
                    $modal.remove();

                    if (response)
                        def.resolve(response);
                    else
                        def.reject(response);
                });
            });

            return def.promise;
        };
    }]);
})();
