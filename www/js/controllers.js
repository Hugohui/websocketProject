//控制器
mainStart
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
        $rootScope.$state.isLogin = false;
    })
    //首页控制器
    .controller('homeController', ['$scope', '$websocket', function ($scope, $websocket) {

        //初始化地图
        initHomeMap();

        //车辆信息tabs切换
        tabsChange();

        //车辆控制选择
        checkBox();

        //关闭单车信息弹层
        $scope.closeCarDetail = function () {
            //关闭单车websocket
            closeCarOpenHomeWs();

            //关闭窗口时如果视频窗口可见，则关闭视频推流
            if ($('.carMonitorVideo').is(':visible')) {
                //发送操作请求
                var data = {
                    action: "webControl",
                    params: {
                        "car_id": $('#carId').html(),
                        "opType": 5,
                        "opVal": 0//关闭
                    }
                }
                //发送求情
                videoController(data);
            }
            //车辆操控
            if ($('#hanbleCheckbox').is(':checked')) {
                $('#hanbleCheckbox').prop('checked', false);
                //控制台
                $('.carHandle').hide();

                //货柜
                $('.counterDiv').show();

                //状态图标
                $('.carStatus').show();
            }
            //视频监控
            if ($('#monitorCheckbox').is(':checked')) {
                $('#monitorCheckbox').prop('checked', false);
                //隐藏视频
                $('.carMonitorVideo').hide();

                //显示车辆信息
                $('.carInfoTabsDiv').show();

            }
        }

        //条件查询车辆
        $scope.searchCar = searchMapCar;

        //清空条件查询
        $scope.clearQuery = function () {
            $('.queryInput input').val('');
            $('.selectGroup>div.active').click();

            //websocket切换
            closeSearchWs();
        }

        //窝必达单车信息，全部线路
        $('#allPosition').on({
            mouseover: function () {
                $('.showPositionAll').show();
            },
            mouseout: function () {
                $('.showPositionAll').hide();
            }
        });

        //窝小白单车信息，全部线路
        $('#WXB_allPosition').on({
            mouseover: function () {
                $('.WXB_showPositionAll').show();
            },
            mouseout: function () {
                $('.WXB_showPositionAll').hide();
            }
        });
    }])

    //账号管理控制器
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

    //订单管理控制器
    .controller('allOrderController', ['$scope', function ($scope) {//全部订单

        //初始化订单列表
        initAllOrderTable();

        //初始化城市控件
        init_city_select($("#selCity"));

        //条件查询重绘订单列表
        $scope.searchAllOrder = function () {
            allOrderTable.ajax.reload();
        }

        //清空查询条件
        $scope.clearSearch = function () {
            $('.queryInput input').val('');
        }


    }])
    .controller('unusualOrderController', ['$scope', function ($scope) {
        //初始化订单列表
        initUnusualOrderTable();

        //初始化城市控件
        init_city_select($("#selCity"));

        //条件查询重绘订单列表
        $scope.searchUnusualOrder = function () {
            unusualOrderTable.ajax.reload();
        }

        //清空查询条件
        $scope.clearSearch = function () {
            $('.queryInput input').val('');
        }
    }])
    .controller('transOrderController', ['$scope', function ($scope) {//运输中订单

        //初始化订单列表
        initTransOrderTable();

        //初始化城市控件
        init_city_select($("#selCity"));

        //条件查询重绘订单列表
        $scope.searchTransOrder = function () {
            transOrderTable.ajax.reload();
        }

        //清空查询条件
        $scope.clearSearch = function () {
            $('.queryInput input').val('');
        }
    }])
    .controller('completeOrderController', ['$scope', function ($scope) {//已完成订单

        //初始化订单列表
        initCompleteOrderTable();

        //初始化城市控件
        init_city_select($("#selCity"));

        //条件查询重绘订单列表
        $scope.searchCompleteOrder = function () {
            completeOrderTable.ajax.reload();
        }

        //清空查询条件
        $scope.clearSearch = function () {
            $('.queryInput input').val('');
        }
    }])

    //车辆管理控制器
    .controller('carDistributeContr', ['$scope', function ($scope) {//车辆分布

        //initDisMap();
        initHomeMap();

        //车辆信息tabs切换
        tabsChange();

        //车辆控制选择
        checkBox();

        //关闭单车信息弹层
        $scope.closeCarDetail = function () {
            closeCarOpenHomeWs();
            //车辆操控
            if ($('#hanbleCheckbox').is(':checked')) {
                $('#hanbleCheckbox').prop('checked', false);
                //控制台
                $('.carHandle').hide();

                //货柜
                $('.counterDiv').show();

                //状态图标
                $('.carStatus').show();
            }
            //视频监控
            if ($('#monitorCheckbox').is(':checked')) {
                $('#monitorCheckbox').prop('checked', false);
                //隐藏视频
                $('.carMonitorVideo').hide();

                //显示车辆信息
                $('.carInfoTabsDiv').show();

            }
        }

        $scope.searchCar = searchMapCar;

        //清空查询条件
        $scope.clearQuery = function () {
            $('.carDistrQueryCar input').val('');
            $('.selectGroup>div.active').click();

            //websocket切换
            closeSearchWs();
        }
    }])
    .controller('carsTableContr', ['$scope', '$compile', function ($scope, $compile) {//车辆列表

        //初始化车辆列表
        initCarsTable();

        //初始化城市控件
        init_city_select($("#selCity"));

        //条件搜索重绘列表
        $scope.searchCars = function () {
            carsTable.ajax.reload();
        };

        //清空查询条件
        $scope.clearQueryInp = function () {
            $('.queryInput input').val('');
            $('.selectGroup>div.active').click()

            //websocket切换
            closeSearchWs();
        }
    }])
    .controller('carsTroubleTableContr', ['$scope', function ($scope) {//故障列表

        //初始化车辆列表
        initCarsTroubleTable();

        //搜索查询
        $scope.searchTroubleCar = function () {
            carsTroubleTable.ajax.reload();
        }
    }]);

/**
 * 主页地图初始化
 */
