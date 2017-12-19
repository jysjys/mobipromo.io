$('.top_banner').css({
          'height': $('.top_banner').width() / 1.7
        });
        $('.top_banner>.container').css({
          'height': $('.top_banner>.container').width() / 1.7
        });
        $('.top_banner').particleground({
          dotColor: '#5B4F5D',
          lineColor: '#062D6C'
        });
      new WOW().init();
      var mySwiper = new Swiper('.swiper-container-carousel',{
        initialSlide :1,
        slidesPerView : 'auto',
        spaceBetween : 100,
        centeredSlides:true,
        //spaceBetween : '10%',按container的百分比
      })
      var mySwiper = new Swiper('.swiper-container-people',{
        initialSlide :0,
        slidesPerView : 'auto',
        spaceBetween : 100,
        centeredSlides:true
        //spaceBetween : '10%',按container的百分比
      })
      var mySwiper = new Swiper('.swiper-container-time',{
        initialSlide :0,
        slidesPerView : 'auto',
        spaceBetween : 100,
        centeredSlides:true,
        //spaceBetween : '10%',按container的百分比
      })
      $('.can_people_btn .left').click( function (e) {
        console.log(this)
        $(this).css({
          background: "#ffffff",
          color: '#68C9F5',
          border: '1px solid #68C9F5'
        });
        $('.right').css({
          background: '#68C9F5',
          color: '#ffffff',
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
          background: "#ffffff",
          color: '#68C9F5',
          border: '1px solid #68C9F5'
        });
        $('.left').css({
          background: '#68C9F5',
          color: '#ffffff',
        })
        $(".slide_project").css({
          display: 'none'
        })
        $('.slide_advisor').css({
          display: 'block'
        })
      })