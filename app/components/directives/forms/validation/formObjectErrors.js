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
            require:'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                var errorMessages = $.extend({}, errors, scope.$eval(attrs.errorMessages) || {});

                var formName = attrs.formObjectErrors,
                    fieldName = ngModelCtrl.$name,
                    validators = ngModelCtrl.$validators,
                    errorElement = $('<div class="error-element"></div>');

                if (!formName || !fieldName) return;

                $(elm).closest('.form-group').append(errorElement);

                $.each(validators, function(error) {
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
