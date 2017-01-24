// Директива для валидации модели поля ввода по заданому типу
(function() {
    var validate = function (value, validation) {
        return !value || validation;
    };

    var isValidType = {
        name: function(value) {
            return validate(value, value && value.match("^[а-яА-ЯёЁa-zA-Z\-]+$"));
        },
        number: function(value) {
            var numbers = /^\d+$/;
            return validate(value, value && value.toString().match(numbers));
        },
        number_interval: function(value, attrs) {
            var min = attrs.numberMin;
            var max = attrs.numberMax;

            var isAfterMin = (min) ? parseInt(value) >= parseInt(min) : true;
            var isBeforeMax = (max) ? parseInt(value) <= parseInt(max) : true;

            return validate(value, (value || value == '0') && isBeforeMax && isAfterMin);
        },
        date: function(value) {
            return validate(value, value && Date.parse(value));
        },
        date_interval: function(value, attrs, scope) {
            var date = moment(Date.parse(value));
            var min = moment(Date.parse(attrs.dateMin));
            var max = moment(Date.parse(attrs.dateMax));

            var isBeforeMin = date.isBefore(min, 'day');
            var isAfterMax = date.isAfter(max, 'day');

            return validate(value, value && !isBeforeMin && !isAfterMax);
        },
        email: function(value) {
            return validate(value, value && value.match("^([a-zA-Zа-яА-ЯёЁ0-9_\.-])+@[a-zA-Zа-яА-ЯёЁ0-9-]+\.([a-zA-Zа-яА-ЯёЁ]{2,4}\.)?[a-zA-Zа-яА-ЯёЁ]{2,4}$"));
        },
        phone: function(value) {
            var regex = /^\+[0-9]([ .-]?){1}\(?([0-9]{3})\)\1?([0-9]{3})\1([0-9]{2}\1[0-9]{2})(\1[0-9]+)?/;
            return validate(value, value && value.match(regex)); 
        },
        exist: function() { return true; }
    };

    angular.module('directives').directive('formatValidator', ['$timeout', function ($timeout) {
        return {
            require:'ngModel',
            scope: {
                linked: '=validatorLinked'
            },
            link: function (scope, elm, attrs, ngModelCtrl) {
                var validators = attrs.formatValidator.split(',');

                $.each(validators, function(index, validatorType) {
                    validatorType = validatorType.trim();
                    if (!validatorType) return;

                    ngModelCtrl.$validators[validatorType] = function (value) {
                        var isValid = isValidType[validatorType](value, attrs, scope);
                        ngModelCtrl.$setValidity(validatorType, isValid);
                        return isValid;
                    };
                });

                
                scope.$watch('linked', function() {
                    $timeout(function() {
                        var valid = true;
                        $.each(ngModelCtrl.$validators, function(name, validator) {
                            if (isValidType[name]) {
                                var isValid = validator(ngModelCtrl.$viewValue, attrs, scope);
                                ngModelCtrl.$setValidity(name, isValid);
                                if (!isValid) valid = false;
                            }
                        });
                        if (valid) {
                            ngModelCtrl.$$invalidModelValue = undefined;
                            ngModelCtrl.$modelValue = ngModelCtrl.$viewValue;
                        }
                    });
                });
            }
        };
    }]);
})();
