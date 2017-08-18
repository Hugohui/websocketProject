var slider;

// 全局变量a和b，分别获取用户框和密码框的value值
// 全局变量a和b，分别获取用户框和密码框的value值
//用户框失去焦点后验证value值
    function oBlur_1() {
        var a = document.getElementsByTagName("input")[0].value;
        //var reg=/^[a-zA-Z]\w{5,17}$/;
        if (!a) { //用户框value值为空
            document.getElementById("remind_1").innerHTML = "请输入用户名！";
            document.getElementById("change_margin_1").style.marginBottom = 1 + "px";
        } else{ //用户框value值不为空
            document.getElementById("remind_1").innerHTML = "";
            document.getElementById("change_margin_1").style.marginBottom = 19 + "px";
        }
    }
//密码框失去焦点后验证value值
    function oBlur_2() {
        var b = document.getElementsByTagName("input")[1].value;
        if (!b) { //密码框value值为空
            document.getElementById("remind_2").innerHTML = "请输入密码！";
            document.getElementById("change_margin_2").style.marginBottom = 1 + "px";
            document.getElementById("change_margin_3").style.marginTop = 2 + "px";
        } else { //密码框value值不为空
            document.getElementById("remind_2").innerHTML = "";
            document.getElementById("change_margin_2").style.marginBottom = 19 + "px";
            document.getElementById("change_margin_3").style.marginTop = 19 + "px";
        }
    }

//用户框获得焦点的隐藏提醒
    function oFocus_1() {
        var a = document.getElementsByTagName("input")[0].value;
        document.getElementById("remind_1").innerHTML = "";
        document.getElementById("change_margin_1").style.marginBottom = 19 + "px";
    }

//密码框获得焦点的隐藏提醒
    function oFocus_2() {
        var b = document.getElementsByTagName("input")[1].value;
        document.getElementById("remind_2").innerHTML = "";
        document.getElementById("change_margin_2").style.marginBottom = 19 + "px";
        document.getElementById("change_margin_3").style.marginTop = 19 + "px";
    }
//若输入框为空，阻止表单的提交
    function buttonTest() {
        var a = document.getElementsByTagName("input")[0].value;
        var b = document.getElementsByTagName("input")[1].value;
        if (!a && !b ) { //用户框value值和密码框value值都为空
            document.getElementById("remind_1").innerHTML = "请输入用户名！";
            document.getElementById("change_margin_1").style.marginBottom = 1 + "px";
            document.getElementById("remind_2").innerHTML = "请输入密码！";
            document.getElementById("change_margin_2").style.marginBottom = 1 + "px";
            document.getElementById("change_margin_3").style.marginTop = 2 + "px";
            document.getElementById("labelTip").style.color="red";
        } else if (!a) { //用户框value值为空
            document.getElementById("remind_1").innerHTML = "请输入用户名！";
            document.getElementById("change_margin_1").style.marginBottom = 1 + "px";
            document.getElementById("labelTip").style.color="red";
        } else if(!b) { //密码框value值为空
            document.getElementById("remind_2").innerHTML = "请输入密码！";
            document.getElementById("change_margin_2").style.marginBottom = 1 + "px";
            document.getElementById("change_margin_3").style.marginTop = 2 + "px";
            document.getElementById("labelTip").style.color="red";
        }else{
            document.getElementById("labelTip").style.color="red";
        }
    }
$(function(){
    $('.content-form-signup').click(function(){



        //用户登录
        okLogin()
    })
});
/**
 * 检查用户名和密码是否输入
 */
function checkBlank(){
    //if($('.user').val() && $('.password').val()&&$('#validation').attr("value")){
    //    $('.content-form-signup').prop('disabled',false);
    //}else {
    //    $('.content-form-signup').prop('disabled',true);
    //}
}

    //滑块的验证
$(function () {
    slider = new SliderUnlock("#slider",{
        successLabelTip : "验证成功",
    },function(){
        document.getElementById('validation').value=1;
        //checkBlank();
    });
    slider.init();
})

function okLogin(){
    if($('.user').val()&& $('.password').val()&&$('#validation').attr("value") == 1){
        var username=$('#username').val();
        var password=$('#password').val();

        var data = {
            action:"webLogin",
            params:{"username":username,"password":password}
        };
        $.ajax({
            type: 'POST',
            url:'http://192.168.1.105:8184',
            data:data,
            dataType: 'jsonp',
            jsonp : "callback",
            jsonpCallback:"success_jsonpCallback",
            success: function (msg) {
                var rData = msg.resData
                console.log(rData)
                if(rData.result == 0){

                    window.localStorage.setItem('userName',username)

                    //页面跳转
                    window.location.href='index.html'
                }else if(rData.result == -1){
                    console.log(999);
                    //密码错误
                    //console.log(rData.msg);
                    document.getElementById("remind_2").innerHTML = (rData.msg);
                    document.getElementById("change_margin_2").style.marginBottom = 1 + "px";

                    //刷新页面
                    //window.location.reload()

                    //验证失败后刷新滑块

                    //$("#demoz").load(location.href+" #demoz");
                    slider.reset();
                    slider.init();
                    $('#validation').val(0);
                    $('#labelTip').html('请拖动滑块验证').css({
                        color:'#787878'
                    });
                    $('#label').css({
                        color:'black'
                    });
                }
                else{
                    //用户名不存在
                    //rData.msg
                    document.getElementById("remind_1").innerHTML = (rData.msg);
                    document.getElementById("change_margin_1").style.marginBottom = 1 + "px";

                    //刷新页面
                    //window.location.reload()

                    //验证失败后刷新滑块
                    //$("#demoz").load(location.href+" #demoz");
                    slider.reset();
                    slider.init();
                    $('#validation').val(0);
                    $('#labelTip').html('请拖动滑块验证').css({
                        color:'#787878'
                    });
                    $('#label').css({
                        color:'black'
                    });
                }
            }
        })
    }else {
        buttonTest();
        slider.reset();
        slider.init();
       $('#validation').val(0);
        $('#labelTip').html('请拖动滑块验证').css({
            color:'#787878'
        });

        if($('#validation').attr("value") == 0){
            $('#labelTip').css({
                color:'red'
            });
        }
    }

}

