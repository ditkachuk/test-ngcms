(function() {
    // сервис для функций работы с формами
    angular.module('modules').service('formUtils', [function() {
        var self = this;

        self.check_forms_valid = function(scope, forms) {
            scope.showErrors = false;
            var invalid = false;

            if (!$.isArray(forms)) {
                forms = [forms];
            }

            $.each(forms, function(i, form) {
                if (form && form.$invalid) invalid = true;
            });

            if (invalid) scope.showErrors = true;
         
            return !invalid;
        };
    }]);
})();
