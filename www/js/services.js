/**-------------------
 * |��������
 * ------*/

//������֤
mainStart
    .directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {//link����DOM�����¼�������
            var firstPassword = '#' + attrs.pwCheck;
            var confirmPassword = attrs.name
            $('input[name="'+confirmPassword+'"]').on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val()===$(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    }
}]);