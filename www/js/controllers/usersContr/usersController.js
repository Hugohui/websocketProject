//账号管理控制器
mainStart
    .controller('usersController', ['$scope', function ($scope) {//用户管理

        //初始化用户列表
        initUsersTable();

        //用户信息修改
        $scope.user = {
            userNewPwd: '',
            userNewPwd2: '',
            userNewPhone: ''
        };
        //检查两次输入密码是否一致
        $scope.checkPwd = function () {
            if ($scope.user.userNewPwd && $scope.user.userNewPwd2 && $scope.user.userNewPwd != $scope.user.userNewPwd2) {
                $scope.isNotSame = true;
            } else {
                $scope.isNotSame = false;
            }
        }
        //隐藏错误信息
        $scope.hideError = function () {
            $scope.isNotSame = false;
        }

        //关闭模态框初始化表单
        $scope.resetForm = function () {
            $scope.updateUserInfoForm.$setPristine();
            $scope.user = {
                userNewPwd: '',
                userNewPwd2: '',
                userNewPhone: ''
            };
        }

        //查询重绘列表
        $scope.searchUser = function () {
            userTable.ajax.reload();
        };

        updateUserInfo();
        deleteUserInfo();

    }])
    .controller('managersController', ['$scope', '$http', function ($scope, $http) {//管理员管理

        /**********列表操作***********/
            //初始化管理员列表
        initManagersTable();
        //查询重绘列表
        $scope.searchManager = function () {
            managersTable.ajax.reload();
        }
        /**********添加管理员***********/
            //初始化
        $scope.manager = {
            manageName: '',
            managePwd: '',
            confirmPassword: '',
            phoneNum: ''
        };
        //关闭添加管理员模态框初始化表单
        $scope.resetUpdateForm = function () {
            $scope.addManageForm.$setPristine();
            $scope.manager = {
                manageName: '',
                managePwd: '',
                confirmPassword: '',
                phoneNum: ''
            };
        }
        /*//后台交互确认添加用户
         $scope.okAddManager = function () {
         var url = 'http://111.141.101.170:8484',
         data = {"action":"addManager","params":$scope.manager};
         $http({
         method:'post',
         url:url,
         data:data
         }).success(function(req){
         })
         }*/

        /**********管理员信息修改***********/
            //初始化
        $scope.updateManager = {
            managePwd: '',
            phoneNum: '',
            confirmPassword: ''
        };
        //关闭修改管理员模态框初始化表单
        $scope.resetForm = function () {
            $scope.updateManageForm.$setPristine();
            $scope.updateManager = {
                managePwd: '',
                confirmPassword: '',
                phoneNum: ''
            };
        }
        /*//后台交互确认添加用户
         $scope.okUpdateManager = function () {
         var url = 'http://111.141.101.170:8484',
         data = {"action":"updateManager","params":$scope.manager};
         $http({
         method:'post',
         url:url,
         data:data
         }).success(function(req){
         })
         }*/

        /**********模态框显示***********/
            //添加管理员
        addMannager();
        //管理员信息修改
        updateManagerInfo();
        //删除管理员
        deleteManagerInfo();
    }])

/**
 * 用户管理列表
 */
var userTable;
function initUsersTable() {
    var scrollY = $('.userTableDiv').height() - $('.searchGroupDiv').height() - 145;
    //提示信息
    var lang = {
        "sProcessing": "处理中...",
        "sLengthMenu": "每页 _MENU_ 项",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
        "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "上页",
            "sNext": "下页",
            "sLast": "末页",
            "sJump": "跳转"
        },
        "oAria": {
            "sSortAscending": ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    };

    //初始化表格
    userTable = $("#userTable").dataTable({
        language: lang,  //提示信息
        autoWidth: false,  //禁用自动调整列宽
        scrollY: scrollY,
        stripeClasses: ["odd", "even"],  //为奇偶行加上样式，兼容不支持CSS伪类的场合
        processing: true,  //隐藏加载提示,自行处理
        serverSide: true,  //启用服务器端分页
        searching: false,  //禁用原生搜索
        orderMulti: false,  //启用多列排序
        order: [],  //取消默认排序查询,否则复选框一列会出现小箭头
        renderer: "Bootstrap",  //渲染样式：Bootstrap和jquery-ui
        pagingType: "full_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
        columnDefs: [
            {
                "targets": [0, 1, 2, 3, 4],
                "orderable": false
            }
        ],
        ajax: function (data, callback, settings) {
            //封装请求参数
            var param = {};
            param.limit = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length) + 1;//当前页码
            //请求数据
            $('#queryUserInp').val() == '' ? param.queryData = {} : param.queryData = {
                queryUser: $('#queryUserInp').val()
            }
            //var url = 'http://111.204.101.170:8484';
            //ajax请求数据
            $.ajax({
                type: 'POST',
                url: '../data/users.txt',
                //url:'http://111.204.101.170:8184',
                //data: '{action:"usersManage",params:' + param + '}',
                data: param,
                dataType: 'jsonp',
                jsonp: "callback",
                jsonpCallback: "success_jsonpCallback",
                success: function (result) {
                    //封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.total;//返回数据全部记录
                    returnData.recordsFiltered = result.total;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;//返回的数据列表
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                }
            });
        },
        //列表表头字段
        columns: [
            {"data": "userName"},
            {"data": "userPwd"},
            {"data": "userPhone"},
            {"data": "userRegisterTime",},
            {
                "sClass": "text-center",
                "targets": 4,//操作按钮目标列
                "data": null,
                "render": function (data, type, row) {
                    var html = "<a href='javascript:void(0);'  class='btn btn-default btn-xs updateUserInfo' title='修改' value='" + data.userPhone + "'><i class='fa fa-edit'></i></a>" +
                        " <a href='javascript:void(0);'  class='btn btn-default btn-xs deleteUserInfo' title='删除' value='" + data.userPhone + "'><i class='fa fa-remove'></i></a>";
                    return html;
                }
            }
        ]
    }).api();
    //此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象
}

