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
            closeCarOpenHomeWs();
            if($('#hanbleCheckbox').is(':checked')){
                $('#hanbleCheckbox').prop('checked',false);
                $('.carHandle').hide();
                $('.counterDiv').show();
            }
        }


        //条件查询车辆
        $scope.searchCar = searchMapCar;

        //清空条件查询
        $scope.clearQuery = function () {
            $('.queryInput input').val('');
            $('.selectGroup>div.active').click();

            //重新绘制地图
            initHomeMap();
        }

        //窝必达单车信息，全部线路
        $('#allPosition').on({
            mouseover:function(){
                $('.showPositionAll').show();
            },
            mouseout:function(){
                $('.showPositionAll').hide();
            }
        });

        //窝小白单车信息，全部线路
        $('#WXB_allPosition').on({
            mouseover:function(){
                $('.WXB_showPositionAll').show();
            },
            mouseout:function(){
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
            if($('#hanbleCheckbox').is(':checked')){
                $('#hanbleCheckbox').prop('checked',false);
                $('.carHandle').hide();
                $('.counterDiv').show();
            }
        }

        //清空查询条件
        $scope.clearQueryInp = function () {
            $('.carDistrQueryCar input').val('');
            $('.selectGroup>div.active').click();
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
        }

        //查看具体车辆信息
        viewCarDetail();
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
var homeWs, homeMap;
function initHomeMap() {
    //初始化
    homeMap = new AMap.Map('homeMap', {
        //center: [116.45645, 40.079607],//默认中心点
        zoom: 10//地图缩放级别
    });

    //添加地图工具条
    homeMap.plugin(["AMap.ToolBar"], function () {
        homeMap.addControl(new AMap.ToolBar());
    });

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
    creatHomeWs(homeMap);
}

/**
 * 渲染点击的车辆信息，显示车辆信息模态框
 */
var carWs,carLineMap;
function renderDataShowModal(e) {

    //关闭首页websocket
    homeWs.close();
    //获取车辆信息，渲染数据
    //code...

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

    /*
    |--------------------------------------
    |请求车辆的路径规划信息，并在地图上显示
    |--------------------------------------
     */
    var uploadUrl = 'http://192.168.1.105:8184';
    var uploadDate = {
        action:"uploadMap",
        params:""
    };
    $.ajax({
        type:'POST',
        url:uploadUrl,
        data:uploadDate,
        dataType: 'jsonp',
        jsonp : "callback",
        jsonpCallback:"success_jsonpCallback",
        success:function(data){
            var pointStrArr = data.split('\n');
            var lineArr = [];
            $.each(pointStrArr,function(index,value){
                if(value != ''){//排除最后一个空数据
                    //先将gps点转换为高德地图坐标点,然后保存在线路数组中
                    var lineObj = GPS.gcj_encrypt(value.split(',')[1], value.split(',')[0]);
                    lineArr.push([lineObj.lon,lineObj.lat]);
                }
            });

            //绘制折线
            var polyline = new AMap.Polyline({
                path: lineArr,          //设置线覆盖物路径
                strokeColor: "#3366FF", //线颜色
                strokeOpacity: 0.8,       //线透明度
                strokeWeight: 2,        //线宽
                strokeStyle: "solid",   //线样式
                strokeDasharray: [10, 5] //补充线样式
            });
            polyline.setMap(carLineMap);
        }
    });

    //建立单车websocket
    creatCarWs({
        carId:carId,//车辆id
        carType:carType,//车辆类型
        carPoint:carPoint//车辆位置
    });

    /*
     |-----------------------------------------
     |  根据车辆类型，设置弹层显示不同的样式
     |-----------------------------------------
     */
    if(carType == 2){//窝小白

        /*//隐藏窝必达位置信息
        $('.carLineDiv').hide();

        //设置地图显示大小
        $('.carMapDiv').css({
            minHeight:516,
            borderRadius:"8px"
        });

        $('.carMapDiv canvas').css({
            borderRadius:"8px"
        });*/

        //窝必达货柜信息隐藏
        $('.WBDCounter').hide();

        //窝小白扫地车位置信息显示
        //$('.WXBPosition').show();

    }else if(carType == 1){

        //显示窝必达线路
        $('.carLineDiv').show();

        //修改地图显示大小
        $('.carMapDiv').css({
            minHeight:400,
            borderRadius:"8px 8px 0 0"
        });

        $('.carMapDiv canvas').css({
            borderRadius:"8px 8px 0 0"
        });

        //显示窝必达货柜信息
        $('.WBDCounter').show();

        //隐藏窝小白位置信息
        $('.WXBPosition').hide();
    }

    //显示模态框
    $('#carDetailModal').modal('show');

    //调整地图为最佳视野
    carLineMap.setZoomAndCenter(18, [carPoint.split(',')[0],carPoint.split(',')[1]]);
}
/**
 * 建立首页websocket
 */
function creatHomeWs(map) {

    //websocket配置
    var websocketOptions = {
        data: '{"action":"home","params":{}}'
    }
    handleHomeWebsocket(websocketOptions, function (msg) {

        //点的图标
        var carIcon = {
            "1":"img/carMap.png",   //窝必达
            "2":"img/WXB_map.png"    //扫地车
        }
        var rData = $.parseJSON(msg.data).resData,
            pointData = rData.data,
            status = rData.status;
        if (!msg.data.result) {
            var carIdArr = [],
                carPositionArr = [],
                typeArr = [];//1：窝必达 2：扫地车
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

                //先将gps点转换为高德地图坐标点，然后地图画点
                AMap.convertFrom(carPositionArr[i], "gps", function (status, result) {
                    var marker = new AMap.Marker({
                        position: [result.locations[0].lng, result.locations[0].lat],
                        extData:{       //给点设置自定义属性
                          type:carType,
                          carPoint:result.locations[0].lng+','+result.locations[0].lat
                        },
                        title: title,   //点的title
                        map: map,
                        icon:carIcon[carType]    //点的图标
                    });

                    //给每一个点添加双击事件
                    AMap.event.addListener(marker, 'click', renderDataShowModal);

                    //保存已经添加了的点，方便后续做只显示可视区域内的点
                    marks.push(marker);
                });
            }

            /**********车辆活动状态************/
            //首页车辆活动统计
            var carData = [
                {value: status.trans_car, name: '运输中'},
                {value: status.hitch_car, name: '故障车辆'},
                {value: status.idle_car, name: '空闲车辆'},
                {value: status.waiting_car, name: '等待车辆'}
            ];
            drawCarPie(carData);
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
    var markers= [],
        markersLine = [];

    //websocket配置
    var websocketOptions = {
        data: '{"action":"carDetail","params":{"car_id":' + carOptions.carId + '}}'
    }

    handleCarWebsocket(websocketOptions, function (msg) {

        //将接受到的json转化为对象
        var rData = $.parseJSON(msg.data).resData;


        if (!rData.result) {

            /************车辆运行状态*************/
            var carStatus = rData.data.status;
            var carStatusStr = carStatus == 0?'运输中':'停止';//0 运输中  1停止
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
                        color:'#fff'
                    });
                    //设置字体颜色
                } else {//没有订单号的显示为空柜
                    $(val).html('空');
                    $(val).removeClass('bg-counterFull').addClass('bg-counterBlank').css({
                        color:'#000'
                    });
                }

            })

            /***********显示机电信息*************/

            //机电信息对象
            var mechelecinfo = rData.data.mechelecinfo[0];

            //获取数据中的各个机电信息
            var batter_voltage = mechelecinfo.batter_voltage+'V',//电压
                batter_templature = mechelecinfo.batter_templature+'℃',//电池温度
                battery_totquantity = mechelecinfo.battery_totquantity+'C',//电池总电量
                battery_quantity = mechelecinfo.battery_quantity+'C',//剩余电量
                battery_current = mechelecinfo.battery_current+'A',//电流情况
                ugv_memory = mechelecinfo.ugv_memory+'%',//内存使用率
                ugv_cpu = mechelecinfo.ugv_cpu+'%',//cpu使用率
                ugv_storage = mechelecinfo.ugv_storage+'%',//存储使用率
                ugv_restdistance = mechelecinfo.ugv_restdistance+'km';//续航里程

            //给页面上的机电信息赋值
            $('#batter_voltage').html(batter_voltage),//电压
            $('#batter_templature').html(batter_templature),//电池温度
            $('#battery_totquantity').html(battery_totquantity),//电池总电量
            $('#battery_quantity').html(battery_quantity),//剩余电量
            $('#battery_current').html(battery_current),//电流情况
            $('#ugv_memory').html(ugv_memory),//内存使用率
            $('#ugv_cpu').html(ugv_cpu),//cpu使用率
            $('#ugv_storge').html(ugv_storage),//存储使用率
            $('#ugv_restdistance').html(ugv_restdistance);//续航里程

            //电池电量示意图显示batteryBody battery battery60
            var batteryParent = mechelecinfo.battery_quantity/mechelecinfo.battery_totquantity*100;
            if(batteryParent==0){
                $('.batteryBody').attr('class','batteryBody battery battery0');
            }else if(batteryParent<20){
                $('.batteryBody').attr('class','batteryBody battery battery0_20');
            }else if(batteryParent<45){
                $('.batteryBody').attr('class','batteryBody battery battery20_45');
            }else if(batteryParent<75){
                $('.batteryBody').attr('class','batteryBody battery battery45_75');
            }else if(batteryParent<100){
                $('.batteryBody').attr('class','batteryBody battery battery75_100');
            }else if(batteryParent == 100){
                $('.batteryBody').attr('class','batteryBody battery battery100');
            }

/*            /!***********显示位置信息*************!/
            var position = rData.data.position;

            var currentPositon = position.cur,//当前位置
                nextPosition = position.next,//下一投递位置
                allPosition = position.all;//总投递线路

            //给页面上赋值
            $('#currentPositon').html(currentPositon);
            $('#nextPosition').html(nextPosition);
            $('#allPosition').html(allPosition);


            /!***********故障信息***************!/
            var hitchinfo = rData.data.hitchinfo;
            var strInfo = '';
            //遍历故障信息添加到页面上
            $.each(hitchinfo,function(index,vlaue){
                strInfo +='<p class="pr"><span class="pa carTroubleTime">'+vlaue.timestamp+'</span>'+value.timestamp+'</p>';
            });
            $('.carTroubleInfo').html(strInfo);*/

            /***********车辆地图路径***************/
            //点的图标
            var carIcon = {
                "1":"img/carMap.png",   //窝必达
                "2":"img/WXB_map.png"    //扫地车
            }
            carLineMap.remove(markers);

            //在地图上画点
            var marker = new AMap.Marker({
                position: [carOptions.carPoint.split(',')[0], carOptions.carPoint.split(',')[1]],
                map: carLineMap,
                icon:carIcon[carOptions.carType]//根据车辆的类型设置图标
            });

            //将点放到点数组中
            markers.push(marker);

            var position = rData.data.position;

            //console.log(position);
            //绘制实时走过的线路
            //先进行坐标转换
            var currentPosition = GPS.gcj_encrypt(position.lon,position.lat)
            if($.inArray(currentPosition.lat+','+currentPosition.lon,markersLine) == -1){//点不重复
                markersLine.push(currentPosition.lat+','+currentPosition.lon);
            }

            var lineArr  = [];
            $.each(markersLine,function(index,value){
                lineArr.push([Number(value.split(',')[0]),Number(value.split(',')[1])]);
            });

            //绘制折线
            var polyline = new AMap.Polyline({
                path: lineArr,          //设置线覆盖物路径
                strokeColor: "red", //线颜色
                strokeOpacity: 0.8,       //线透明度
                strokeWeight: 3,        //线宽
                strokeStyle: "solid",   //线样式
                strokeDasharray: [10, 5] //补充线样式
            });
            polyline.setMap(carLineMap);
        }
    })
}

