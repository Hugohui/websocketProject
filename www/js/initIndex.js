/**
 * Created by Administrator on 2017/7/28 0028.
 */
$(function () {

    //获取locaostorage中存放的username,在主页面显示用户名
    var userName = window.localStorage.getItem('userName');
    $('.userInfoDivHead').html(userName);

    //初始化侧边下拉导航菜单
    $.sidebarMenu($('.sidebar-menu'));

    //解决页面刷新时的导航条状态问题
    //根据当前内容恢复导航栏的状态
    var url = window.location.href;
    var pagePath = url.split('#/')[1];
    if(pagePath !== ''){
        $('.sidebar-menu li').removeClass('active');
        var pathArr = pagePath.split('/');
        switch (pathArr[0]){
            case 'accountManage':
                $('.sidebar-menu>li').eq(1).find('a').click();
                break;
            case 'orderManage':
                $('.sidebar-menu>li').eq(2).find('a').click();
                break;
            case 'carManage':
                $('.sidebar-menu>li').eq(3).find('a').click();
                break;
            case 'userGuide':
                $('.sidebar-menu>li').eq(4).find('a').click();
                break;
        }
    }

    //点击logo页面跳转到首页，左侧导航变为首页
    $('.logoA').click(function () {
        $('.sidebar-menu>li').eq(0).find('a').click();
    });

    //点击故障，跳转到故障列表,左侧导航变为故障列表
    $('.carTroubleBtn').click(function () {
        if($('.carSideBtn').is(':visible') && $('.carSideBtn').parent('li').hasClass('active')){//防止用户反复点击
            return;
        }else if($('.carSideBtn').is(':visible') && !$('.carSideBtn').parent('li').hasClass('active')){//故障列表项的兄弟项被选中时
            $('.carSideBtn').click();
        }else{
            $('.carManageSideBtn').click();
            $('.carSideBtn').click();
        }
    });

    //页面时间初始化
    var nowDate = new Date();
    var nowDateFormat = nowDate.format("yyyy年MM月dd日");
    var nowDateWeek = nowDate.format("w");
    $('.headerTime').html(nowDateFormat+' 星期'+nowDateWeek);

    //鼠标经过头像时
    $('.headerUserInfo').on({
        mouseover:function(){
            $('.headerUserInfoDiv').show();
        }
        ,mouseout: function () {
            $('.headerUserInfoDiv').hide();
        }
    });

    //修改密码
    $('#changePwd').click(function () {
        $('#changePwdModal').modal('show');
    });

    //用户指南
    $('#userGuideA').click(function () {
        $('#userGuideAModal').modal('show');
    });
});