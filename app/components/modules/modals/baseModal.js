(function() {
    // сервис для работы с модалом подтверждения
    angular.module('modules').service('baseModalService', ['$q', 'ModalService', function($q, ModalService) {
        var self = this;

        self.show = function(settings) {
            var def = $q.defer();

            ModalService.showModal(settings).then(function(modal) {
                var $modal = $(modal.element);
                $modal.show();
                $modal.css({opacity: 0});
                $modal.animate({opacity: 1});
                $('body').addClass('with-modal');

                modal.close.then(function(response) {
                    $('body').removeClass('with-modal');
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
