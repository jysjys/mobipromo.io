$('.top_banner').css({
          'height': $('.top_banner').width() / 1.7
        });
        $('.top_banner>.container').css({
          'height': $('.top_banner>.container').width() / 1.7
        });
        $('.top_banner').particleground({
          dotColor: '#2F425E',
          lineColor: '#5C5162'
        });
      new WOW().init();
      // var mySwiper = new Swiper('.swiper-container-carousel',{
      //   initialSlide :0,
      //   slidesPerView : 1,
      //   spaceBetween : 100,
      //   grabCursor : true,
      //   freeMode : true,
      //   // centeredSlides:true,
      //   //spaceBetween : '10%',按container的百分比
      // })
      var mySwiper = new Swiper('.swiper-container-people',{
        initialSlide :0,
        slidesPerView : 'auto',
        spaceBetween : 100,
        grabCursor : true,
        freeMode : true,
        centeredSlides:true,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next'
        // autoplay : 5000
        //spaceBetween : '10%',按container的百分比
      })
      var mySwiper = new Swiper('.swiper-container-time',{
        initialSlide :0,
        slidesPerView : 'auto',
        spaceBetween : 100,
        grabCursor : true,
        freeMode : true,
        centeredSlides:true,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        autoplay : 5000
        //spaceBetween : '10%',按container的百分比
      })
      $('.can_people_btn .left').click( function (e) {
        console.log(this)
        $(this).css({
          background: '#68C9F5',
          color: '#ffffff',
        });
        $('.right').css({
          background: "#ffffff",
          color: '#68C9F5',
          border: '1px solid #68C9F5'
        })
        $(".slide_project").css({
          display: 'block'
        })
        $('.slide_advisor').css({
          display: 'none'
        })
      })
      $('.can_people_btn .right').click( function (e) {
        $(this).css({
          background: '#68C9F5',
          color: '#ffffff',
        });
        $('.left').css({
          background: "#ffffff",
          color: '#68C9F5',
          border: '1px solid #68C9F5'
        })
        $(".slide_project").css({
          display: 'none'
        })
        $('.slide_advisor').css({
          'display': 'block'
        })
        $('.project').css({
          'transform':'translate3d(0px, 0px, 0px)'
        })
      })


function getCookieValue(name){  /**获取cookie的值，根据cookie的键获取值**/  
    //用处理字符串的方式查找到key对应value  
    var name = escape(name);  
    //读cookie属性，这将返回文档的所有cookie  
    var allcookies = document.cookie;         
    //查找名为name的cookie的开始位置  
    name += "=";  
    var pos = allcookies.indexOf(name);      
    //如果找到了具有该名字的cookie，那么提取并使用它的值  
    if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败  
        var start = pos + name.length;                  //cookie值开始的位置  
        var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置  
        if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie  
        var value = allcookies.substring(start,end); //提取cookie的值  
        return (value);                           //对它解码        
    }else{  //搜索失败，返回空字符串  
        return "";  
    }  
} 