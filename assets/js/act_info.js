var time_ago = window.location.href;
if(time_ago.split('?').length < 2, time_ago.split('&').length < 2) {
    window.location.href = 'https://www.mobipromo.io';
}else if(time_ago.split('?')[1].toString().split('&').length != 4) {
    window.location.href = 'https://www.mobipromo.io';
}
try{
    time_ago = time_ago.split('?')[1].toString().split('&');
    init();
}catch(e) {
    // console.err(e)
    window.location.href = 'https://www.mobipromo.io';
}

function time2No(num, len) {
    num = num + '';
    while(num.length < len)
        num = '0' + num;
    return num;
}

function init() {
    var activityId = time_ago[3];
    // $.ajax({
    //     type: 'POST',
    //     url: '/promo/manage/activity_oldName/checkCode',
    //     data: {query: time_ago.join(',')},
    //     async: false,
    //     success: function(data) {
    //         if(data.isFail) {
    //             window.location.href = '..';
    //             return;
    //         }else {
    //             time_ago = data.time;
    //         }
    //     },
    //     error: function() {
    //         window.location.href = '..';
    //         return;
    //     }
    // });

    let time1 =  (parseInt(time_ago[0]) - 1314) / 5;
    let time2 = time2No((parseInt(time_ago[1]) + 48732) / 3, 5);
    let time3 = time2No(parseInt(time_ago[2]) / 5 - 13782, 4);
    time_ago = parseInt('' + time1 + time2 + time3);

    var time_now = new Date().getTime();
    var time_diff = (time_now - time_ago) / 1000 / 60;
    console.log(time_now, time_ago, time_diff);
    if(time_ago + '' == 'NaN') {
        window.location.href = 'https://www.mobipromo.io';
    }else if(time_diff < 1) {
        $(".page_one").css('display', 'block');
        $('.page_two, .page_three').css('display','none');
    }else {
        $('.page_three').css('display', 'block');
        $('.page_one, .page_two').remove();
    }

    // 数量加减
    (function countNum () {
        var count = 1;
        $(".item_l i:eq(0)").on('click', function() {
            count--;
            $(".item_l i:eq(1)").css('color','#0398e1');
            if(count <= 1) {
                count = 1;
                $(this).css('color','#ccc')
            } else {
                $(this).css('color','#0398e1');
            }
            $(".item_l a").html(count);
        })
        $(".item_l i:eq(1)").on('click', function() {
            count++;
            $(".item_l i:eq(0)").css('color','#0398e1');
            if(count >= 5) {
                count = 5;
                $(this).css('color','#ccc')
            } else {
                $(this).css('color','#0398e1')
            }
            $(".item_l a").html(count);
        })
    })();

    // 提交表单
    $(".button").on('click', function () {
        if((Date.now() - time_ago) / 60 / 1000 >= 5) {
            $('.page_three').css('display', 'block')
            $('.page_one, .page_two').remove();
            $('.page_three .yuyue_s p').html('页面已过期，请重新扫码预约');
            return;
        }

        $(".warn").css('display', 'none');
        var name = $("input[name='consignee']").val().trim(),
        phone = $("input[name='telephone']").val().trim(),
        address = $('#location').val(),
        count = $('.item_l a').val(),
        address_d = $('textarea').val(),
        phone_number_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!name) {
            $(".userName_warn").css('display', 'block');
            return;
        }else if(!phone_number_reg.test(phone)) {
            $('.phone_warn').css('display', 'block')
            return;
        }else if(!address) {
            $('.adr_warn').css('display', 'block');
            return;
        }else if(!address_d) {
            $('.address_d_warn').css('display', 'block');
            return;
        }
        var data = {
            name: name,
            phone: phone,
            address: address + ' ' + address_d,
            count: count,
            activityId: activityId,
            time: time_ago
        }
        var isLoading = $(this).data('isLoading');
        if(isLoading) {
            return;
        }
        $(this).data('isLoading', true);
        $.ajax({
            type: 'POST',
            url: '/promo/manage/activity_oldName/addMember',
            data: data,
            success: function(data) {
                $(".button").data('isLoading', false);
                if(data.isSuccess) {
                    $('.page_two').css('display', 'block')
                    $('.page_one,.page_three').css('display', 'none')
                }else if(data.isFail) {
                    $('.page_three').css('display', 'block');
                    $('.page_one, .page_two').remove();
                    $('.page_three .yuyue_s p').html('请重新扫码预约');
                }else if(data.isRepeat) {
                    $('.page_three').css('display', 'block');
                    $('.page_one, .page_two').remove();
                    $('.page_three .yuyue_s p').html('此号码已经预约');
                }else if(data.isExpired) {
                    $('.page_three').css('display', 'block');
                    $('.page_one, .page_two').remove();
                    $('.page_three .yuyue_s p').html('页面已过期，请重新扫码预约');
                }
            },
            error: function() {
                $('.page_three').css('display', 'block')
                $('.page_one, .page_two').css('display', 'none')
            }
        });
    });
}