var homeWs, homeMap, searchWs;
var orderUrl,currentUrl;
function initHomeMap() {

    currentUrl = window.location.href.split('#')[1];

    //初始化
    homeMap = new AMap.Map('homeMap', {
        resizeEnable: true,
        center: [116.45645, 40.079607],//默认中心点
        zoom: 11//地图缩放级别
    });

    //添加地图工具条
    homeMap.plugin(["AMap.ToolBar"], function () {
        homeMap.addControl(new AMap.ToolBar());
    });

    //隐藏高德地图版本等信息
    hideMapRight();

    //地图输入查询区域
    //输入提示
    var autoOptions = {
        input: "areaTipInput"
    };
    var auto = new AMap.Autocomplete(autoOptions);
    var placeSearch = new AMap.PlaceSearch({
        map: homeMap
    });  //构造地点查询类
    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
    }

    //建立首页websocket
    var dataOption = {
        data: '{"action":"home","params":{}}'
    };

    //当url变化是，先关闭socket，再开启
    if(orderUrl != currentUrl){
        homeWs && homeWs.close();
        creatHomeWs(homeMap, dataOption);
    }

    //赋值
    orderUrl = currentUrl;
}

/**
 * 渲染点击的车辆信息，显示车辆信息模态框
 */
var carWs, carLineMap;
function renderDataShowModal(e) {

    //获取车辆id和车辆类型
    var carId = this.getTitle(),
        carType = this.getExtData().type,
        carPoint = this.getExtData().carPoint;

    //将车辆类型保存到页面
    $('#carType').val(carType);

    //创建单车地图
    carLineMap = new AMap.Map('carMap', {
        center: [116.345645, 40.079607],
        zoom: 11
    });
    carLineMap.plugin(["AMap.ToolBar"], function () {
        carLineMap.addControl(new AMap.ToolBar());
    });

    //隐藏高德地图版本等信息
    hideMapRight();

    //窝小白绘制路径
    /*if (carId == '1234567893') {
        /!*
         |--------------------------------------
         |请求车辆的路径规划信息，并在地图上显示
         |--------------------------------------
         *!/
        var uploadDate = {
            action: "uploadMap",
            params: {
                content: "aosen",
                map_name: "aolinpark.txt"
            }
        };
        var jsonpCallbackName = "success_jsonpCallback";
        ajaxQueryLine(uploadDate, jsonpCallbackName, true);
    }*/

    //建立单车websocket
    creatCarWs({
        carId: carId,//车辆id
        carType: carType,//车辆类型
        carPoint: carPoint//车辆位置
    });

    /*
     |-----------------------------------------
     |  根据车辆类型，设置弹层显示不同的样式
     |-----------------------------------------
     */
    if (carType == 2||carType == 4||carType == 3) {//窝小白 新石器 雨燕

        //隐藏窝必达位置信息
        $('.carLineDiv').hide();

        //设置地图显示大小
        $('.carMapDiv').css({
            minHeight: 516,
            borderRadius: "8px",
            overflow: "hidden"
        });

        //关闭车辆控制选择
        $('#hanbleCheckbox').prop('disabled', true);

        //窝必达货柜信息隐藏
        $('.WBDCounter').hide();

        //窝小白扫地车位置信息显示
        //$('.WXBPosition').show();

    } else if (carType == 1) {

        //显示窝必达线路
        $('.carLineDiv').show();

        //修改地图显示大小
        $('.carMapDiv').css({
            minHeight: 400,
            borderRadius: "8px 8px 0 0"
        });

        //开启车辆控制选择
        $('#hanbleCheckbox').prop('disabled', false);

        $('.carMapDiv canvas').css({
            borderRadius: "8px 8px 0 0"
        });

        //显示窝必达货柜信息
        $('.WBDCounter').show();

        //隐藏窝小白位置信息
        $('.WXBPosition').hide();
    }

    //新石器
    if(carType == 4){
        $('.radioBox ').hide();
    }else{
        $('.radioBox ').show();
    }

    //显示模态框
    $('#carDetailModal').modal('show');

    //调整地图为最佳视野
    carLineMap.setZoomAndCenter(18, [carPoint.split(',')[0], carPoint.split(',')[1]]);
}

/**
 * 根据地图文件画路径
 * @param option 请求参数
 * @param option 跨域请求callback名称，防止返回的数据冲突
 * @param isTrans   是否进行位置转换
 */
function ajaxQueryLine(option, jsonpCallbackName, isTrans) {

    var uploadUrl = 'http://111.204.101.170:8184';
    //var callBackName = !isTrans  "success_jsonpCallback"+(option.params.map_name).split('-')[0]
    $.ajax({
        type: 'POST',
        url: uploadUrl,
        data: option,
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: jsonpCallbackName,
        success: function (data) {
            let pointStrArr = data.split('\n');
            let lineArr = [];
            $.each(pointStrArr, function (index, value) {
                if (value != '') {//排除最后一个空数据
                    //先将gps点转换为高德地图坐标点,然后保存在线路数组中
                    if (isTrans) {
                        let lineObj = GPS.gcj_encrypt(value.split(',')[1], value.split(',')[0]);
                        lineArr.push([lineObj.lon, lineObj.lat]);
                    } else {
                        lineArr.push([Number(value.split(',')[0]), Number(value.split(',')[1])]);
                    }
                }
            });
            //绘制折线
            new AMap.Polyline({
                path: lineArr,          //设置线覆盖物路径
                strokeColor: "#3366FF", //线颜色
                strokeOpacity: 0.8,       //线透明度
                strokeWeight: 2,        //线宽
                strokeStyle: "solid",   //线样式
                strokeDasharray: [10, 5] //补充线样式
            }).setMap(carLineMap);
        }
    });
}

/**
 * 建立首页websocket
 */