/**
 * 删除用户
 */
function deleteUserInfo() {

    var userPhone;
    $(document).on('click', '.deleteUserInfo', function () {
        //修改用户信息模态框
        $('#deleteUserModal').modal('show');
        userPhone = $(this).val();
    });

    //删除用户的后台接
    var data = {
        action: "deketeUser",
        params: {deketeUser: userPhone}
    };
    $.ajax({
        type: 'POST',
        url: 'http://111.204.101.170:8184',
        data: data,
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (msg) {

        }
    })
}

/**
 * 管理员列表
 */
var managersTable;
function initManagersTable() {

    var scrollY = $('.managersTableDiv').height() - $('.queryDiv').height() - 85;
    //提示信息
    var lang = {
        "sProcessing": "处理中...",
        "sLengthMenu": "每页 _MENU_ 项",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
        "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "上页",
            "sNext": "下页",
            "sLast": "末页",
            "sJump": "跳转"
        },
        "oAria": {
            "sSortAscending": ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    };

    //初始化表格
    managersTable = $("#managersTable").dataTable({
        language: lang,  //提示信息
        autoWidth: false,  //禁用自动调整列宽
        scrollY: scrollY,
        stripeClasses: ["odd", "even"],  //为奇偶行加上样式，兼容不支持CSS伪类的场合
        processing: true,  //隐藏加载提示,自行处理
        serverSide: true,  //启用服务器端分页
        searching: false,  //禁用原生搜索
        orderMulti: false,  //启用多列排序
        ordering: false,
        order: [],  //取消默认排序查询,否则复选框一列会出现小箭头
        renderer: "Bootstrap",  //渲染样式：Bootstrap和jquery-ui
        pagingType: "full_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
        /*columnDefs: [
         {
         "targets":[0,1,2,4],
         "orderable":false
         }
         ],*/
        ajax: function (data, callback, settings) {
            //封装请求参数
            var param = {};
            param.limit = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length) + 1;//当前页码
            //请求数据
            $('#queryUserInp').val() == '' ? param.queryData = {} : param.queryData = {
                queryUser: $('#queryUserInp').val()
            }
            //ajax请求数据
            $.ajax({
                type: 'POST',
                url: 'http://111.204.101.170:8184',
                data: '{action:"managersManage",params:' + param + '}',
                dataType: 'jsonp',
                jsonp: "callback",
                jsonpCallback: "success_jsonpCallback",
                success: function (result) {
                    //setTimeout仅为测试延迟效果
                    setTimeout(function () {
                        //封装返回数据
                        var returnData = {};
                        returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                        returnData.recordsTotal = result.total;//返回数据全部记录
                        returnData.recordsFiltered = result.total;//后台不实现过滤功能，每次查询均视作全部结果
                        returnData.data = result.data;//返回的数据列表
                        //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                        //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                        callback(returnData);
                    }, 500);
                }
            });
        },
        //列表表头字段
        columns: [
            {"data": "managerName"},
            {"data": "managerPwd"},
            {"data": "managerPhone"},
            {
                "sClass": "text-center",
                "targets": 4,//操作按钮目标列
                "data": null,
                "render": function (data, type, row) {
                    var html = "<a href='javascript:void(0);'  class='updateManagerInfo btn btn-default btn-xs' title='修改' value='" + data.managerPhone + "'><i class='fa fa-edit'></i></a>" +
                        " <a href='javascript:void(0);'  class='delete btn btn-default btn-xs deleteManagerInfo' title='删除' value='" + data.managerPhone + "'><i class='fa fa-remove'></i></a>";
                    return html;
                }
            }
        ]
    }).api();
    //此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象
}