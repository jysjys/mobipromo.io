

var str_url = window.location.href;
var time_ago ='www.mobipromo.io/index.html?8889&1921343163&38605&4';
time_ago= time_ago.split('?')[1].toString().split('&');
var activityId = time_ago[3];
time_ago =  Number('' + (time_ago[0] - 1314)/5+time_ago[1]/3+time_ago[2]/5);
var time_now = new Date().getTime();
var time_diff = (time_now - time_ago)/1000/60;
console.log(time_now)
console.log(time_diff)
if(activityId != 4) {
    console.log(err);
    window.location.href = 'http://www.mobipromo.io/index.html';
} else if(time_ago + '' == 'NaN') {
    window.location.href = 'http://www.mobipromo.io/index.html';
} else if(time_diff>0&&time_diff<1) {
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
        if(count <= 1) {
            count = 1;
            $(this).css('color','#ccc')
        } else {
            count --;
            $(this).css('color','#0398e1')

        }
        $(".item_l a").html(count);
    })
    $(".item_l i:eq(1)").on('click', function() {
        console.log('hello')
        if(count >= 5) {
            count = 5;
            $(this).css('color','#ccc')

        } else {
            count ++;
            $(this).css('color','#0398e1')

        }
        $(".item_l a").html(count);
    })
})()


// 提交表单
// $(".button").on('click', function () {
//     var isLoading = $(this).data('isLoading');
//     if(isLoading) {
//         return;
//     }
//     $(this).data('isLoading', true)
//     $(".warn").css('display', 'none');
//     var name = $("input[name='consignee']").val().trim(),
//     phone = $("input[name='telephone']").val().trim(),
//     address = $('#location').val(),
//     count = $('.item_l a').val(),
//     address_d = $('textarea').val(),
//     phone_number_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
//     console.log($('.item_l a').val())
//     if(!name) {
//         $(".userName_warn").css('display', 'block');
//         return;
//     }else if(!phone_number_reg.test(phone)) {
//         console.log('h')
//         $('.phone_warn').css('display', 'block')
//         return;
//     }else if(!address) {
//         $('.adr_warn').css('display', 'block');
//         return;
//     } else if(!address_d) {
//         $('.address_d_warn').css('display', 'block')
//     } else{
//         var data = {
//             name: name,
//             phone: phone,
//             address: address + ' ' + address_d,
//             count: count,
//             activityId: activityId

//         }
//         console.log(data);
//         $.ajax({
//             type: 'POST',
//             url: '/promo/manage/activity/addMember',
//             data: data,
//             success: function(data) {
//                     $(this).data('isLoading', false);
//                 if(data.isSuccess) {
//                     $('.page_two').css('display', 'block')
//                     $('.page_one,.page_three').css('display', 'none')
//                 } else if(data.isFail) {
//                     $('.page_three').css('display', 'block')
//                     $('.page_one, .page_two').css('display', 'none')
//                     $('.page_three .yuyue_s p').html('请重新扫码预约');
//                 }
//             },
//             error: function() {
//                 $('.page_three').css('display', 'block')
//                 $('.page_one, .page_two').css('display', 'none')
//             }
//         })
//     }
// })








