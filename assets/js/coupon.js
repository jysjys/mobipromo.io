

	function getCookieValue(name) { /**获取cookie的值，根据cookie的键获取值**/
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
			return (value); //对它解码
		} else { //搜索失败，返回空字符串
			return "";
		}
	}

	// $("input[name='username']").val('sgwe'),
	// $("input[name='phone_number']").val('18219273817'),
	// $("input[name='mailbox']").val('123@qq.com'),
	// $("input[name='zip_code']").val(100000),
	// $("input[name='address-detail']").val('wgwwgew'),
	// $("input[name='coupon']").val('h5QzWHa');
	// $("input[name='device_name']").val(''),
	// addressProv = $('[name=address-level1]').val(),
	// addressCity = $('[name=address-level2]').val(),
	// addressCounty = $('[name=address-level3]').val(),


	// 获取用户订购商品列表
	function getList() {
		$.ajax({
			headers: {
				Accept: "application/json; charset=utf-8",
				Authorization: 'Bearer' + ' ' + x
			},
			type: 'GET',
			contentType: "application/json; charset=utf-8",
			url: '/promo/authed/coupon/selllist',
			success: function(result) {
				console.log(result)
				var data = result.data;
				var listTradeNum = '';
				var listone = '';
				var listtwo = '';
				var list_buyAmount = '';
				var list_adree = '';
				var list_phone = '';
				var list_price = '';
				var list_status = '';
				for (var i = 0; i < data.length; i++) {
					listTradeNum += '<li>' + data[i].tradeNumber + '</li>';
					listone += '<li>' + data[i].boxName + '</li>';
					listtwo += '<li>' + data[i].userName + '</li>';
					list_buyAmount += '<li>' + data[i].buyAmount + '</li>';
					list_adree += '<li>' + data[i].receivingAddress + '</li>';
					list_phone += '<li>' + data[i].userTel + '</li>';
					list_price += '<li>' + data[i].totalRmb + '</li>';
					list_status += '<li>' + (data[i].status == 'ok' ? '已付款' : '<a href="javascript:">未确认</a>') + '</li>';
				}
				$(".list_tradeNum").html('<li>订单编号</li>' + listTradeNum);
				$(".listone").html('<li>设备名称</li>' + listone);
				$(".listtwo").html('<li>用户名</li>' + listtwo);
				$('.list_buyAmount').html('<li>数量</li>' + list_buyAmount);
				$('.list_adree').html('<li>收件地址</li>' + list_adree);
				$(".list_phone").html('<li>联系电话</li>' + list_phone);
				$(".list_price").html('<li>总金额</li>' + list_price);
				$(".list_status").html('<li>状态</li>' + list_status).find('a').off('click').on('click', function() {
					var index = $(this).parent().index() - 1;
					$('#price_dlg').dialog();
					$('#price_dlg').find('.price-paytype').off('click').on('click', function(){
						$(this).addClass('ac').siblings('.price-paytype').removeClass('ac');
					});
					$('#price_dlg').find('.price-date').text(data[index].buyAmount + ' 台');
					$('#price_dlg').find('.userprice').text(data[index].totalRmb);
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
							data: JSON.stringify({tradeNumber:data[index].tradeNumber}),
							type: 'POST',
							contentType: "application/json; charset=utf-8",
							success: function(data) {
								$(".dialog_warn2").css('display', 'none');
								if(data.not) {
									globalTopTip("您填写的优惠码不存在", "top_error", 2000, $("#price_dlg"), !0);
									
								}else if(data.isUsed) {
									globalTopTip("您填写的优惠码已使用过", "top_error", 2000, $("#price_dlg"), !0);
								}else if(data.isLocked) {
									globalTopTip("您填写的优惠码已锁定", "top_error", 2000, $("#price_dlg"), !0);
								}
								else if(data.isFull) {
									globalTopTip("您的代理商限购额度已满", "top_error", 2000, $("#price_dlg"), !0);
								}else if(data.isOut) {
									globalTopTip("您的代理商限购额度已满", "top_error", 2000, $("#price_dlg"), !0);
								}




								$(this).data('isLoading', false);
								console.log(data);
								if(data.isSuccess){
									location.href = data.httpurl;
								}else{
									//购买失败
									globalTopTip("订单不存在", "top_error", 2000, $("#price_dlg"), !0);
								}
							},
							error: function(data) {
								$(this).data('isLoading', false);
								globalTopTip("订单不存在", "top_error", 2000, $("#price_dlg"), !0);
							}
						});

					}).find('label').text('¥ ' + data[index].totalRmb);
				});
			},
			error: function(data) {
				console.log(data)
				if(!data.isSuccess){
					location.href = '/indexlogin.html';
				}
			}
		});
	}


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
		} else if (!addressProv || !addressCity || !addressCounty) {
			errorWarp.appendTo($("[name='address-level1']").parent());
			errorContent.val('请选择省市');
			return false;
		} else if (!addressDetail) {
			errorWarp.appendTo($("[name='address-detail']").parent());
			errorContent.val('请输入详细地址');
			return false;
		} else if (!coupon) {
			errorWarp.appendTo($("[name='coupon']").parent());
			errorContent.val('您填写的优惠码不正确！');
			return false;
		} else {
			return true;
		}
	}
	function btnPress(data){
		// console.log(data)
		$('.warn').remove();
		$('#amount').attr('placeholder','该优惠码最多限购' + data.remark + '台');
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
		$("#amount").on('keyup', function(){
			var val = parseInt($(this).val().trim());
			if(val+'' != 'NaN' || val < 1) {
				$(this).val(1);
			}else if(val > parseInt(data.remark)) {
				$(this).val(data.remark);
			}
		}).focus()
		$('#zhifu').off('click').on('click', function(){
			var amountNum = parseInt($("#amount").val().trim());
			if(amountNum+'' != 'NaN') {
				if(amountNum > parseInt(data.remark)) {
					globalTopTip('超过最大限购数量', "top_error", 2000, $("#upgrade_dlg"), !0);
					return false;
				}else if(amountNum <= 0) {
					globalTopTip('购买数量不能小于1', "top_error", 2000, $("#upgrade_dlg"), !0);
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
				console.log(jsonData)
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
						console.log(data);
						$('#zhifu').data('isLoading', false);
						if(data.isSuccess){
							location.href = data.httpurl;
						}else if(data.isFull) {
							globalTopTip('您的代理商限购额度已满', "top_error", 2000, $("#upgrade_dlg"), !0);
							return false;
						}else if(data.isOut) {
							globalTopTip('您的代理商限购额度仅剩' + data.isOut + '台', "top_error", 2000, $("#upgrade_dlg"), !0);
							return false;
						}else{
							//购买失败
							getList();
						}
					},
					error: function(data) {
						console.log(data)
						$('#zhifu').data('isLoading', false);
						globalTopTip(data.responseJSON.reason, "top_error", 2000, $("#upgrade_dlg"), !0);
					}
				});
			}else if (!amountNum) {
				globalTopTip('购买数量不能为空', "top_error", 2000, $("#upgrade_dlg"), !0);
			}else {
				globalTopTip('只能输入数字', "top_error", 2000, $("#upgrade_dlg"), !0);
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
					errorContent.val('您填写的优惠码不存在!');
				}else if(data.isUsed) {
					errorWarp.appendTo($("input[name='coupon']").parent());
					errorContent.val('您填写的优惠码已使用过!');
				}else if(data.isLocked) {
					errorWarp.appendTo($("input[name='coupon']").parent());
					errorContent.val('您填写的优惠码已锁定!');
				}
				// else if(data.isFull) {
				// 	errorWarp.appendTo($("input[name='coupon']").parent());
				// 	errorContent.val('您填写的优惠码过多!');
				// }else if(data.isOut) {
				// 	errorWarp.appendTo($("input[name='coupon']").parent());
				// 	errorContent.val('您所拥有的优惠码已满!');
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
	// var amount = $("#amount").on('change', function(){
	//  	 $(".userprice").html( $(this).val() * 899 );
	// 	 $("#zhifu label").html( '¥ ' + $(this).val() * 899 );
	// });
	$('#amount').bind('input propertychange', function() {  
	    $('.userprice').html( $(this).val() * 899 );  
	    $("#zhifu label").html( '¥ ' + $(this).val() * 899 );
	}); 
	var x = getCookieValue('Authorization');

	getList();


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
	})();

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

	$.fn.dialog = function(option) {
		var dlgWin = $(this);
		if ("string" == typeof option)
			"close" == option && (dlgWin.find(".dialog-close").trigger("click"),
			null != $("#window-mask") && $("#window-mask").hide());
		else {
			var defaults = {
				fixed: !0,
				closable: !0,
				mask: !0
			};
			option = $.extend(defaults, option),
			option || (option = {});
			var title = "";
			option.title ? title = option.title : dlgWin.attr("title") && (title = dlgWin.attr("title"),
			dlgWin.attr("title", "")),
			dlgWin.addClass("dialog-box").show();
			var closeBtn = $("<div class='dialog-close'>&times;</div>").appendTo(dlgWin);
			closeBtn.bind("click", function() {
				if (!option.onClose || 0 != option.onClose()) {
					// $.mask("close"),
					dlgWin.hide(),
					dlgWin.removeClass("dialog-box").find(".dialog-close").remove();
					var title = dlgWin.find(".dialog-title");
					dlgWin.attr("title", title.text()),
					title.remove(),
					$(window).unbind("resize.dialog")
				}
			}),
			dlgWin.find(".close").on("click", function() {
				closeBtn.click()
			}),
			option.closable && closeBtn.show(),
			"" != title && dlgWin.prepend("<h2 class='dialog-title'>" + title + "</h2>"),
			// option.mask && $.mask(),
			$(window).bind("resize.dialog", function() {
				var outerWidth = dlgWin.outerWidth()
				  , outerHeight = dlgWin.outerHeight()
				  , top = 0;
				option.fixed ? (dlgWin.css("position", "fixed"),
				top = ($(window).height() - outerHeight) / 2 + "px") : (dlgWin.css("position", "absolute"),
				top = ($(window).height() - outerHeight) / 2 + $(document).scrollTop() + "px");
				var left = ($(window).width() - outerWidth) / 2 + "px";
				dlgWin.css({
					top: top,
					left: left
				})
			}),
			$(window).trigger("resize.dialog"),
			dlgWin.find(".dialog-title").draggable({
				target: dlgWin
			});
		}
		return dlgWin
	}

	$.fn.draggable = function(a) {
		var b = {
			target: "default",
			clone: !1,
			undrag: "",
			scroll: !0,
			start: function() {},
			drag: function() {},
			end: function() {}
		}
		  , c = $.extend(b, a);
		return $(this).off("mousedown.drag").on("mousedown.drag", function(a) {
			$(document).on("selectstart.drag dragstart", function() {
				return !1
			});
			var b = $(this)
			  , d = "string" == typeof c.target && "default" == c.target ? b : c.target
			  , e = a.pageX
			  , f = a.pageY
			  , g = d.offset().left
			  , h = d.offset().top;
			c.clone && (d = b.clone().removeAttr("id").css("position", "absolute").offset({
				left: g,
				top: h
			}),
			"function" == typeof c.clone && (c.clone.call(d, a),
			g = 1 * d.css("left").replace("px", ""),
			h = 1 * d.css("top").replace("px", "")),
			c.opacity && d.css("opacity", c.opacity)),
			$(document).on("mousemove.drag", function(a) {
				b.hasClass("ondrag") || (b.addClass("ondrag"),
				c.clone && d.appendTo(b.parent()),
				c.start.call(b[0], a));
				var i = a.pageX - e + g
				  , j = a.pageY - f + h;
				if (c.bounding) {
					var k = c.bounding.offset().left
					  , l = c.bounding.offset().top;
					i > k && j > l && i < k + c.bounding.outerWidth() - d.outerWidth() && j < l + c.bounding.outerHeight() - d.outerHeight() && d.offset({
						left: i,
						top: j
					})
				} else
					d.offset({
						left: i,
						top: j
					});
				c.drag.call(b[0], a)
			}),
			$(document).on("mouseup.drag", function(a) {
				c.end.call(b[0], a),
				c.clone && d.remove(),
				$(document).off("selectstart.drag dragstart"),
				$(document).off("mousemove.drag"),
				$(document).off("mouseup.drag"),
				$(".drop-hover").length || b.removeClass("ondrag")
			}),
			$(this).on("mouseup.drag", function(a) {
				$(document).trigger("mouseup.drag"),
				$(this).off("mouseup.drag")
			})
		}),
		c.undrag && $(this).find(c.undrag).off("mousemove.drag").on("mousemove.drag", function(a) {
			a.stopPropagation()
		}).on("dragstart", function() {
			return !1
		}),
		this
	}

	globalTopTip = function(a, b, c, d, e) {
	    if ("undefined" != typeof a) {
	        null == c && (c = 5e3),
	        null == b && (b = "top_success");
	        var f = $("#global_top_dialog");
	        f.length > 0 && f.remove(),
	        f = $('<div id="global_top_dialog" class="global_top_dialog"><div class="left_arrow"></div>' + a + '<div class="right_arrow"></div></div>').appendTo("body"),
	        f.addClass(b),
	        e && (f.find(".left_arrow").remove(),
	        f.find(".right_arrow").remove(),
	        f.addClass("noarrow"));
	        var g = f.outerWidth();
	        d ? f.css("top", $(d).offset().top + "px") : 0 == $("#header").length && f.css("top", "0px"),
	        f.css({
	            "margin-left": -(.5 * g) + "px"
	        }).show(),
	        setTimeout(function() {
	            f.addClass("show"),
	            setTimeout(function() {
	                f.removeClass("show"),
	                setTimeout(function() {
	                    f.fadeOut("slow").remove()
	                }, 250)
	            }, c)
	        }, 50)
	    }
	}