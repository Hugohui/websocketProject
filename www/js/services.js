/**-------------------
 * |公共服务
 * ------*/

//密码验证
mainStart
    .directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {//link操作DOM，绑定事件监听器
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