function save_info () {
	var userName = $("input[name='username']").val().trim(),
	userTel = $("input[name='phone_number']").val().trim(),
	userEmail = $("input[name='mailbox']").val().trim(),
	userZipCode = $("input[name='zip_code']").val().trim(),
	addressProv = $('[name=address-level1]').val().trim(),
	addressCity = $('[name=address-level2]').val().trim(),
	addressCounty = $('[name=address-level3]').val().trim(),
	addressDetail = $("input[name=address-detail]").val().trim();
	Util.setCookie('userName', userName);
	Util.setCookie('userTel', userTel);
	Util.setCookie('userEmail', userEmail);
	Util.setCookie('userZipCode', userZipCode);
	Util.setCookie('addressProv', addressProv);
	Util.setCookie('addressCity', addressCity);
	Util.setCookie('addressCounty', addressCounty);
	Util.setCookie('addressDetail', addressDetail);
	console.log(addressDetail, Util.getCookie('addressDetail'));
}
function clean_info () {
	Util.removeCookie('userName')
	Util.removeCookie('userTel')
	Util.removeCookie('userEmail')
	Util.removeCookie('userZipCode')
	Util.removeCookie('addressProv')
	Util.removeCookie('addressCity')
	Util.removeCookie('addressCounty')
	Util.removeCookie('addressDetail')
}
// 获取cookie填充表单
(function () {
	$('input[name=username]').val(Util.getCookie('userName')),
	$('input[name=phone_number]').val(Util.getCookie('userTel')),
	$('input[name=mailbox]').val(Util.getCookie('userEmail')),
	$('input[name=zip_code]').val(Util.getCookie('userZipCode')),
	$('[name=address-level1]').val(Util.getCookie('addressProv')),
	$('[name=address-level2]').val(Util.getCookie('addressCity')),
	$('[name=address-level3]').val(Util.getCookie('addressCounty')),
	$('input[name=address-detail]').val(Util.getCookie('addressDetail'));
})()
var x = Util.getCookie('Authorization');
if (x == '' || x === undefined) {
    window.location.href = '/pages/login.html'
}
$.ajax({
    type: 'GET',
    async: false,
    headers: {
        Accept: "application/json; charset=utf-8",
        Authorization: 'Bearer' + ' ' + x
    },
    url: '/promo/authed/user/account',
    success: function (data) {
    },
	error: function() {
        window.location.href = '/pages/login.html'
	}
});
// var curPage = 1;
var commodList = new Vue({
	el: '#commodList',
	data: {
        amoutFDatas: [{}],
		curPage: 1,
        inputListCoupon: '',
		loading: true,
		fmaNoNull: false,
		remarkBox: 0,
        isOneBuyMoreMark: false,
		moreNullF: false
	},
	mounted: function() {
	},
	watch: {
	},
	computed: {
	},
	mounted () {
	},
	methods: {
        addFMa () {
			this.amoutFDatas.forEach( x => {
				if (JSON.stringify(x) === '{}'){
                    this.$message({
                        message: '不能同时添加多个空的F码',
                        type: 'error'
                    })
					this.moreNullF = true;
                    return false
                } else {
                    this.moreNullF = false
				}
			})
			if (!this.moreNullF && this.fmaNoNull) {
                this.amoutFDatas.push({})
            } else {
        		return false
			}
        },
        deletFMa (index) {
            this.moreNullF = false
            this.fmaNoNull = true
            this.amoutFDatas.splice(index,1)
		},
		// 判断f码是否为空以及失去焦点的时候检查f码是否能用
        isRightFMA (item,index) {
            console.log(item.value === '')
        	if (item.value === undefined || item.value == '') {
        		this.$set(this.amoutFDatas,index,{error:'F码不能为空'})
				this.fmaNoNull = false
				return false
			} else {
        		let vm = this
                $.ajax({
                    type: 'POST',
                    async: false,
                    headers: {
                        Accept: "application/json; charset=utf-8",
                        Authorization: 'Bearer' + ' ' + x
                    },
                    data: {
                        coupon: item.value,
                    },
                    url: '/promo/authed/coupon/check',
                    success: function (data) {
                        console.log(data)
                        if(data.not) {
                            vm.$set(vm.amoutFDatas,index,{error:'您填写的F码不存在',value:item.value})
							// 让用户不能再添加f码有误的话
							vm.moreNullF = true
							return false
                        }else if(data.isUsed) {
                            vm.$set(vm.amoutFDatas,index,{error:'您填写的F码已使用过',value:item.value})
                            vm.moreNullF = true
							return false
                        }else if(data.isLocked) {
                            vm.$set(vm.amoutFDatas,index,{error:'您填写的F码已锁定',value:item.value})
                            vm.moreNullF = true
							return false
                        } else {
                            vm.moreNullF = false
                        	if(index !== 0 && data.remark > 1) {
                                vm.$message({
                                    message: '购买力大于1，请单独购买',
                                    type: 'error'
                                })
								return false
                            }else if (index == 0 && data.remark > 1) {
                        		vm.isOneBuyMoreMark = true
                            }
                            vm.remarkBox += 1
                            vm.$set(vm.amoutFDatas,index,{error:'',value:item.value})
                            vm.fmaNoNull = true
                            $('#submit').data('isLoading', false);
                            return true
                        }
                    },
                    error: function (data) {
                        console.log('coupon_err');
                        $('#submit').data('isLoading', false);
                    }
                });
            }

			console.log(this.amoutFDatas)
		},
		fade: function(e) {
			var obj = $(e.target);
			if(obj.is('li'))
				$(e.target).next().slideToggle();
			else
				$(e.target).parents('li').next().slideToggle();
		}
	}
});
function warn_chouse () {
    var	userName = $("input[name='username']").val().trim(),
		userTel = $("input[name='phone_number']").val().trim(),
		addressProv = $('[name=address-level1]').val().trim(),
		addressCity = $('[name=address-level2]').val().trim(),
		addressCounty = $('[name=address-level3]').val().trim(),
		addressDetail = $("input[name='address-detail']").val().trim();
	var phone_number_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
		email_reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	$('.warn').remove();
	var errorContent = $('<input>', {'class': 'warn'}),
		errorWarp = $('<div class="errorWarpItem"></div>').append(errorContent);
	// if(counponsArrayVal.length>1) {
	// 	// for (var i=0;i<counponsArrayVal.length;i++) {
     //     //    if (counponsArrayVal[i] == '') {
     //     //        coupons.parent().append(errorWarp)
     //     //        errorContent.val('您填写的F码不正确！');
     //     //        return false;
     //     //    }
	// 	// }
     //    $.each(counponsArrayVal, function(index,value) {
     //    	if(value !== '') {
     //    		return true
	// 		}else if (value == '') {
     //    		console.log(111)
     //            errorWarp.appendTo($("input[name='coupon']").parent());
     //            errorContent.val('您填写的F码不正确！');
     //            return false;
     //        }
     //    })
	// }
	// if(!counponsArrayVal[0]) {
     //    errorWarp.appendTo($("[name='coupon']").parent());
     //    errorContent.val('您填写的F码不正确！');
     //    return false;
	// }
	if (!userName) {
		errorWarp.appendTo($("input[name='username']").parent());
		errorContent.val('姓名不能为空');
		return false;
	} else if (userName.length < 2 || userName.length > 20) {
		errorWarp.appendTo($("input[name='username']").parent());
		errorContent.val('姓名长度不合适');
		return;
	} else if (!userTel) {
		errorWarp.appendTo($("input[name='phone_number']").parent());
		errorContent.val('电话不能为空');
		return false;
	} else if (!phone_number_reg.test(userTel)) {
		console.log('phone_number error');
		errorWarp.appendTo($("input[name='phone_number']").parent());
		errorContent.val('不是合法的手机号码');
		return false;
	}  else if (!addressProv || !addressCity) {
		errorWarp.appendTo($("[name='address-level1']").parent());
		errorContent.val('请选择省市');
		return false;
	} else if (!addressDetail) {
		errorWarp.appendTo($("[name='address-detail']").parent());
		errorContent.val('请输入详细地址');
		return false;
	} else {
		return true;
	}
}
function btnPress(data){
    let counponsArrayVal = []
    let coupons = $("input[name='coupon']")
    coupons.each (function(){
        counponsArrayVal.push($(this).val())
    })
	let couponsString = counponsArrayVal.join(';')
	// console.log(data)
	$('.warn').remove();
    if (commodList.amoutFDatas.length > 1) {
        $('#amount').attr({value:data.remark,disabled:'false'});
        $(".userprice").html( $('#amount').val() * 899 );
        $("#zhifu label").html( '¥ ' + $('#amount').val() * 899 );
	} else {
        $('#amount').attr('placeholder',data.remark == 1 ? '您可购买1台':'您可购买(1~' + data.remark + ')台').attr('value',data.remark);
        $(".userprice").html( $('#amount').val() * 899 );
        $("#zhifu label").html( '¥ ' + $('#amount').val() * 899 );
    }
	$(".dialog_warn").css('display','none')
	warn_chouse();
	// var icoStartDate = new Date('2017/12/22 15:57:50');
	var currentdate = new Date();
	var addressProv = $('[name=address-level1]').val().trim(),
		addressCity = $('[name=address-level2]').val().trim(),
		addressCounty = $('[name=address-level3]').val().trim(),
		addressDetail = $("input[name='address-detail']").val().trim();

	var address = [
		provice[addressProv].name,
		provice[addressProv]["city"][addressCity].name,
		provice[addressProv]["city"][addressCity].districtAndCounty[addressCounty],
		addressDetail
	].join(' ');
	jsonData = {
		userName: $("input[name='username']").val().trim(),
		userTel: $("input[name='phone_number']").val().trim(),
        couponCodes: couponsString,
		receivingAddress: address
	}
	$('#upgrade_dlg').dialog();
	$('')

	$('#upgrade_dlg').find('.price-paytype').off('click').on('click', function(){
		$(this).addClass('ac').siblings('.price-paytype').removeClass('ac');
	});
	$("#amount").off('keyup').on('keyup', function(){
		var val = $(this).val().trim();
		if(val == '') {
			return;
		}
		val = parseInt(val);
		if(val + '' == 'NaN' || val < 1) {
			// $(this).val(1);
		}else if(val > parseInt(data.remark)) {
			// $(this).val(data.remark);
		}else {
			$(this).val(val);
		}
	}).focus();
	$('#zhifu').off('click').on('click', function() {
		var amountNum = $("#amount").val().trim();
		if(/^-?\d+$/.test(amountNum)) {
			amountNum = parseInt(amountNum);
			if(amountNum > parseInt(data.remark)) {
				Util.globalTopTip('超过最大限购数量', "top_error", 2000, $("#upgrade_dlg"), !0);
				return false;
			}else if(amountNum <= 0) {
				Util.globalTopTip('购买数量不能小于1', "top_error", 2000, $("#upgrade_dlg"), !0);
				return false;
			}
			var isLoading = $(this).data('isLoading');
			if(isLoading) {
				return;
			}
			$(this).data('isLoading', true);
			jsonData.buyAmount = $("#amount").val();
			jsonData.totalRmb = jsonData.buyAmount * 899;
			jsonData.paymentType = $('.price-paytype.ac').attr('tit');
			jsonData.couponCode = data.code;
			$.ajax({
				headers: {
					Accept: "application/json; charset=utf-8",
					Authorization: 'Bearer' + ' ' + x
				},
				url: '/promo/authed/coupon/sell/msg',
				data: JSON.stringify(jsonData),
				type: 'POST',
				contentType: "application/json; charset=utf-8",
				success: function(data) {
					$('#zhifu').data('isLoading', false);
					if(data.not) {
						Util.globalTopTip("您填写的F码不存在", "top_error", 2000, $("#price_dlg"), !0);
					}else if(data.isUsed) {
						Util.globalTopTip("您填写的F码已使用过", "top_error", 2000, $("#price_dlg"), !0);
					}else if(data.isLocked) {
						Util.globalTopTip("您填写的F码已锁定", "top_error", 2000, $("#price_dlg"), !0);
					}else if(data.isSuccess){
						location.href = data.httpurl;
					}else if(data.isFull) {
						Util.globalTopTip('您的代理商限购额度已满', "top_error", 2000, $("#upgrade_dlg"), !0);
					}else if(data.isOut) {
						Util.globalTopTip('您的代理商限购额度仅剩' + data.isOut + '台', "top_error", 2000, $("#upgrade_dlg"), !0);
					}else if(data.isClose) {
						Util.globalTopTip('交易已关闭', "top_error", 2000, $("#upgrade_dlg"), !0);
					}else{
						//购买失败
					}
				},
				error: function(data) {
					console.log(data)
					$('#zhifu').data('isLoading', false);
					Util.globalTopTip(data.responseJSON.reason, "top_error", 2000, $("#upgrade_dlg"), !0);
				}
			});
		}else if (!amountNum) {
			Util.globalTopTip('购买数量不能为空', "top_error", 2000, $("#upgrade_dlg"), !0);
		}else {
			Util.globalTopTip('只能输入数字', "top_error", 2000, $("#upgrade_dlg"), !0);
			console.log('err_amountNum')

		}
	});
};
//先判断f码
$('#submit').on('click', function () {
	if (!commodList.fmaNoNull) {
        return false;
    }
	$(".warn").remove();
	if(!warn_chouse()){
		return false;
	}
	//改成检查全部
    // 定义所有的f码数组
    let counponsArrayVal = []
    let coupons = $("input[name='coupon']")
	var noPayVerify = true
    coupons.each (function(){
    	if($(this).val() == '' || $(this).val() === undefined) {
            commodList.$message({
                message: 'F码不能有一个为空',
                type: 'error'
            })
			noPayVerify = false
			return false
		}
        counponsArrayVal.push($(this).val())
    });
	if (!noPayVerify) {
		return false
    } else if (commodList.moreNullF) {
		return false
	}
	console.log(444)
    $.ajax({
			type: 'POST',
			async: false,
			headers: {
			Accept: "application/json; charset=utf-8",
			Authorization: 'Bearer' + ' ' + x
		},
			data: {
                coupons: counponsArrayVal.join(';'),
			},
			url: '/promo/authed/coupon/checkall',
			success: function (data) {
				if (!data.isSuccess) {
                    commodList.$message({
                        message: data.reason,
                        type: 'error'
                    })
					return false
				} else {
                    commodList.remarkBox = Number(data.remark)
                    btnPress(data);
                    $('#submit').data('isLoading', false);
                }
		},
			error: function (jqXhr) {
			    console.log(jqXhr.status);
			    if (jqXhr.status === 401) {
                    commodList.$message({
                        message: '登录过期，请重新登录',
                        type: 'error'
                    });
                    window.location.href = '/pages/login.html'
				}
				$('#submit').data('isLoading', false);
			}
	});
});

