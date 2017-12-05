var ad = true, cdn = true;
        var btn_sw = true;
        $(".ad").click(function() {
            console.log('hello')
            if(ad) {
                ad = !ad
                $(this).parent().animate({"height" : "665px"}, 300);
            } else {
                ad = !ad
                $(this).parent().animate({"height" : "295px"}, 300);
            }
        });
        $(".cdn").click(function() {
            if(ad) {
                ad = !ad
                $(this).parent().animate({"height" : "665px"}, 300);
            } else {
                ad = !ad
                $(this).parent().animate({"height" : "295px"}, 300);
            }
        });
        $('.carousel').carousel('pause');