//关闭单车信息框，打开首页sebsocket，关闭单车websocket
function closeCarOpenHomeWs() {

    //打开首页sebsocket
    creatHomeWs(homeMap);
    //关闭单车websocket
    carWs.close();

    //恢复页面的默认值
    $('#carId').val('--');//车辆编号
    $('.counterDiv>div>div').attr('class','bg-counterBlank').html('--').css({
        color:'#000'
    });
}

/**
 * 地图车辆条件查询
 */
function searchMapCar(){
    //车辆编号
    var carId = $('#searchCarId').val();

    //状态

    //是否故障

}

/**
 * 主页初始化图表
 */
function drawCarPie(rData) {

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
            data: ['运输中', '故障车辆', '空闲车辆', '等待车辆']
        },
        //color:['red', 'green','yellow','blueviolet'],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: rData,
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
                url:'http://192.168.1.105:8184',
                data: '{action:"usersManage",params:' + param + '}',
                dataType: 'jsonp',
                jsonp : "callback",
                jsonpCallback:"success_jsonpCallback",
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
    try {
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
                    url:'http://192.168.1.105:8184',
                    data: '{action:"managersManage",params:' + param + '}',
                    dataType: 'jsonp',
                    jsonp : "callback",
                    jsonpCallback:"success_jsonpCallback",
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
    } catch (ex) {
        catchTheException('initManagersTable', ex);
    }

}

