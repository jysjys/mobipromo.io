
function save_info () {
	var userName = $("input[name='username']").val().trim(),
	userTel = $("input[name='phone_number']").val().trim(),
	userEmail = $("input[name='mailbox']").val().trim(),
	userZipCode = $("input[name='zip_code']").val().trim(),
	addressProv = $('[name=address-level1]').val().trim(),
	addressCity = $('[name=address-level2]').val().trim(),
	addressCounty = $('[name=address-level3]').val().trim(),
	addressDetail = $("input[name='address-detail']").val().trim();
	Util.setCookie('userName', userName, 1)
	Util.setCookie('userTel', userTel, 1)
	Util.setCookie('userEmail', userEmail, 1)
	Util.setCookie('userZipCode', userZipCode, 1)
	Util.setCookie('addressProv', addressProv, 1)
	Util.setCookie('addressCity', addressCity, 1)
	Util.setCookie('addressCounty', addressCounty, 1)
	Util.setCookie('addressDetail', addressDetail, 1)
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

// var curPage = 1;
var commodList = new Vue({
	el: '#commodList',
	data: {
		list:[],
		curPage: 1,
		loading: true
	},
	mounted: function() {
		this.getList();
	},
	methods: {
		getList: function () {
			var isLoading = $('.more_btn').data('isLoading');
			if(isLoading) {
				return;
			}
			$('.more_btn').data('isLoading', true);
			var self = this;
			$.ajax({
				headers: {
					Accept: "application/json; charset=utf-8",
					Authorization: 'Bearer' + ' ' + x
				},
				type: 'POST',
				data: JSON.stringify({
					curPage: self.curPage
				}),
				contentType: "application/json; charset=utf-8",
				url: '/promo/authed/coupon/selllist',
				success: function(data) {
					self.loading = false;
					if(data.data.length == 0) {
						$('.more_btn').text('没有更多订单了！');
						return;
					}
					self.list = self.list.concat(data.data);
					if(data.data.length < 10) {
						$('.more_btn').text('没有更多订单了！');
						return;
					}
					self.curPage++;
					$('.more_btn').data('isLoading', false);
				},
				error: function (data) {
					if(data.responseJSON.error == 'invalid_token') {
						location.href = './indexlogin.html';
					}
				}
			})
		},
		fade: function(e) {
			var obj = $(e.target);
			if(obj.is('li'))
				$(e.target).next().slideToggle();
			else
				$(e.target).parents('li').next().slideToggle();
		},
		payagain: function (item) {
			$('#price_dlg').dialog();
			$('#price_dlg').find('.price-paytype').off('click').on('click', function(){
				$(this).addClass('ac').siblings('.price-paytype').removeClass('ac');
			});
			$('#price_dlg').find('.price-date').text(item.buyAmount + ' 台');
			$('#price_dlg').find('.userprice').text(item.totalRmb);
			$('#zhifu2').off('click').on('click', function(){
				//完成未支付
				var isLoading = $(this).data('isLoading');
				if(isLoading) {
					return;
				}
				$(this).data('isLoading', true);
				$.ajax({
					headers: {
						Accept: "application/json; charset=utf-8",
						Authorization: 'Bearer' + ' ' + x
					},
					url: '/promo/alipay/coupon/order/payagain',
					data: JSON.stringify({tradeNumber: item.tradeNumber}),
					type: 'POST',
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						console.log(data)
						$(".dialog_warn2").css('display', 'none');
						if(data.not) {
							Util.globalTopTip("您填写的F码不存在", "top_error", 2000, $("#price_dlg"), !0);
						}else if(data.isUsed) {
							Util.globalTopTip("您填写的F码已使用过", "top_error", 2000, $("#price_dlg"), !0);
						}else if(data.isLocked) {
							Util.globalTopTip("您填写的F码已锁定", "top_error", 2000, $("#price_dlg"), !0);
						}
						else if(data.isFull) {
							Util.globalTopTip("您的代理商限购额度已满", "top_error", 2000, $("#price_dlg"), !0);
						}else if(data.isOut) {
							Util.globalTopTip('您的代理商限购额度仅剩' + data.isOut + '台', "top_error", 2000, $("#upgrade_dlg"), !0);
						}else if(data.isClose) {
							Util.globalTopTip('交易已关闭', "top_error", 2000, $("#upgrade_dlg"), !0);
						}else if(data.isSuccess) {
							location.href = data.httpurl;
						}else if(data.isNull) {
							//购买失败
							Util.globalTopTip("订单不存在", "top_error", 2000, $("#price_dlg"), !0);
						}
						$('#zhifu2').data('isLoading', false);
						console.log(data);
					},
					error: function(data) {
 						if(data.responseJSON.error == 'invalid_token') {
							location.href = './indexlogin.html';
						}
						$('#zhifu2').data('isLoading', false);
						Util.globalTopTip("订单不存在", "top_error", 2000, $("#price_dlg"), !0);
					}
				});
			}).find('label').text('¥ ' + item.totalRmb);
		},
		cancel: function(item, e) {
			var isLoading = $(e.target).data('isLoading');
			if(isLoading) {
				return;
			}
			var self = this;
			$.confirm({
				content: "您将要取消订单<b>" + item.tradeNumber + "</b>, 是否继续？",
				onConfirm: function() {
				$.ajax({
					headers: {
						Accept: "application/json; charset=utf-8",
						Authorization: 'Bearer' + ' ' + x
					},
					type: 'POST',
					data: JSON.stringify({tradeNumber:item.tradeNumber}),
					contentType: "application/json; charset=utf-8",
					url: '/promo/alipay/order/cancel',
					success: function(data) {
						console.log(data)
						item.status = 'cancel';
					},
					error: function (data) {
						console.log(data);
						console.log('fail')
					}
				});
				}
			});
		}
	}
});