// 购买数量 select选中事件
// var amount = $("#amount").on('change', function(){
// 	$(".userprice").html( $(this).val() * 899 );
// 	$("#zhifu label").html( '¥ ' + $(this).val() * 899 );
// });
$('#amount').on('change', function() {
	$('.userprice').html( $(this).val() * 899 );
	$("#zhifu label").html( '¥ ' + $(this).val() * 899 );
});

var jsonDate = {};

var addrShow = $('#addr-show');
var prov = $('#prov');
var city = $('#city');
var country = $('#country');

/*用于保存当前所选的省市区*/
var current = {
	prov: '',
	city: '',
	country: ''
};

/*自动加载省份列表*/
(function showProv() {
	var len = provice.length;
	for (var i = 0; i < len; i++) {
		var provOpt = document.createElement('option');
		provOpt.innerText = provice[i]['name'];
		provOpt.value = i;
		prov.append(provOpt);
	}
}
)();

var provCookie = Util.getCookie('addressProv');
var cityCookie = Util.getCookie('addressCity');
var cryCookie = Util.getCookie('addressCounty');
if(provCookie) {
	$("#prov").val(provCookie).change();
}
if(cityCookie) {
	$('#city').val(cityCookie).change();
}
if(cryCookie) {
	$("#country").val(cryCookie).change();
}