///99555
///999955599999

/**
 * 初始化订单列表
 */
var allOrderTable;
function initAllOrderTable() {
    try {
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
                    username:"",
                    phone:"",
                    order_id:"",
                    car_id:"",
                    location_id:""
                 };*/
                //$('.queryInput>ul input').val() == '' ? param.queryData = {} : param.queryData = {
                //    queryUser: $('.queryInput>ul input').val()
                //}
                if($("input[type='text']").val() == '' ){
                    param.queryData = {};
                }else{
                    param.queryData = {
                       queryUser: $("input[type='text']").each(function () {
                            var value = $(this).val();
                        })
                    }
                }



                //ajax请求数据
                $.ajax({
                    type: 'POST',
                    url:'http://192.168.1.105:8184',
                    data: '{action:"allOrder",params:' + param + '}',
                    dataType: 'jsonp',
                    jsonp : "callback",
                    jsonpCallback:"success_jsonpCallback",
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
                            0:"运输成功",
                            1:"运输中",
                        }
                        //订单状态class
                        var resultClass = {
                            0:"status-success",
                            1:"status-trans",
                        }
                        var orderStatusStr = data.result == -1?"订单异常":resultType[data.result];//状态
                        var orderStatusClass = data.result == -1?"status-unusual":resultClass[data.result];//状态类
                        var html = "<span class='status "+orderStatusClass+"'>"+orderStatusStr+"</span>";
                        return html;
                    }
                }
            ]
        }).api();
        //此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象
    } catch (ex) {
        catchTheException('initAllOrderTable', ex);
    }

}