function warn_chouse () {
	var boxName = $("input[name='device_name']").val().trim(),
		userName = $("input[name='username']").val().trim(),
		userTel = $("input[name='phone_number']").val().trim(),
		userEmail = $("input[name='mailbox']").val().trim(),
		userZipCode = $("input[name='zip_code']").val().trim(),
		addressProv = $('[name=address-level1]').val().trim(),
		addressCity = $('[name=address-level2]').val().trim(),
		addressCounty = $('[name=address-level3]').val().trim(),
		addressDetail = $("input[name='address-detail']").val().trim(),
		coupon = $("input[name='coupon']").val().trim();
		// buyAmount = $("[name='buyAmount']").val().trim() * 1;
	var phone_number_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
		email_reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	$('.warn').remove();
	var errorContent = $('<input>', {'class': 'warn'}),
		errorWarp = $('<div/>').append(errorContent);
	if (!boxName) {
		errorWarp.appendTo($("input[name='device_name']").parent());
		errorContent.val('设备名称不能为空');
		return false;
	} else if (!userName) {
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
	} else if (!userEmail) {
		errorWarp.appendTo($("input[name='mailbox']").parent());
		errorContent.val('邮箱不能为空');
		return false;
	} else if (!email_reg.test(userEmail)) {
		console.log('email error');
		errorWarp.appendTo($("input[name='mailbox']").parent());
		errorContent.val('不是合法的邮箱');
		return false;
	} else if (!userZipCode) {
		errorWarp.appendTo($("input[name='zip_code']").parent());
		errorContent.val('邮编不能为空');
		return false;
	} else if (!addressProv || !addressCity) {
		errorWarp.appendTo($("[name='address-level1']").parent());
		errorContent.val('请选择省市');
		return false;
	} else if (!addressDetail) {
		errorWarp.appendTo($("[name='address-detail']").parent());
		errorContent.val('请输入详细地址');
		return false;
	} else if (!coupon) {
		errorWarp.appendTo($("[name='coupon']").parent());
		errorContent.val('您填写的F码不正确！');
		return false;
	} else {
		return true;
	}
}

function btnPress(data){

	// console.log(data)
	$('.warn').remove();
	$('#amount').attr('placeholder',data.remark == 1 ? '您可购买1台':'您可购买(1~' + data.remark + ')台');
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
		boxName: $("input[name='device_name']").val().trim(),
		userName: $("input[name='username']").val().trim(),
		userTel: $("input[name='phone_number']").val().trim(),
		userEmail: $("input[name='mailbox']").val().trim(),
		userZipCode: $("input[name='zip_code']").val().trim(),
		coupon: $("input[name='coupon']").val().trim(),
		receivingAddress: address
	}
	$('#upgrade_dlg').dialog();
	// $('#upgrade_dlg').find('.price').off('click').on('click', function(){
	// $(this).addClass('ac').siblings('.price').removeClass('ac');
	// 	$('#zhifu label').text('¥ ' + $(this).find('.userprice').text());
	// });
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

$('#submit').on('click', function () {
	$(".warn").remove();
	if(!warn_chouse()){
		return false;
	}
	var isLoading = $(this).data('isLoading');
	if(isLoading) {
		return;
	}
	$(this).data('isLoading', true);
	var isSaveInfo = $("input[type='checkbox']").is(':checked');
	if(isSaveInfo) {
		save_info();
	}else {
		clean_info();
	}
	$.ajax({
			type: 'POST',
			async: false,
			headers: {
			Accept: "application/json; charset=utf-8",
			Authorization: 'Bearer' + ' ' + x
		},
			data: {
				coupon: $("input[name='coupon']").val().trim(),
			},
			url: '/promo/authed/coupon/check',
			success: function (data) {
				var errorContent = $('<input>', {'class': 'warn'}),
			errorWarp = $('<div/>').append(errorContent);
			$(".warn").remove();
			if(data.not) {
				errorWarp.appendTo($("input[name='coupon']").parent());
				errorContent.val('您填写的F码不存在!');
			}else if(data.isUsed) {
				errorWarp.appendTo($("input[name='coupon']").parent());
				errorContent.val('您填写的F码已使用过!');
			}else if(data.isLocked) {
				errorWarp.appendTo($("input[name='coupon']").parent());
				errorContent.val('您填写的F码已锁定!');
			}
			// else if(data.isFull) {
			// 	errorWarp.appendTo($("input[name='coupon']").parent());
			// 	errorContent.val('您填写的F码过多!');
			// }else if(data.isOut) {
			// 	errorWarp.appendTo($("input[name='coupon']").parent());
			// 	errorContent.val('您所拥有的F码已满!');
			// }
			else {
				btnPress(data);
			}
			$('#submit').data('isLoading', false);
		},
			error: function (data) {
				console.log('coupon_err');
				$('#submit').data('isLoading', false);
			}
	});
});

// 购买数量 select选中事件
var amount = $("#amount").on('change', function(){
	$(".userprice").html( $(this).val() * 899 );
	$("#zhifu label").html( '¥ ' + $(this).val() * 899 );
});
$('#amount').on('input propertychange', function() {
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
