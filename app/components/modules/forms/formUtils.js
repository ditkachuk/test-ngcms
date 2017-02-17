(function() {
    // сервис для функций работы с формами
    angular.module('modules').service('formUtils', [function() {
        var self = this;

        self.check_forms_valid = function(scope, forms) {
            scope.showErrors = false;
            var invalid = false;

            if (!angular.isArray(forms)) {
                forms = [forms];
            }

            angular.forEach(forms, function(form, i) {
                if (form && form.$invalid) invalid = true;
            });

            if (invalid) scope.showErrors = true;
         
            return !invalid;
        };
    }]);
})();
