// Инициализация модуля для хранения сервисов работы с сервером
(function() {
    angular.module('services', [
        //libs
        'LocalStorageModule'
    ]);

    angular.module('services').config(function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('CMS');
    });
})();