function creatHomeWs(map, options) {

    var flag = true;

    //websocket配置
    var websocketOptions = options;
    homeWs = handleWebsocket(websocketOptions, function (msg) {
        console.log('首页socket');
        //判断是否是在首页或者车辆分布页面，只有在首页和车辆分布页面进行websocket数据传输
        var pathUrl = window.location.href;
        if (!(pathUrl.split('#')[1] == '/' || pathUrl.split('#')[1] == '/carManage/carDistribute')) {
            //在其他页面关闭已经连接的websocket
            homeWs.close();

            //记录当前位置
            orderUrl = window.location.href.split('#')[1];;
            return;
        }

        var rData = $.parseJSON(msg.data).resData;
        var status = rData.status;
        if (!msg.data.result) {

            setTimeout(function(){
                flag = false;
            },1000);

            drawMarker(map, rData);

            if(flag){
                map.setFitView();
            }

            /**********车辆活动状态************/
            //车辆分布页面不需要画饼状图
            if (pathUrl.split('#')[1] == '/') {
                drawCarPie(status);
            }

        }
    });

}

/**
 * 建立查询websocket
 * @param map   地图
 * @param options   数据
 */
function creatSearchWs(map, options) {

    //设置地图中心点为查询到的点
    var resultPoint = '';

    //websocket配置
    var websocketOptions = options;
    searchWs = handleWebsocket(websocketOptions, function (msg) {
        console.log('查询socket');
        //判断是否是在首页或者车辆分布页面，只有在首页和车辆分布页面进行websocket数据传输
        var pathUrl = window.location.href;
        if (!(pathUrl.split('#')[1] == '/' || pathUrl.split('#')[1] == '/carManage/carDistribute')) {
            //在其他页面关闭已经连接的websocket
            searchWs.close();
            return;
        }

        var rData = $.parseJSON(msg.data).resData;

        console.log(rData.data);

        var status = rData.status;
        if (!msg.data.result) {

            drawMarker(map, rData);

            //查找调整最佳位置
            if(setFitVIewFlag&&rData.data.length == 0){
                toastr.warning('无查询结果！');
            }else if(setFitVIewFlag && $('#searchCarId').val() != '' && rData.data.length != 0){//根据车辆编号查询
                resultPoint = rData.data[0];
                map.setZoomAndCenter(14, [resultPoint.gps_lon, resultPoint.gps_lat]);
            }else if(setFitVIewFlag && $('#searchCarId').val() == ''&& rData.data.length == 1){//不输入车辆编号，但是仅右一条数据
                resultPoint = rData.data[0];
                map.setZoomAndCenter(14, [resultPoint.gps_lon, resultPoint.gps_lat]);
            }else if(setFitVIewFlag && $('#searchCarId').val() == ''&&rData.data.length>1){
                map.setFitView();
            }

            setFitVIewFlag = false;//改变记录

            /**********车辆活动状态************/
            //车辆分布页面不需要画饼状图
            if (pathUrl.split('#')[1] == '/') {
                drawCarPie(status);
            }
        }
    });
}

/**
 * 建立单车websocket
 */
