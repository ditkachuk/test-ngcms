(function() {
    // сервис для работы с апи авторизации kg_api.account
    angular.module('services').service('accountService', [
        '$http', '$q', 'apiService', 'localStorageService', '$rootScope',
    function(
        $http, $q, apiService, localStorageService, $rootScope
    ) {
        var self = this;
        var api = apiService;
        self.session = {};
        self.user = false;

        function saveSession(info, session_id, rights) {
            var session_data = JSON.stringify({
                login: info.login,
                agent: info.agent,
                rights: rights,
                session_id: session_id
            });

            localStorageService.set('api_session', session_data);
        }

        function clearSession(info, session_id) {
            localStorageService.remove('api_session');
            self.session = {};
            self.user = false;
        }

        function loadSession() {
            var data = localStorageService.get('api_session');

            if (data) {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    data = {};
                }

                return {
                    login: data.login,
                    agent: data.agent,
                    rights: data.rights,
                    session_id: data.session_id
                };
            } else return {};
        }

        self.login = function(info) {
            return api.login(info).then(function(response) {
                saveSession(info, response.data.session_id, response.data.rights);
                self.getPromise = init();
                $rootScope.$emit('user:login');
            });
        };

        self.logout = function() {
            clearSession();
            $rootScope.$emit('user:logout');
        };

        // load user profile
        self.load_account = function() {
            var def = $q.defer();
            var userPromise = api.account();
            
            if (userPromise) {
                self.user = self.session.login;
                userPromise.then(function(response) {
                    def.resolve(response);
                }, function(error) {
                    def.reject(error);
                });
            } else def.reject({});

            return def.promise;
        };

        // get user profile with no loading
        self.get_account = function() {
            return $q.when(self.getPromise);
        };

        // init service
        function init() {
            self.session = loadSession();
            var checkPromise = self.load_account();

            checkPromise.catch(function(error) {
                if (error.status != 0 && error.status != -1) self.logout();
            });

            return checkPromise;
        }

        // init no load account get
        self.getPromise = init();
    }]);
})();
