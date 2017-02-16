// Инициализация модуля для хранения сервисов работы с сервером
(function() {
    angular.module('services', [
        //libs
        'LocalStorageModule'
    ]);

    angular.module('services').config([
        'localStorageServiceProvider',
        function(
            localStorageServiceProvider
        ) {
            localStorageServiceProvider.setPrefix('CMS');
        }
    ]);
})();
