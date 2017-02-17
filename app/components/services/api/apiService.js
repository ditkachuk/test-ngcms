(function() {
    // сервис для работы с api
    angular.module('services').service('apiService', [
        '$http', '$q',
    function(
        $http, $q
    ) {
        var self = this;

        self.login = function() {
            var def = $q.defer();
            def.reject({});
            return def.promise;
        };

        self.account = function() {
            var def = $q.defer();
            def.reject({});
            return def.promise;
        };
    }]);
})();