function creatCarWs(carOptions) {

    //设置车辆编号
    carOptions.carId && $('#carId').html(carOptions.carId);

    //保存车辆行驶的线路信息点，即每次位置更新的点
    var markers = [],
        markersLine = [];

    //保存车辆的路径编号
    var lineArrStr = '';

    //websocket配置
    var websocketOptions = {
        data: '{"action":"carDetail","params":{"car_id":' + carOptions.carId + '}}'
    }

    carWs = handleWebsocket(websocketOptions, function (msg) {
        console.log('单车socket');
        //将接受到的json转化为对象
        var rData = $.parseJSON(msg.data).resData;


        if (!rData.result) {

            /************车辆运行状态*************/
            var carStatus = rData.data.status,
                carStatusStr;

            console.log(rData.data);

            //切换小车图标显示
            var WXB_imgPng = 'img/WXB_static.png',//窝小白
                WXB_imgGif = 'img/WXB_gif.gif',
                WBD_imgPng = 'img/WBD_static.png',//窝必达
                WBD_imgGif = 'img/WBD_gif.gif',
                XSQ_imgPng = 'img/XSQ_static.png',//新石器
                XSQ_imgGif = 'img/XSQ_gif.gif',
                RC_imgPng = 'img/RC_static.png',//睿骋
                RC_imgGif = 'img/RC_gif.gif';

            //根据车辆类型设置车辆状态图标
            switch (carOptions.carType) {
                case '1'://窝必达
                    carStatus == 0 ? $('.carIconDiv>img').attr('src', WBD_imgGif) : $('.carIconDiv>img').attr('src', WBD_imgPng);
                    carStatusStr = carStatus == 0 ? '运输中' : '停止';//0 运输中  1停止
                    break;
                case '2'://窝小白
                    carStatus == 0 ? $('.carIconDiv>img').attr('src', WXB_imgGif) : $('.carIconDiv>img').attr('src', WXB_imgPng);
                    carStatusStr = carStatus == 0 ? '清扫中' : '停止';//0 清扫中  1停止
                    break;
                case '3'://睿骋
                    carStatus == 0 ? $('.carIconDiv>img').attr('src', RC_imgGif) : $('.carIconDiv>img').attr('src', RC_imgPng);
                    carStatusStr = carStatus == 0 ? '运行中' : '停止';//0 运输中  1停止
                    break;
                case '4'://新石器
                    carStatus == 0 ? $('.carIconDiv>img').attr('src', XSQ_imgGif) : $('.carIconDiv>img').attr('src', XSQ_imgPng);
                    carStatusStr = carStatus == 0 ? '运输中' : '停止';//0 运输中  1停止
                    break;
            }

            //显示运行状态文字
            $('#carStatus').html(carStatusStr);

            /*************显示货柜信息************/
            //货柜信息显示
            var boxes = rData.data.boxes,//货柜对象
                boxesIdArr = [],//订单号数组
                boxesDivList = $('.counterDiv>div>div');//页面上的货柜

            //遍历订单数据，将订单号保存起来
            $.each(boxes, function (key, val) {
                boxesIdArr.push(val.order_id);
            })

            //遍历货柜，给货柜赋值订单号
            $.each(boxesDivList, function (index, val) {

                //给每个货柜赋值
                if (boxesIdArr[index] && boxesIdArr[index] != 0) {//含有订单号
                    //赋值
                    $(val).html(boxesIdArr[index]);
                    //改变背景颜色
                    $(val).removeClass('bg-counterBlank').addClass('bg-counterFull').css({
                        color: '#fff'
                    });
                    //设置字体颜色
                } else {//没有订单号的显示为空柜
                    $(val).html('空');
                    $(val).removeClass('bg-counterFull').addClass('bg-counterBlank').css({
                        color: '#000'
                    });
                }

            })

            /***********显示机电信息*************/

            //机电信息对象
                if(rData.data.mechelecinfo.length>0){
                    var mechelecinfo = rData.data.mechelecinfo[0];

                    //获取数据中的各个机电信息
                    var batter_voltage = mechelecinfo.batter_voltage + 'V',//电压
                        batter_templature = mechelecinfo.batter_templature + '℃',//电池温度
                    //battery_totquantity = mechelecinfo.battery_totquantity + 'C',//电池总电量
                        battery_totquantity = 100,//电池总电量
                        battery_quantity = mechelecinfo.battery_quantity + '%',//剩余电量
                        battery_current = mechelecinfo.battery_current + 'A',//电流情况
                        ugv_memory = mechelecinfo.ugv_memory + '%',//内存使用率
                        ugv_cpu = mechelecinfo.ugv_cpu + '%',//cpu使用率
                        ugv_storage = mechelecinfo.ugv_storage + '%',//存储使用率
                        ugv_restdistance = mechelecinfo.ugv_restdistance + 'km';//续航里程

                    //给页面上的机电信息赋值
                    $('#batter_voltage').html(batter_voltage),//电压
                        $('#batter_templature').html(batter_templature),//电池温度
                        //$('#battery_totquantity').html(battery_totquantity),//电池总电量
                        $('#battery_quantity').html(battery_quantity),//剩余电量
                        $('#battery_current').html(battery_current),//电流情况
                        $('#ugv_memory').html(ugv_memory),//内存使用率
                        $('#ugv_cpu').html(ugv_cpu),//cpu使用率
                        $('#ugv_storge').html(ugv_storage),//存储使用率
                        $('#ugv_restdistance').html(ugv_restdistance);//续航里程

                    //电池电量示意图显示batteryBody battery battery60
                    var batteryParent = mechelecinfo.battery_quantity / battery_totquantity * 100;
                    //var batteryParent = mechelecinfo.battery_quantity / mechelecinfo.battery_totquantity * 100;
                    if (batteryParent == 0) {
                        $('.batteryBody').attr('class', 'batteryBody battery battery0');
                    } else if (batteryParent < 20) {
                        $('.batteryBody').attr('class', 'batteryBody battery battery0_20');
                    } else if (batteryParent < 45) {
                        $('.batteryBody').attr('class', 'batteryBody battery battery20_45');
                    } else if (batteryParent < 75) {
                        $('.batteryBody').attr('class', 'batteryBody battery battery45_75');
                    } else if (batteryParent < 100) {
                        $('.batteryBody').attr('class', 'batteryBody battery battery75_100');
                    } else if (batteryParent == 100) {
                        $('.batteryBody').attr('class', 'batteryBody battery battery100');
                    }
                }

            /*            /!***********显示位置信息*************!/
             var position = rData.data.position;

             var currentPositon = position.cur,//当前位置
             nextPosition = position.next,//下一投递位置
             allPosition = position.all;//总投递线路

             //给页面上赋值
             $('#currentPositon').html(currentPositon);
             $('#nextPosition').html(nextPosition);
             $('#allPosition').html(allPosition);*/


             /***********故障信息***************/
             var hitchinfoArr = rData.data.hitchinfoArr;
             var strInfo = '';
             var strInfoObj = {
                 1:"激光雷达故障",
                 2:"清扫装置故障",
                 3:"EPS故障",
                 4:"驱动电机故障",
                 5:"底层控制器故障",
                 6:"算法异常"
             };
             //遍历故障信息添加到页面上
             $.each(hitchinfoArr,function(index,value){
                strInfo +='<p class="pr"><span class="pa carTroubleTime">'+value.updtime+'</span>'+strInfoObj[value.hitchinfo]+'</p>';
             });
             $('.carTroubleInfo').html(strInfo);

            /***********车辆路径规划***************/
            var path_id = rData.data.position.path_id,//路径编号
                content = rData.data.position.content;//地图目录

            var lineArr = [];//实时绘制路径的点数组

            if (path_id && carOptions.carId != '1234567893' && path_id != lineArrStr) {
                carLineMap.clearMap();
                lineArr = [];//当路径规划变化时，清除小车的实时路径
                lineArrStr = path_id;
                var pathIdArr = path_id.split(',');
                $.each(pathIdArr, function (index, value) {
                    let uploadDate = {
                        action: "uploadMap",
                        params: {
                            content: content,
                            map_name: value + '-seg'
                        }
                    };
                    let jsonpCallbackName = "success_jsonpCallback" + value;
                    ajaxQueryLine(uploadDate, jsonpCallbackName, false);
                });
            }

            /***********车辆实时路径***************/
            //点的图标
            var carIcon = {
                "1": "img/carMap.png",   //窝必达
                "2": "img/WXB_map.png",    //窝小白
                "3": "img/RC_map.png",   //睿骋
                "4": "img/XSQ_map.png"    //新石器
            }

            //车辆实时位置点
            var position = rData.data.position.cur;

            //console.log(position);
            //绘制实时走过的线路
            //先进行坐标转换
            var currentPosition = GPS.gcj_encrypt(position.lat, position.lon);
            if ($.inArray(currentPosition.lon + ',' + currentPosition.lat, markersLine) == -1) {//点不重复
                markersLine.push(currentPosition.lon + ',' + currentPosition.lat);
            }

            carLineMap.remove(markers);

            if(carOptions.carType == 2){
                carLineMap.clearMap();
            }

            //在地图上画点
            var marker = new AMap.Marker({
                position: [Number(currentPosition.lon), Number(currentPosition.lat)],
                map: carLineMap,
                icon: carIcon[carOptions.carType],//根据车辆的类型设置图标
                offset: new AMap.Pixel(-15, -10),//图标以点为中心
            });

            //将点放到点数组中
            markers.push(marker);

            //小车运动的点位置存储为数组
            $.each(markersLine, function (index, value) {
                lineArr.push([Number(value.split(',')[0]), Number(value.split(',')[1])]);
            });

            //绘制折线
            var polyline = new AMap.Polyline({
                path: lineArr,          //设置线覆盖物路径
                strokeColor: "#3366FF", //线颜色
                strokeOpacity: 0.8,       //线透明度
                strokeWeight: 3,        //线宽
                strokeStyle: "solid",   //线样式
                strokeDasharray: [10, 5] //补充线样式
            });
            polyline.setMap(carLineMap);

            /*AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {
                if (!PathSimplifier.supportCanvas) {
                    alert('当前环境不支持 Canvas！');
                    return;
                }
                var pathSimplifierIns = new PathSimplifier({
                    zIndex: 100,
                    //autoSetFitView:false,
                    map: carLineMap, //所属的地图实例

                    getPath: function(pathData, pathIndex) {
                        return pathData.path;
                    },
                    renderOptions: {
                        pathLineStyle: {
                            dirArrowStyle: true
                        },
                        getPathStyle: function(pathItem, zoom) {
                            var color = "#3366FF",
                                lineWidth = 8;
                            return {
                                pathLineStyle: {
                                    strokeStyle: color,
                                    lineWidth: lineWidth
                                }
                            };
                        }
                    }
                });
                window.pathSimplifierIns = pathSimplifierIns;
                pathSimplifierIns.setData([
                    [116.405289, 39.904987],
                    [113.964458, 40.54664],
                    [111.47836, 41.135964],
                    [108.949297, 41.670904],
                    [106.380111, 42.149509],
                    [103.774185, 42.56996],
                    [101.135432, 42.930601],
                    [98.46826, 43.229964],
                    [95.777529, 43.466798],
                    [93.068486, 43.64009],
                    [90.34669, 43.749086],
                    [87.61792, 43.793308]
                ]);

                $.getJSON('http://a.amap.com/amap-ui/static/data/big-routes.json', function(d) {
                    var flyRoutes = [];
                    d.push.apply(d, flyRoutes);
                    pathSimplifierIns.setData(d);
                });
            });*/
        }
    })
}

