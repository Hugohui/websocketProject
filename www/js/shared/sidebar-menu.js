$.sidebarMenu = function(menu) {
    var animationSpeed = 300;

    $(menu).on('click', 'li a', function(e) {

        //被点击的a
        var $this = $(this);

        //禁止用户指南导航改变样式
        if($this.hasClass('userGuideA')){
            return;
        }

        //同级ul
        var checkElement = $this.next();

        if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function() {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent("li").removeClass("active");
        }

        //If the menu is not visible
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            //Get the parent menu
            var parent = $this.parents('ul').first();
            //Close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            //Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            //Get the parent li
            var parent_li = $this.parent("li");

            //Open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function() {
                //Add the class active to the parent li
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');
                var currentPage = $('.breadNav li.active').html().trim(),
                    visibleLis = checkElement.find('li'),
                    i = 0;
                for(i;i<visibleLis.length;i++){
                    if($(visibleLis[i]).html().indexOf(currentPage) !== -1){
                        $(visibleLis[i]).addClass('active');
                    }
                }
            });
        }else{
            $this.parent('li').siblings().removeClass('active');
            $this.parent('li').addClass('active');
            $this.parent('li').siblings().find('ul').slideUp(animationSpeed, function() {
                $this.parent('li').siblings().removeClass('active');
            });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
        }
    });
}
