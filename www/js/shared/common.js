/**
 * Created by Administrator on 2017/8/3 0003.
 */
$(function(){
    toggleSelectGroup();
})

/**
 * Ñ¡Ôñ°´Å¥ÇÐ»»
 */
function toggleSelectGroup(){
    $(document).on('click','.selectGroup>div', function () {
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).find('i').hide();
        }else{
            $(this).addClass('active').siblings().removeClass('active');
            $(this).siblings().find('i').hide();
            $(this).find('i').show();
        }
    });
}