//关闭单车信息框，打开首页sebsocket，关闭单车websocket
function closeCarOpenHomeWs() {

    //关闭单车websocket
    carWs.close();

    //恢复页面的默认值
    $('#carId').val('--');//车辆编号
    $('.counterDiv>div>div').attr('class', 'bg-counterBlank').html('--').css({
        color: '#000'
    });
}

/**
 * 地图画点
 * @param map   地图
 * @param rData     点数据
 */
function drawMarker(map, rData) {
    var pointData = rData.data;
    var carIdArr = [],
        carPositionArr = [],
        typeArr = [];//1：窝必达 2：扫地车
    //点的图标
    var carIcon = {
        "1": "img/carMap.png",   //窝必达
        "2": "img/WXB_map.png",    //窝小白
        "3": "img/RC_map.png",   //睿骋
        "4": "img/XSQ_map.png"    //新石器
    }
    $.each(pointData, function (index, value) {
        carIdArr.push(value.car_id);
        typeArr.push(value.type);
        var str = "" + value.gps_lon + "," + value.gps_lat + "";
        carPositionArr.push(str);
    });
    //定义空数组，保存要添加的点
    var marks = [];

    //清空地图上的覆盖物
    map.clearMap();

    //遍历点数据，进行画点
    for (let i = 0; i < carPositionArr.length; i++) {

        //获取对应车辆的id，作为点的title
        let title = '' + carIdArr[i];

        //获取对应车辆的类型，后续做类型判断和显示
        let carType = typeArr[i];

        //if (carType != 3) {//不显示其他类型车辆
            //先将gps点转换为高德地图坐标点，然后地图画点
            let point = GPS.gcj_encrypt(carPositionArr[i].split(',')[1], carPositionArr[i].split(',')[0]);
            var marker = new AMap.Marker({
                position: [point.lon, point.lat],
                extData: {       //给点设置自定义属性
                    type: carType,
                    carPoint: point.lon + ',' + point.lat
                },
                title: title,   //点的title
                map: map,
                icon: carIcon[carType],    //点的图标
                offset: new AMap.Pixel(-15, -10),//图标以点为中心
            });

            //给每一个点添加双击事件
            AMap.event.addListener(marker, 'click', renderDataShowModal);

            //保存已经添加了的点，方便后续做只显示可视区域内的点
            marks.push(marker);
        //}
    }
    //map.setFitView();
}

var setFitVIewFlag = true;//只是第一次查询结果设置中心点
/**
 * 地图车辆条件查询
 */
function searchMapCar() {

    setFitVIewFlag = true;

    var status, hitch, carId;
    //车辆编号
    carId = $('#searchCarId').val() != ""?$('#searchCarId').val():null;
    //状态
    status = $('.isTransDiv>div.active').length > 0?$('.isTransDiv>div.active').attr('valuetype'):null;
    //是否故障
    hitch = $('.isHitchDiv>div.active').length > 0?$('.isHitchDiv>div.active').attr('valuetype'):null;

    //当没有输入查询条件时查询所有，即关闭查询socket，显示首页socket
    if(carId == null && status == null && hitch == null){
        closeSearchWs();
        return;
    }

    //关闭首页websocket
    homeWs.close();
    searchWs && searchWs.readyState == 1 && searchWs.close();

    //打开查询sebsocket
    var dataOption = {
        data: '{"action":"home","params":{"car_id":'+carId+',"status":'+status+',"hitch":'+hitch+'}}'
        //data: '{"action":"home","params":{}}'
    };

    creatSearchWs(homeMap, dataOption);

}

/**
 * 清空条件查询
 */
function closeSearchWs() {

    //关闭搜索websocket
    searchWs && searchWs.close();
        //打开首页sebsocket
        var dataOption = {
            data: '{"action":"home","params":{}}'
        };
    homeWs && homeWs.readyState != 1 && creatHomeWs(homeMap, dataOption);
}

/**
 * 主页初始化图表
 */
