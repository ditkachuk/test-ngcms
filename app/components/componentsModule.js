// Инициализация модуля для хранения компонентов
(function() {
    angular.module('components', [
        //libs
        'angularModalService',
        'cgNotify',
        'LocalStorageModule'
    ]);

    angular.module('components').config([
        'localStorageServiceProvider',
        function(
            localStorageServiceProvider
        ) {
            localStorageServiceProvider.setPrefix('CMS');
        }
    ]);
})();
