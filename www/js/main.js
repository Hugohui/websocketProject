//页面路由
var mainStart = angular.module('mainStart',['ui.router','ngWebSocket'])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.when('','/');
        $stateProvider
            //首页
            .state('index',{
                url:'/',
                templateUrl:'./templates/home.html',
                controller:'homeController'
            })
            //账号管理
            .state('usersManage',{//用户管理
                url:'/accountManage/usersManage',
                templateUrl:'./templates/usersTem/usersMange.html',
                controller:'usersController'
            })
            .state('managerManage',{//管理员管理
                url:'/accountManage/managerManage',
                templateUrl:'./templates/usersTem/managersManage.html',
                controller:'managersController'
            })

            //订单管理
            .state('allOrder',{//所有订单
                url:'/orderManage/allOrder',
                templateUrl:'./templates/orderTem/allOrder.html',
                controller:'allOrderController'
            })
            .state('unusualOrder',{//异常订单
                url:'/orderManage/unusualOrder',
                templateUrl:'./templates/orderTem/unusualOrder.html',
                controller:'unusualOrderController'
            })
            .state('transOrder',{//运输中订单
                url:'/orderManage/transOrder',
                templateUrl:'./templates/orderTem/transOrder.html',
                controller:'transOrderController'
            })
            .state('completeOrder',{//已完成订单
                url:'/orderManage/completeOrder',
                templateUrl:'./templates/orderTem/completeOrder.html',
                controller:'completeOrderController'
            })

            //车辆管理
            .state('carDistribute',{//车辆分布
                url:'/carManage/carDistribute',
                templateUrl:'./templates/carTem/carDistribute.html',
                controller:'carDistributeContr'
            })
            .state('carsTable',{//车辆列表
                url:'/carManage/carsTable',
                templateUrl:'./templates/carTem/carsTable.html',
                controller:'carsTableContr'
            })
            .state('carsTroubleTable',{//故障列表
                url:'/carManage/carsTroubleTable',
                templateUrl:'./templates/carTem/carsTroubleTable.html',
                controller:'carsTroubleTableContr'
            })
    }]);


$(function(){

    //退出登录
    signOut();
});

/**
 * 退出登录
 */
function signOut(){
    try{
//点击退出按钮，弹出模态框
        $('#signOut').click(function(){
            $('#signOutModal').modal('show');
        });

        //模态框中点击确认做退出操作
        $('#okSignOutBtn').click(function(){

            //在localstorage中删除当前用户
            window.localStorage.removeItem('userName');

            //将页面跳转到登陆页面
            window.location.href = 'login.html';
        });
    }catch(ex){
        catchTheException("signOut", ex);
    }
}

