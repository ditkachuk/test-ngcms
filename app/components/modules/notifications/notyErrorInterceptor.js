(function() {
    // Добавление обработки ошибок в запросы
    angular.module('modules').config([
        '$httpProvider',
    function (
        $httpProvider
    ) {
        var AuthenticationResponseInterceptor = function ($rootScope, $q) {
            var errorHandler = function (response) {
                if (!response.config.hideErrors) {
                    var error = (angular.isObject(response.data)) ? 'Ошибка запроса' : response.data;
                    var errorText = 'Ошибка ' + response.status + ' : ' + error;
                    if (!response.status) errorText = 'Нет ответа от сервера';

                    // Отправка сообщения в сервис noty
                    $rootScope.$emit('noty', {
                        text: errorText
                    });
                }

                return $q.reject(response);
            };

            return {
                response: function (response) {
                    if (response.config.method == 'POST' && !response.config.hideErrors) {
                        // Отправка сообщения в сервис noty
                        $rootScope.$emit('noty::save', true);
                    }
                    return response;
                },
                responseError: errorHandler
            };
        };

        AuthenticationResponseInterceptor.$inject = ['$rootScope', '$q'];

        $httpProvider.interceptors.push(AuthenticationResponseInterceptor);
    }]);
})();