/**
 * 初始化异常订单列表
 */
var unusualOrderTable;
function initUnusualOrderTable() {
    try {
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
                 username:"",
                 phone:"",
                 order_id:"",
                 car_id:"",
                 location_id:""
                 };*/
                //$(".queryInput>ul>input").val() == '' ? param.queryData = {} : param.queryData = {
                //    queryUser: $(".queryInput>ul>input").val()
                //}
                if($("input[type='text']").val() == '' ){
                    param.queryData = {};
                }else{
                    param.queryData = {
                        queryUser: $("input[type='text']").each(function () {
                            var value = $(this).val();
                        })
                    }
                };
                    //ajax请求数据
                    $.ajax({
                        type: 'POST',
                        url: 'http://192.168.1.105:8184',
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
    } catch (ex) {
        catchTheException('initUnusualOrderTable', ex);
    }

}
 /**
 * 初始化运输中订单列表
 */
var transOrderTable;
function initTransOrderTable() {
    try {
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
              /*  param.queryData = {
                    username:"",
                    phone:"",
                    order_id:"",
                    car_id:"",
                    location_id:""
                };*/
                if($("input[type='text']").val() == '' ){
                    param.queryData = {};
                }else{
                    param.queryData = {
                        queryUser: $("input[type='text']").each(function () {
                            var value = $(this).val();
                        })
                    }
                };
                //ajax请求数据
                $.ajax({
                    type: 'POST',
                    url:'http://192.168.1.105:8184',
                    data: '{"action":"transOrder","params":' + param + '}',
                    dataType: 'jsonp',
                    jsonp : "callback",
                    jsonpCallback:"success_jsonpCallback",
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
    } catch (ex) {
        catchTheException('initTransOrderTable', ex);
    }

}

/**
 * 初始化已完成订单列表
 */
var completeOrderTable;
function initCompleteOrderTable() {
    try {
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
              /*  param.queryData = {
                    username:"",
                    phone:"",
                    order_id:"",
                    car_id:"",
                    location_id:""
                };*/
                if($("input[type='text']").val() == '' ){
                    param.queryData = {};
                }else{
                    param.queryData = {
                        queryUser: $("input[type='text']").each(function () {
                            var value = $(this).val();
                        })
                    }
                };
                //ajax请求数据
                $.ajax({
                    type: 'POST',
                    url:'http://192.168.1.105:8184',
                    data: '{"action":"completeOrder","params":' + param + '}',
                    dataType: 'jsonp',
                    jsonp : "callback",
                    jsonpCallback:"success_jsonpCallback",
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
    } catch (ex) {
        catchTheException('initCompleteOrderTable', ex);
    }

}

/**
 * 车辆列表
 */
var carsTable;
function initCarsTable() {
    try {
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
                "targets": [0, 1, 2, 5, 6],
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
                   car_id:"",
                    area:"",
                    hitch:""
                 };*/


                if($("input[type='text']").val() == '' ){
                    param.queryData = {};
                }else{
                    param.queryData = {
                        queryUser: $("input[type='text']").each(function () {
                            var value = $(this).val();
                        })
                    }
                };



                //ajax请求数据
                $.ajax({
                    type: 'POST',
                    url:'http://192.168.1.105:8184',
                    data: '{"action":"carsTable","params":' + param + '}',
                    dataType: 'jsonp',
                    jsonp : "callback",
                    jsonpCallback:"success_jsonpCallback",
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
    } catch (ex) {
        catchTheException('initCarsTable', ex);
    }

}

/**
 * 车辆故障列表初始化
 */
var carsTroubleTable;
function initCarsTroubleTable() {
    try {
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
                var data={

                }
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
                    url:'http://192.168.1.105:8184',
                    data: '{"action":"carsTable","params":' + param + '}',
                    dataType: 'jsonp',
                    jsonp : "callback",
                    jsonpCallback:"success_jsonpCallback",
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
    } catch (ex) {
        catchTheException('initCarsTroubleTable', ex);
    }

}

/**
 * 车辆分布地图初始化
 */
function initDisMap() {
    try {
        //初始化
        var map = new AMap.Map('carDistributeDiv', {
            center: [116.404, 39.915],//默认中心点
            zoom: 11//地图缩放级别
        });

        //添加地图工具条
        map.plugin(["AMap.ToolBar"], function () {
            map.addControl(new AMap.ToolBar());
        });

        //后台点坐标数据
        var positions = [
            "116.339850587,40.0780911672",
            "116.339950587,40.0785911672",
            "116.339750587,40.0784911672",
            "116.339450587,40.0781911672",
            "116.339350587,40.0783911672"
        ];

        //定义空数组，保存要添加的点
        var marks = [];

        //清空地图上的覆盖物
        map.clearMap();

        //遍历点数据，进行画点
        for (var i = 0; i < positions.length; i++) {
            //先将gps点转换为高德地图坐标点，然后地图画点
            AMap.convertFrom(positions[i], "gps", function (status, result) {
                var marker = new AMap.Marker({
                    position: [result.locations[0].lng, result.locations[0].lat],
                    title: 'hwh',
                    map: map
                });

                //给每一个点添加双击事件
                AMap.event.addListener(marker, 'click', renderDataShowModal);

                //保存已经添加了的点
                marks.push(marker);
            });
        }
    } catch (ex) {
        catchTheException('initDisMap', ex);
    }


}

/**
 * 显示车辆具体信息
 */
function viewCarDetail(option) {
    //给查看按钮动态绑定事件
    $(document).on('click', '.viewCarDetail', function () {

    });
}

/**
 * tabs
 */
function tabsChange() {
    try {
        $('.carInfoTabs li').click(function () {

            //tabs
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            //对应div
            $('.carInfoContent>div').hide();
            $('.carInfoContent>div').eq($(this).val()).show();
        });
    } catch (ex) {
        catchTheException('tabsChange', ex);
    }
}

/**
 * 车辆控制（视频和车辆操作）选择
 */
function checkBox() {
    try {

        //是否开启视频监控
        $('#monitorCheckbox').change(function () {
            //获取当前车辆编号
            var carId = $('#carId').html();

            if ($('#monitorCheckbox').prop('checked')) {
                $('.carMonitorVideo').show();
                $('.carInfoTabsDiv').hide();
                //连接该车辆视频
                //code...
                //发送操作请求
                var data = {
                    action:"webControl",
                    params:{
                        "car_id":$('#carId').html(),
                        "opType":5,
                        "opVal":1//开启
                    }
                }
                $.ajax({
                    type:'POST',
                    url:'http://192.168.1.105:8184',
                    data:data,
                    dataType:'jsonp',
                    jsonp:'callback',
                    jsonpCallback:'success_jsonpCallback',
                    success:function(data){
                        //data.result 0:控制成功   -1：控制失败
                        if(data.result == 0){
                            $('.carMonitorVideo').html('<canvas id="video-canvas"></canvas>')
                            var canvas = $('#video-canvas').get(0);
                            var url = 'ws://192.168.1.105:8082/';
                            new JSMpeg.Player(url, {canvas: canvas});
                        }else{
                            $('.carMonitorVideo').html('获取视频监控失败！').css({
                                color:'red',
                                lineHeight:'333px',
                                fontSize:'20px'
                            });
                        }
                    }
                });
            } else {
                $('.carMonitorVideo').hide();
                $('.carInfoTabsDiv').show();
                //关闭车辆视频连接
                //发送操作请求
                var data = {
                    action:"webControl",
                    params:{
                        "car_id":$('#carId').html(),
                        "opType":5,
                        "opVal":0//关闭
                    }
                }
                $.ajax({
                    type:'POST',
                    url:'http://192.168.1.105:8184',
                    data:data,
                    dataType:'jsonp',
                    jsonp:'callback',
                    jsonpCallback:'success_jsonpCallback',
                    success:function(data){
                        //data.result 0:控制成功   -1：控制失败
                    }
                });
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
            } else {
                $('.carHandle').hide();

                //显示车辆状态
                $('.carStatus').show();

                if($('#carType').val() == 1){//窝必达
                    //显示窝必达货柜信息
                    $('.counterDiv').show();
                }else if($('#carType').val() == 2){//窝小白

                    //隐藏位置信息（针对窝小白）
                    //$('.WXBPosition').show();
                }


            }
        });
    } catch (ex) {
        catchTheException('checkBox', ex);
    }
}
/**
 * 修改用户信息
 */
function updateUserInfo() {
    try {
        $(document).on('click', '.updateUserInfo', function () {
            //修改用户信息模态框
            $('#userUpdateModal').modal('show');
        });

        //修改用户的后台接口
        var data = {
            action:"updateUser",
            params:{"phone":"","password":"","newphone":""}
        };
        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.105:8184',
            data: data,
            dataType: 'jsonp',
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            success: function (msg) {
                var rData = msg.resData
               if(rData.result == 0){

               }else{

               }
            }
        })
    } catch (ex) {
        catchTheException('updateUserInfo', ex);
    }

}

/**
 * 删除用户
 */
function deleteUserInfo() {
    try {
        var userPhone;
        $(document).on('click', '.deleteUserInfo', function () {
            //修改用户信息模态框
            $('#deleteUserModal').modal('show');
            userPhone = $(this).val();
        });

        //删除用户的后台接

        var data = {
            action:"deketeUser",
            params:{deketeUser:userPhone}
        };
        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.105:8184',
            data: data,
            dataType: 'jsonp',
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            success: function (msg) {

            }
        })
    } catch (ex) {
        catchTheException('deleteUserInfo', ex);
    }

}

/**
 * 添加管理员
 */
function addMannager() {
    try {
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
            action:"AddManager",
            params:{"phone":"","password":"","username":""}
        };
        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.105:8184',
            data: data,
            dataType: 'jsonp',
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            success: function (msg) {
                var rData = msg.resData
                console.log(rData)
                if(rData.result == 0){

                }else{

                }
            }
        })
    } catch (ex) {
        catchTheException('addMannager', ex);
    }
}

