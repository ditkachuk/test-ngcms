// Директива для добавления сообщений валидации к контейнеру .form-obj поля ввода формы
(function() {
    var errors = {
        required: 'Обязательное поле',
        formatValidator: 'Некорректный формат',
        date: 'Некорректная дата',
        number: 'Некорректное число',
        date_interval: 'Некорректный интервал дат',
        number_interval: 'Некорректный интервал',
        phone: 'Некорректный телефон',
        email: 'Некорректный адрес электронной почты',
        exist: 'Логин занят другим пользователем'
    };

    angular.module('directives').directive('formObjectErrors', ['$compile', function($compile) {
        return {
            require: ['^form', 'ngModel'],
            link: function (scope, elm, attrs, ctrls) {
                var form = ctrls[0];
                var ngModelCtrl = ctrls[1];

                var errorMessages = angular.extend({}, errors, scope.$eval(attrs.errorMessages) || {});

                var formName = form.$name,
                    fieldName = ngModelCtrl.$name,
                    validators = ngModelCtrl.$validators,
                    errorElement = angular.element('<div class="error-element"></div>');

                if (!formName || !fieldName) return;

                angular.element(elm).parent().append(errorElement);

                angular.forEach(validators, function(validator, error) {
                    var fields = formName + '.'+ fieldName + '.$error.'+ error;
                    if (attrs.errorShared) fields += ' || ' + formName + '.'+ attrs.errorShared + '.$error.'+ error;
                    var message = errorMessages[error] || errors.formatValidator;

                    var template = '<span class="obj-error" ';
                    template += 'ng-class="{\'obj-error-show\': ' + fields + '}"';
                    template += '>' + message + '</span>';

                    errorElement.append($compile(template)(scope));
                });
            }
        };
    }]);
})();
