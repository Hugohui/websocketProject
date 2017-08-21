/**
 * Created by Administrator on 2017/8/8 0008.
 */
/***********车辆操控***************/
//单车键盘操控
;(function (w) {

    //车辆信息
    var carConfig= {
        state:{
            speed:0,//初始速度
            wheelAng:0//转向角度
        },
        keypress: {
            up: false,//上
            left: false,//下
            right: false,//右
            down: false,//左
            ctrl:false,//刹车
            D:false,//前进挡
            R:false,//后退挡
            N:false//空挡
        },
        gears:{
            D:'1',
            R:'2',
            N:'3'
        }
    }

    //纵向操控数据
    var YDate = {
        handleYData:{
            type:1,
            value:''
        },
        handleValue:{
            0:0,
            1:150,
            2:300,
            3:450,
            4:600,
            5:750,
            6:900,
            7:1050,
            8:1200,
            9:1350,
            10:1500
        },
        oldValue:0
    }

    //横向操控数据
    var XData = {
        handleXData:{
            type:'3',
            value:''
        },
        handleValue:{
            "-3":'-30',
            "-2":'-20',
            "-1":'-10',
            "-0":'0',
            0:0,
            1:10,
            2:20,
            3:30
        },
        oldValue:0
    }

    //车辆id
    var carId;

    $(window).on({
        keyup:keyUp,
        keydown:keyDown
    });
    function keyUp(e) {
        move(e, false);
    }
    function keyDown(e) {
        move(e, true);
    }

    //检测移动类型
    function move(e, isKeyDown) {
        //从页面获取车辆id
        carId= $('#carId').html();

        //存在小车id并且车辆控制台可见
        if(carId == '--' || !$('.carHandle').is(':visible')){
            return;
        }

        //指定按键以外，组织浏览器默认
        if(e.keyCode >= 37 && e.keyCode <= 40 && e.keyCode == 17) {
            e.preventDefault();
        }

        if(e.keyCode === 37) {
            carConfig.keypress.left = isKeyDown;
        }

        if(e.keyCode === 38) {
            carConfig.keypress.up = isKeyDown;
        }

        if(e.keyCode === 39) {
            carConfig.keypress.right = isKeyDown;
        }

        if(e.keyCode === 40) {
            carConfig.keypress.down = isKeyDown;
        }

        if(e.keyCode === 17) {
            carConfig.keypress.ctrl = isKeyDown;
            /*********刹车***********/
            //刹车类型0x02，刹车（0：释放，1：刹车）

            if(carConfig.keypress.ctrl){
                //页面显示刹车信息
                $('.isCtrlCar').html('踩下');
                //发送刹车请求
                handleAjax(2,1,carId);

            }else{
                //页面显示刹车信息
                $('.isCtrlCar').html('释放');
                //发送刹车请求
                handleAjax(2,0,carId);
            }

        }

        /****************档位控制********************/
        //换挡类型0x06,档位（0：N档，1：D档，2：R档）

        if(e.keyCode === 68) {//前进档
            carConfig.keypress.D = isKeyDown;

            //页面显示档位信息
            //只有车辆速度为0时才能设置档位
            if(!carConfig.keypress.D){//键盘弹起时
                if($('.speedPercent').html() == 0 &&$('.gearsHtml').html() != 'D'){
                    //显示当前档位
                    $('.gearsHtml').html('D');

                    //发送换挡信息
                    handleAjax(6,1,carId);
                }else{
                    toastr.warning('车辆已经是D档，或者车辆正在倒车！');
                }
            }
        }

        if(e.keyCode === 82) {//倒档
            carConfig.keypress.R = isKeyDown;

            if(!carConfig.keypress.R){//键盘弹起时判断
                if($('.speedPercent').html() == 0 && $('.gearsHtml').html() != 'R'){
                    //显示档位信息
                    $('.gearsHtml').html('R');

                    //发送换挡信息
                    handleAjax(6,2,carId);
                }else{
                    toastr.warning('车辆已经是R档，或者车辆正在行驶！');
                }
            }

        }

        if(e.keyCode === 78) {//空挡
            carConfig.keypress.N = isKeyDown;

            if(!carConfig.keypress.N){
                if($('.gearsHtml').html() != 'N'){
                    //显示党档位信息
                    $('.gearsHtml').html('N');

                    //发送换挡信息
                    handleAjax(6,0,carId);
                }else{
                    toastr.warning('车辆已经是N档!');
                }
            }
        }

        /*************控制速度和方向**************/
        controlCar();
    }

    //控制速度和方向
    function controlCar(){

        /*********车辆加速***********/
        //加速类型0x01
        if(carConfig.keypress.up && $('.gearsHtml').html() != 'N'){

            //操控类型
            //YDate.handleYData.type =carConfig.gears[$('.gearsHtml').html()];//D - 1 - 前进；R - 2 - 后退；N - 3 - 空档
            YDate.handleYData.type =1;//油门

            //加速
            //当速度小于1500或者当
            if(carConfig.state.speed<1500){
                carConfig.state.speed +=0.1+carConfig.state.speed*0.05;

                //获取倍数
                var tempValue = String((carConfig.state.speed/150)).split('.')[0];

                //判断倍数是否在数据对象中
                if(YDate.handleValue.hasOwnProperty(tempValue)){
                    //操控数据
                    YDate.handleYData.value = YDate.handleValue[tempValue];

                    //当倍数改变是发送请求
                    if(YDate.oldValue != tempValue){
                        //改变原始倍数
                        YDate.oldValue =tempValue;

                        //发送控制请求
                        handleAjax(YDate.handleYData.type,YDate.handleYData.value,carId);
                    }
                }
            }else{
                //carConfig.state.speed = 1500;
            }
        }

        /**********车辆减速*************/
        if(carConfig.keypress.down && $('.gearsHtml').html() != 'N'){
            //操控类型
            //YDate.handleYData.type =carConfig.gears[$('.gearsHtml').html()];//D - 1 - 前进；R - 2 - 后退；N - 3 - 空档
            YDate.handleYData.type =1;//油门

            //减速
            if(carConfig.state.speed>0){
                carConfig.state.speed -=carConfig.state.speed*0.05+0.1;

                //获取倍数
                var tempValue = String((carConfig.state.speed/150)).split('.')[0];

                //判断倍数是否在数据对象中
                if(YDate.handleValue.hasOwnProperty(tempValue)){
                    //操控数据
                    YDate.handleYData.value = YDate.handleValue[tempValue];

                    //当倍数改变是发送请求
                    if(YDate.oldValue != tempValue){
                        //改变原始倍数
                        YDate.oldValue =tempValue;

                        //发送控制请求
                        handleAjax(YDate.handleYData.type,YDate.handleYData.value,carId);
                    }
                }
            }else{
                carConfig.state.speed = 0;
            }

            //数据控制请求
            //handleAjax(YDate.handleYData);
        }

        /*********车辆转向***********/
        //转向类型0x03

        if(carConfig.keypress.right){//右转

            if(carConfig.state.wheelAng>=0&&carConfig.state.wheelAng<30){
                //转向角度
                carConfig.state.wheelAng +=0.05+ carConfig.state.wheelAng*0.05;

            }else if(carConfig.state.wheelAng>=-30&&carConfig.state.wheelAng<-2){
                //转向角度
                carConfig.state.wheelAng -=0.05+ carConfig.state.wheelAng*0.05;

            }else if(carConfig.state.wheelAng>=-2&&carConfig.state.wheelAng<0){
                carConfig.state.wheelAng = 0;
            }else if(carConfig.state.wheelAng>=30){
                carConfig.state.wheelAng = 30;
            }else{
                carConfig.state.wheelAng = -30;
            }

            //获取倍数
            var tempValue = String((carConfig.state.wheelAng/10)).split('.')[0];

            //判断倍数是否在数据对象中
            if(XData.handleValue.hasOwnProperty(tempValue)){
                //操控数据
                XData.handleXData.value = XData.handleValue[tempValue];

                //当倍数改变是发送请求
                if(XData.oldValue != tempValue){
                    //改变原始倍数
                    XData.oldValue =tempValue;

                    console.log(XData.handleXData.value);

                    //发送控制请求
                    handleAjax(XData.handleXData.type,XData.handleXData.value,carId);
                }
            }

        }

        if(carConfig.keypress.left){//左转

            if(carConfig.state.wheelAng>0&&carConfig.state.wheelAng<=30){//角度为正值
                carConfig.state.wheelAng -=0.05+ carConfig.state.wheelAng*0.05;
            }else if(carConfig.state.wheelAng>-30&&carConfig.state.wheelAng<=-2){//角度为负值
                carConfig.state.wheelAng +=0.05+ carConfig.state.wheelAng*0.05;
            }else if(carConfig.state.wheelAng>-2 && carConfig.state.wheelAng <=0){
                carConfig.state.wheelAng = -2;
            }else if(carConfig.state.wheelAng>30){
                carConfig.state.wheelAng = 30;
            }else{
                carConfig.state.wheelAng = -30;
            }

            //获取倍数
            var tempValue = String((carConfig.state.wheelAng/10)).split('.')[0];

            //判断倍数是否在数据对象中
            if(XData.handleValue.hasOwnProperty(tempValue)){
                //操控数据
                XData.handleXData.value = XData.handleValue[tempValue];

                //当倍数改变是发送请求
                if(XData.oldValue != tempValue){
                    //改变原始倍数
                    XData.oldValue =tempValue;

                    console.log(XData.handleXData.value);

                    //发送控制请求
                    handleAjax(XData.handleXData.type,XData.handleXData.value,carId);
                }
            }
        }else{
            XData.handleXData.value =0;
        }

        //页面显示车辆油门百分比
        var speedPercent = ((carConfig.state.speed)/15).toFixed(0)>100?'100':((carConfig.state.speed)/15).toFixed(0);
        $('.speedPercent').html(speedPercent);

        //页面显示转向角度百分比
        var wheelAngPerpent= (carConfig.state.wheelAng*100/30).toFixed(0);
        $('.wheelAngPercent').html(wheelAngPerpent);

    }

    /**
     * 车辆操控
     * @param type  操控类型
     * @param val   操控值
     * @param carId 车辆id
     */
    function handleAjax(type,val,carId){
        var data = {
            action:"webControl",
            params:{
                car_id:carId,
                opType:type,
                opVal:val
            }
        }
        //发送操作请求
        $.ajax({
            type:'POST',
            url:'http://111.204.101.170:8184',
            data:data,
            dataType:'jsonp',
            jsonp:'callback',
            jsonpCallback:'success_jsonpCallback',
            success:function(data){
                //data.result 0:控制成功   -1：控制失败
            }
        });
    }
})(window)