/**
 * 修改管理员信息
 */
function updateManagerInfo() {
    try {
        $(document).on('click', '.updateManagerInfo', function () {
            //修改用户信息模态框
            $('#managerUpdateModal').modal('show');
        });

        //修改管理员的后台接口

        var data = {
            action:"updateManager",
            params:{"phone":"","password":"","newphone":""}
        };
        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.105:8184',
            data: data,
            dataType: 'jsonp',
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            success: function (msg) {
                var rData = msg.resData
                console.log(rData)
                if(rData.result == 0){

                }else{

                }
            }
        })
    } catch (ex) {
        catchTheException('updateManagerInfo', ex);
    }
}

/**
 * 删除管理员
 */
function deleteManagerInfo() {
    try {
        $(document).on('click', '.deleteManagerInfo', function () {
            //修改用户信息模态框
            $('#deleteManagerModal').modal('show');
        });

    //删除管理员的后台接口

        var data = {
            action:"deleteManager",
            params:{
                deleteManager:""
            }
        };
        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.105:8184',
            data: data,
            dataType: 'jsonp',
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            success: function (msg) {
                var rData = msg.resData
                console.log(rData)
                if(rData.result == 0){

                }
            }
        })
    } catch (ex) {
        catchTheException('deleteManagerInfo', ex);
    }
}