function drawCarPie(status) {

    //首页车辆活动统计
    var carData = [
        {value: status.trans_car, name: '运行中'},
        {value: status.idle_car, name: '停止'},
        {value: status.hitch_car, name: '故障'}
    ];

    $('.carStatistic').height($('.carStatistic').width());
    var myChart = echarts.init($('#carStaChart')[0]);//此处传dom元素
    var option = {
        title: {
            text: '车辆活动统计',
            //subtext: '',
            x: 'left',
            fontSize: '16px'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'right',
            data: ['运行中', '停止', '故障']
        },
        //color:['red', 'green','yellow','blueviolet'],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: carData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}

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

/**
 * 初始化订单列表
 */
var allOrderTable;
function initAllOrderTable() {

    var scrollY = $('.allOrderTableDiv').height() - $('.queryDiv').height() - 85;
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
    allOrderTable = $("#allOrderTable").dataTable({
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
           /* param.queryData = {
                username: data.username,
                phone: data.phone,
                order_id: data.order_id,
                car_id: data.car_id,
                location_id: data.location_id
            };*/
            //$('.queryInput>ul input').val() == '' ? param.queryData = {} : param.queryData = {
            //    queryUser: $('.queryInput>ul input').val()
            //}
            if ($('#username').val()=='' && $('#phone').val() == '' && $('#order_id').val()== '' &&
                $('#car_id').val() == '' && $('#location_id').val() == '') {
                param.queryData = {};
            } else {
                param.queryData = {
                    username: $('#username').val(),
                    phone: $('#phone').val(),
                    order_id:$('#order_id').val(),
                    car_id:$('#car_id').val(),
                    location_id: $('#location_id').val()
                }
            }
            //ajax请求数据
            $.ajax({
                type: 'POST',
                url: 'http://111.204.101.170:8184',
                data: '{action:"allOrder",params:' + param + '}',
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
            {"data": "orderNum"},//订单号
            {"data": "recPerson"},//收货人
            {"data": "recPhone"},//联系电话
            {"data": "car_id"},//车辆编号
            {"data": "box_id"},//车辆箱号
            {"data": "result"},//订单状态
            {
                "sClass": "text-center",
                "targets": 5,//操作按钮目标列
                "data": null,
                "render": function (data, type, row) {

                    //订单状态
                    var resultType = {
                        0: "运输成功",
                        1: "运输中",
                    }
                    //订单状态class
                    var resultClass = {
                        0: "status-success",
                        1: "status-trans",
                    }
                    var orderStatusStr = data.result == -1 ? "订单异常" : resultType[data.result];//状态
                    var orderStatusClass = data.result == -1 ? "status-unusual" : resultClass[data.result];//状态类
                    var html = "<span class='status " + orderStatusClass + "'>" + orderStatusStr + "</span>";
                    return html;
                }
            }
        ]
    }).api();
    //此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象
}

/**
 * 初始化异常订单列表
 */
var unusualOrderTable;
function initUnusualOrderTable() {

    var scrollY = $('.orderTableDiv').height() - $('.queryDiv').height() - 85;
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
    unusualOrderTable = $("#unusualOrderTable").dataTable({
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
           /* param.queryData = {
                username: data.username,
                phone: data.phone,
                order_id: data.order_id,
                car_id: data.car_id,
                location_id: data.location_id
            };*/
            //$(".queryInput>ul>input").val() == '' ? param.queryData = {} : param.queryData = {
            //    queryUser: $(".queryInput>ul>input").val()
            //}
            if ($('#username').val()=='' && $('#phone').val() == '' && $('#order_id').val()== '' &&
                $('#car_id').val() == '' && $('#location_id').val() == '') {
                param.queryData = {};
            } else {
                param.queryData = {
                    username: $('#username').val(),
                    phone: $('#phone').val(),
                    order_id:$('#order_id').val(),
                    car_id:$('#car_id').val(),
                    location_id: $('#location_id').val()
                }
            }
            //ajax请求数据
            $.ajax({
                type: 'POST',
                url: 'http://111.204.101.170:8184',
                data: '{"action":"unusualOrder","params":' + param + '}',
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
            //列表表头字段
            columns: [
                {"data": "orderNum"},
                {"data": "recPerson"},
                {"data": "recPosition"},
                {"data": "recPhone"},
                {"data": "demand"},
                {
                    "sClass": "text-center",
                    "targets": 5,//操作按钮目标列
                    "data": null,
                    "render": function (data, type, row) {
                        var html = "<a class='btn btn-default btn-xs'>忽略</a>" +
                            " <a class='btn btn-primary btn-xs'>处理</a>";
                        return html;
                    }
                }
            ]
        }
    }).api();
    //此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象
}
/**
 * 初始化运输中订单列表
 */
var transOrderTable;
function initTransOrderTable() {

    var scrollY = $('.orderTableDiv').height() - $('.queryDiv').height() - 85;
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
    transOrderTable = $("#transOrderTable").dataTable({
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
           /* param.queryData = {
                username: $('#username').val(),
                phone: $('#phone').val(),
                order_id:$('#order_id').val(),
                car_id:$('#car_id').val(),
                location_id: $('#location_id').val()
            };*/
            if ($('#username').val()=='' && $('#phone').val() == '' && $('#order_id').val()== '' &&
                $('#car_id').val() == '' && $('#location_id').val() == '') {
                param.queryData = {};
            } else {
                param.queryData = {
                    username: $('#username').val(),
                    phone: $('#phone').val(),
                    order_id:$('#order_id').val(),
                    car_id:$('#car_id').val(),
                    location_id: $('#location_id').val()
                }
            }
            ;
            //ajax请求数据
            $.ajax({
                type: 'POST',
                url: 'http://111.204.101.170:8184',
                data: '{"action":"transOrder","params":' + param + '}',
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
            {"data": "orderNum"},
            {"data": "recPerson"},
            {"data": "recPosition"},
            {"data": "recPhone"},
            {"data": "demand"},
            {
                "sClass": "text-center",
                "targets": 5,//操作按钮目标列
                "data": null,
                "render": function (data, type, row) {
                    var html = "<span class='status status-trans'>运输中</span>";
                    return html;
                }
            }
        ]
    }).api();
    //此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象
}

/**
 * 初始化已完成订单列表
 */
var completeOrderTable;
function initCompleteOrderTable() {

    var scrollY = $('.orderTableDiv').height() - $('.queryDiv').height() - 85;
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
    completeOrderTable = $("#completeOrderTable").dataTable({
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
            /*param.queryData = {
                username: data.username,
                phone: data.phone,
                order_id: data.order_id,
                car_id: data.car_id,
                location_id: data.location_id
            };*/
            if ($('#username').val()=='' && $('#phone').val() == '' && $('#order_id').val()== '' &&
                $('#car_id').val() == '' && $('#location_id').val() == '') {
                param.queryData = {};
            } else {
                param.queryData = {
                    username: $('#username').val(),
                    phone: $('#phone').val(),
                    order_id:$('#order_id').val(),
                    car_id:$('#car_id').val(),
                    location_id: $('#location_id').val()
                }
            }
            //ajax请求数据
            $.ajax({
                type: 'POST',
                url: 'http://111.204.101.170:8184',
                data: '{"action":"completeOrder","params":' + param + '}',
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
            {"data": "orderNum"},
            {"data": "recPerson"},
            {"data": "recPosition"},
            {"data": "recPhone"},
            {"data": "demand"},
            {
                "sClass": "text-center",
                "targets": 5,//操作按钮目标列
                "data": null,
                "render": function (data, type, row) {
                    var html = "<span class='status status-success'>已完成</span>";
                    return html;
                }
            }
        ]
    }).api();
    //此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象
}

/**
 * 车辆列表
 */
var carsTable;
function initCarsTable() {

    var scrollY = $('.carsTableDiv').height() - $('.queryDiv').height() - 85;
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
    carsTable = $("#carsTableContent").dataTable({
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
        columnDefs: [{
            "targets": [0, 1, 2, 3,4],
            "orderable": false
        }],
        ajax: function (data, callback, settings) {
            //封装请求参数
            var param = {};
            param.limit = data.length;//每页显示的条数
            param.start = data.start;//数据库开始查询的序号
            param.page = (data.start / data.length) + 1;//当前页码
            //请求数据
            /*param.queryData = {
                car_id: $('#car_id').val(),
                area: $('#area').val(),
                hitch:$('#hitch').val()
            };*/


            if ($('#car_id').val() == '' && $('#area').val() == '' && $('#hitch').val() == '') {
                param.queryData = {};
            } else {
                param.queryData = {
                    car_id: $('#car_id').val(),
                    area: $('#area').val(),
                    hitch:$('#hitch').val()
                }
            }
            ;

            //ajax请求数据
            $.ajax({
                type: 'POST',
                url: 'http://111.204.101.170:8184',
                data: '{"action":"carsTable","params":' + param + '}',
                dataType: 'jsonp',
                jsonp: "callback",
                jsonpCallback: "success_jsonpCallback",
                success: function (result) {
                    //setTimeout仅为测试延迟效果
                    setTimeout(function () {
                        //封装返回数据
                        var returnData = {};
                        returnData.draw = data.draw;//这里直接自行返回了draw计数器,由后台返回
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
            {"data": "Id"},
            {"data": "CurrentPosition"},
            {"data": "allDistance"},
            {"data": "allGoods"},
            {"data": "isBreakDown"},
            {"data": "nextPosition"},
            {
                "sClass": "text-center",
                "targets": 6,//操作按钮目标列
                "data": null,
                "render": function (data, type, row) {
                    return "<a href='javascript:void(0);' class='viewCarDetail btn btn-primary btn-xs' value=''>查看</a>";
                }
            }
        ]
    }).api();
    //此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象
}

/**
 * 车辆故障列表初始化
 */
var carsTroubleTable;
function initCarsTroubleTable() {

    var scrollY = $('.carsTroubleTableDiv').height() - $('.queryDiv').height() - 85;
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
    carsTroubleTable = $("#carsTroubleTable").dataTable({
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
        columnDefs: [{
            "targets": [0, 1, 2, 4],  //列号
            "orderable": false  //禁止排序
        }],
        ajax: function (data, callback, settings) {
            //封装请求参数
            var param = {};
            param.limit = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length) + 1;//当前页码
            //请求数据
            //hitch=1 故障
            /*  param.queryData = {
             car_id:"",
             area:"",
             hitch:""
             };*/

            $('.fuzzySearchInp').val() == '' ? param.queryData = {} : param.queryData = {
                queryUser: $('.fuzzySearchInp').val()
            }
            //ajax请求数据
            $.ajax({
                type: 'POST',
                url: 'http://111.204.101.170:8184',
                data: '{"action":"carsTable","params":' + param + '}',
                dataType: 'jsonp',
                jsonp: "callback",
                jsonpCallback: "success_jsonpCallback",
                success: function (result) {
                    //console.log(result);
                    //setTimeout仅为测试延迟效果
                    setTimeout(function () {
                        //封装返回数据
                        var returnData = {};
                        returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                        returnData.recordsTotal = result.total;//返回数据全部记录
                        returnData.recordsFiltered = result.total;//后台不实现过滤功能，每次查询均视作全部结果
                        returnData.data = result.data;//返回的数据列表
                        //console.log(returnData);
                        //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                        //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                        callback(returnData);
                    }, 500);
                }
            });
        },
        //列表表头字段
        columns: [
            {"data": "carId"},
            {"data": "troubleType"},
            {"data": "CurrentPosition"},
            {"data": "stopTime"},
            {
                "sClass": "text-center",
                "targets": 6,//操作按钮目标列
                "data": null,
                "render": function (data, type, row) {
                    return "<a href='javascript:void(0);'  class='delete btn btn-primary btn-xs'>查看</a>";
                }
            }
        ]
    }).api();
    //此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象

}

/**
 * tabs
 */
function tabsChange() {

    $('.carInfoTabs li').click(function () {

        //tabs
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        //对应div
        $('.carInfoContent>div').hide();
        $('.carInfoContent>div').eq($(this).val()).show();
    });
}

/**
 * 视频和车辆操控
 */
function checkBox() {

    //是否开启视频监控
    $('#monitorCheckbox').change(function () {
        //获取当前车辆编号
        var carId = $('#carId').html();

        if ($('#monitorCheckbox').prop('checked')) {

            //显示视频
            $('.carMonitorVideo').show();

            //隐藏信息和故障
            $('.carInfoTabsDiv').hide();
            //连接该车辆视频
            //code...
            //发送操作请求
            var data = {
                action: "webControl",
                params: {
                    "car_id": $('#carId').html(),
                    "opType": 5,
                    "opVal": 1//开启
                }
            }
            //发送控制请求
            videoController(data, function (data) {
                //data.result 0:控制成功   -1：控制失败
                if (data.result == 0) {
                    $('.carMonitorVideo').html('<canvas id="video-canvas"></canvas>')
                    var canvas = $('#video-canvas').get(0);
                    var url = 'ws://111.204.101.170:8082/';
                    new JSMpeg.Player(url, {canvas: canvas});
                } else {
                    $('.carMonitorVideo').html('获取视频监控失败！').css({
                        color: 'red',
                        lineHeight: '333px',
                        fontSize: '20px'
                    });
                }
            });
        } else {
            $('.carMonitorVideo').hide();
            $('.carInfoTabsDiv').show();
            //恢复视频加载动画
            $('.carMonitorVideo').html('<div class="loadingDiv"><img src="./img/loading.gif" alt=""/></div>');
            //关闭车辆视频连接
            //发送操作请求
            var data = {
                action: "webControl",
                params: {
                    "car_id": $('#carId').html(),
                    "opType": 5,
                    "opVal": 0//关闭
                }
            }
            //发送求情
            videoController(data);
        }
    });

    //是否开启车辆操作
    $('#hanbleCheckbox').change(function () {
        if ($(this).prop('checked')) {
            //显示控制台
            $('.carHandle').show();

            //隐藏货柜信息
            $('.counterDiv').hide();

            //隐藏车辆状态
            $('.carStatus').hide();

            //隐藏位置信息（针对窝小白）
            $('.WXBPosition').hide();

            //控制车辆进入控制驾驶
            handleAjax(10, 0, $('#carId').html(), function (data) {
                //控制成功
            });
        } else {
            $('.carHandle').hide();

            //显示车辆状态
            $('.carStatus').show();

            if ($('#carType').val() == 1) {//窝必达
                //显示窝必达货柜信息
                $('.counterDiv').show();
            } else if ($('#carType').val() == 2) {//窝小白

                //隐藏位置信息（针对窝小白）
                //$('.WXBPosition').show();
            }

            //控制车辆退出控制驾驶
            handleAjax(4, 0, $('#carId').html(), function (data) {
                //控制成功
            });

        }
    });
}

/**
 * 车辆操控
 * @param type  操控类型
 * @param val   操控值
 * @param carId 车辆id
 */
function handleAjax(type, val, carId, callback) {
    var data = {
        action: "webControl",
        params: {
            car_id: carId,
            opType: type,
            opVal: val
        }
    }
    //发送操作请求
    $.ajax({
        type: 'POST',
        url: 'http://111.204.101.170:8184',
        data: data,
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'success_jsonpCallback',
        success: callback
    });
}

/**
 * 视频推流
 * @param data  请求数据
 * @param callback  回调函数
 */
function videoController(data, callback) {
    $.ajax({
        type: 'POST',
        url: 'http://111.204.101.170:8184',
        data: data,
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'success_jsonpCallback',
        success: callback
    });
}

/**
 * 修改用户信息
 */
function updateUserInfo() {

    $(document).on('click', '.updateUserInfo', function () {
        //修改用户信息模态框
        $('#userUpdateModal').modal('show');
    });

    //修改用户的后台接口
    var data = {
        action: "updateUser",
        params: {"phone": "", "password": "", "newphone": ""}
    };
    $.ajax({
        type: 'POST',
        url: 'http://111.204.101.170:8184',
        data: data,
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (msg) {
            var rData = msg.resData
            if (rData.result == 0) {

            } else {

            }
        }
    })
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
 * 添加管理员
 */
function addMannager() {

    //含有未通过验证
    if ($('#addManageForm span').is(':visible')) {
        return;
    }

    //点击添加，弹出添加模态框
    $('#addMannager').click(function () {
        $('#addManagerModal').modal('show');
    });

    //添加管理员的后台接口
    var data = {
        action: "AddManager",
        params: {"phone": "", "password": "", "username": ""}
    };
    $.ajax({
        type: 'POST',
        url: 'http://111.204.101.170:8184',
        data: data,
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (msg) {
            var rData = msg.resData
            console.log(rData)
            if (rData.result == 0) {

            } else {

            }
        }
    })
}

/**
 * 修改管理员信息
 */
function updateManagerInfo() {

    $(document).on('click', '.updateManagerInfo', function () {
        //修改用户信息模态框
        $('#managerUpdateModal').modal('show');
    });

    //修改管理员的后台接口
    var data = {
        action: "updateManager",
        params: {"phone": "", "password": "", "newphone": ""}
    };
    $.ajax({
        type: 'POST',
        url: 'http://111.204.101.170:8184',
        data: data,
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (msg) {
            var rData = msg.resData
            console.log(rData)
            if (rData.result == 0) {

            } else {

            }
        }
    })
}

/**
 * 删除管理员
 */
function deleteManagerInfo() {

    $(document).on('click', '.deleteManagerInfo', function () {
        //修改用户信息模态框
        $('#deleteManagerModal').modal('show');
    });

    //删除管理员的后台接口
    var data = {
        action: "deleteManager",
        params: {
            deleteManager: ""
        }
    };
    $.ajax({
        type: 'POST',
        url: 'http://111.204.101.170:8184',
        data: data,
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (msg) {
            var rData = msg.resData
            console.log(rData)
            if (rData.result == 0) {
            }
        }
    })
}

/**
 * 创建websocket连接
 * @param options 自定义连接
 * @param callback 自定义接收数据callback函数
 */

function handleWebsocket(options, callback) {

    var defaultOption = {
        data: ''//请求数据
    }
    var url = 'ws://111.204.101.170:8188';
    var ws = new WebSocket(url);
    var relOptions = $.extend({}, defaultOption, options);
    //建立连接
    ws.onopen = function () {
        //发送数据
        ws.send(relOptions.data);
    }
    //接收数据
    ws.onmessage = callback;

    ws.onerror = function (e) {
        console.log(e);
    }

    ws.onclose = function () {
        ws.close();
    }
    return ws;
}