/*根据所选的省份来显示城市列表*/
function showCity(obj) {
	var val = obj.options[obj.selectedIndex].value;
	if (val != current.prov) {
		current.prov = val;
		addrShow.val('');
	}
	//console.log(val);
	if (val != null) {
		city[0].length = 1;
		country[0].length = 1;
		var cityLen = provice[val]["city"].length;
		for (var j = 0; j < cityLen; j++) {
			var cityOpt = document.createElement('option');
			cityOpt.innerText = provice[val]["city"][j].name;
			cityOpt.value = j;
			city.append(cityOpt);
		}
	}
}

/*根据所选的城市来显示县区列表*/
function showCounty(obj) {
	var val = obj.options[obj.selectedIndex].value;
	current.city = val;
	if (val != null) {
		country[0].length = 1; //清空之前的内容只留第一个默认选项
		var countryLen = provice[current.prov]["city"][val].districtAndCounty.length;
		if (countryLen == 0) {
			addrShow.val(provice[current.prov].name + '-' + provice[current.prov]["city"][current.city].name);
			return;
		}
		for (var n = 0; n < countryLen; n++) {
			var countyOpt = document.createElement('option');
			countyOpt.innerText = provice[current.prov]["city"][val].districtAndCounty[n];
			countyOpt.value = n;
			country.append(countyOpt);
		}
	}
}