/**
 * 创建homewebsocket连接
 * @param options 自定义连接
 * @param callback 自定义接收数据胡函数
 */

function handleHomeWebsocket(options, callback) {
    try {
        var defaultOption = {
            data: ''//请求数据
        }
        var url = 'ws://192.168.1.105:8188';
        homeWs = new WebSocket(url)
        var relOptions = $.extend({}, defaultOption, options);
        //建立连接
        homeWs.onopen = function () {
            //发送数据
            homeWs.send(relOptions.data);
        }
        //接收数据
        homeWs.onmessage = callback;

        homeWs.onerror = function (e) {
            console.log(e);
        }

        homeWs.onclose = function () {
            homeWs.close();
        }

    } catch (ex) {
        catchTheException('handleHomeWebsocket', ex);
    }
}

/**
 * 创建单车websocket连接
 * @param options 自定义连接
 * @param callback 自定义接收数据胡函数
 */
function handleCarWebsocket(options, callback) {
    try {
        var defaultOption = {
            url: 'ws://192.168.1.105:8188',//请求地址
            data: ''//请求数据
        }
        var relOptions = $.extend({}, defaultOption, options);
        carWs = new WebSocket(relOptions.url)
        //建立连接
        carWs.onopen = function () {
            //发送数据
            carWs.send(relOptions.data);
        }
        //接收数据
        carWs.onmessage = callback;

        carWs.onerror = function (e) {
            console.log(e);
        }

        carWs.onclose = function () {
            carWs.close();
        }

    } catch (ex) {
        catchTheException('handleHomeWebsocket', ex);
    }
}
