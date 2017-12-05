var ad = true, cdn = true;
        var btn_sw = true;
        $(".ad").click(function() {
            if(ad) {
                ad = !ad
                $(this).parent().animate({"height" : "665"}, 300);
            } else {
                ad = !ad
                $(this).parent().animate({"height" : "665"}, 300);
            }
        });
        $(".cdn").click(function() {
            if(ad) {
                ad = !ad
                $(this).parent().animate({"height" : "auto"}, 300);
            } else {
                ad = !ad
                $(this).parent().animate({"height" : "295px"}, 300);
            }
        });
        $("#btn_img").click(function() {
            console.log('hello')
            if(btn_sw) {
                $(this).parent('.btnn').previousSbiling().animate({"height" : "80px"}, 300);
            }else {
                $(this).parent('.btnn').previousSbiling().animate({"height" : "160px"}, 300);
            }
        });
        $('.carousel').carousel('pause');