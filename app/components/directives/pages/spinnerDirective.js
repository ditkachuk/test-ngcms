// Директива для добавления индикатора загрузки на рядом с элементом на основе переданного массива промисов
(function() {
    angular.module('directives').directive('spinner', ['$q', function($q) {
        return {
            restrict: 'A',
            link: function ($scope, elm, attrs) {
                var $elm = angular.element(elm).addClass('spinner-cont');
                var watcher = $scope.$watchCollection(attrs.spinner, function(promises) {
                    if (!promises || !angular.isArray(promises) || promises.length == 0) return;
                    $elm.append($('<div class="spinner-load"></div>'));
                    var spinner = $elm.find('.spinner-load');

                    $q.all(promises).finally(function() {
                        spinner.animate({
                            'opacity': '0'
                        }, {
                            'always': function() {
                                spinner.remove();
                            }
                        });
                    });
                });

                $scope.$on('$destroy', function() {
                    watcher();
                });
            }
        };
    }]);
})();
