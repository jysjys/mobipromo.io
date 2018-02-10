
$('#header').load('../common/Header.html .header-container',function () {
   var UtilSS = {}
    UtilSS.getCookie = function (name) {
        //用处理字符串的方式查找到key对应value
        var name = escape(name);
        //读cookie属性，这将返回文档的所有cookie
        var allcookies = document.cookie;
        //查找名为name的cookie的开始位置
        name += "=";
        var pos = allcookies.indexOf(name);
        //如果找到了具有该名字的cookie，那么提取并使用它的值
        if (pos != -1) { //如果pos值为-1则说明搜索"version="失败
            var start = pos + name.length; //cookie值开始的位置
            var end = allcookies.indexOf(";", start); //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
            if (end == -1) end = allcookies.length; //如果end值为-1说明cookie列表里只有一个cookie
            var value = allcookies.substring(start, end); //提取cookie的值
            value = decodeURI(value); //对它解码
            return (value);
        } else { //搜索失败，返回空字符串
            return "";
        }
    }
    var x = UtilSS.getCookie('Authorization');
    //判断用户是否已经登陆
    $.ajax({
        headers: {
            Accept: "application/json; charset=utf-8",
            Authorization: 'Bearer' + ' ' + x
        },
        url: '/promo/authed/user/account',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $(".isLoginHead").html("<a id=\"userCenter\" href=\"/dist/index.html\">个人中心</a>")
            $(".isLoginRegisterHead").html("<a id=\"loginOut\" javascript:void(0)>退出</a>")
        },
        error: function(data) {
            $(".isLoginHead").html("<a id=\"login\" href=\"/pages/login.html\">登录</a>")
            $(".isLoginRegisterHead").html("<a href=\"/pages/register.html\">注册</a>")
        }
    });
        setTimeout(function(){
            $("#loginOut").on('click', function(){
                $.ajax({
                    headers: {
                        Accept: "application/json; charset=utf-8",
                        Authorization: 'Bearer' + ' ' + x
                    },
                    url: '/promo/token/logout',
                    type: 'GET',
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        window.location.href = '/pages/login.html'
                    },
                    error: function(data) {
                    }
                });
            })
        },500)

    $(".product-over-downContainer").css({width:$(window).width()})
    $(".header-container").css({width:$(window).width()})
    $('.productPage').on('mouseover','div',function() {
        $(".productPage").css({color:'rgba(255,255,255,.87)'}) ;
        $(".trink-icon").css({borderTopColor:'rgba(255,255,255,.87)',transform:'rotate(180deg)'}) ;
        $(".product-img-list a").css({left:0});
        $('.product-over-downContainer').css({height:'206px'});
    })
    $('.productPage').on('mouseout','div', function () {
        $('.product-over-downContainer').css({height:'0px'});
        $(".productPage").css({color:'rgba(255,255,255,.54)'}) ;
        $(".trink-icon").css({borderTopColor:'rgba(255,255,255,.54)',transform:'rotate(0deg)'}) ;
        $(".product-img-list a").css({left:'80px'});
    })
    //m station click event
    $(".m-header-right-btn").click(function () {
        if($(".select-headerdown").css("display") === 'none') {
            $(".m-header-right-btn img").attr({src:'/assets/css/icon/ArtboardCopy.svg'});
            $(".select-headerdown").slideDown(200)
        } else {
            $(".m-header-right-btn img").attr({src:'/assets/css/icon/Artboard.svg'});
            $(".select-headerdown").slideUp(300)
        }
    })
    // $(".m-productPage").click(function () {
    //     if($(".m-product-lists").css("display") === 'none') {
    //         $(".m-product-lists").slideDown(200)
    //     } else {
    //         $(".m-product-lists").slideUp(300)
    //     }
    // })

});
$('#footer').load('../common/Footer.html .footer',function(){
    $('.footer-downbig-Cotainer .qq-info').on('mouseover',function() {
            $("#qq_Qrcode").css({display: 'block'})
    })
    $('.footer-downbig-Cotainer .qq-info').on('mouseout', function () {
            $("#qq_Qrcode").css({display: 'none'})
    })
    $('.footer-downbig-Cotainer .wechat-info').on('mouseover',function() {
            $("#wechat_Qrcode").css({display: 'block'})
    })
    $('.footer-downbig-Cotainer .wechat-info').on('mouseout', function () {
            $("#wechat_Qrcode").css({display: 'none'})
    })
});
