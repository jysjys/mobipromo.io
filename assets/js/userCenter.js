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
			// window.location.href='../indexlogin.html';
		}
	}
	var x = getCookieValue('Authorization');
	console.log(x)


    var commodList = new Vue({
		el: '#accordion',
		data: {
			list: '',
			curPage: 1
		},
		mounted: function() {
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
					self.list = data.data;
					self.curPage++;
				},
				error: function (data) {
					console.log(data);
					console.log('fail')
				}
			});
		},
		methods: {
			getList: function () {
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
						self.list = self.list.concat(data.data);
						self.curPage++;
					},
					error: function (data) {
						console.log(data);
						console.log('fail')
					}
				});
			},
			payagain: function(e) {
				var self = this
				$('#price_dlg').dialog();
				$('#price_dlg').find('.price-paytype').off('click').on('click', function(){
					$(this).addClass('ac').siblings('.price-paytype').removeClass('ac');
				});
				$('#price_dlg').find('.price-date').text(self.list[e.target.dataset.id].buyAmount + ' 台');
				$('#price_dlg').find('.userprice').text(self.list[e.target.dataset.id].totalRmb);
				$("#zhifu2").off('click').on('click', function () {
					// console.log(self.zhifu2)
					self.zhifu2(e);
				})
			},
			zhifu2: function (e) {
				var isLoading = $(this).data('isLoading');
				if(isLoading) {
					return;
				}
				$(this).data('isLoading', true);
				var self = this;
				console.log(typeof self.list[e.target.dataset.id].tradeNumber)
				console.log(x)
				$.ajax({
					headers: {
						Accept: "application/json; charset=utf-8",
						Authorization: 'Bearer' + ' ' + x
					},
					url: '/promo/alipay/coupon/order/payagain',
					data: JSON.stringify({tradeNumber:self.list[e.target.dataset.id].tradeNumber}),
					type: 'POST',
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						console.log(data);
						$(".dialog_warn2").css('display', 'none');
						if(data.not) {
							globalTopTip("您填写的F码不存在", "top_error", 2000, $("#price_dlg"), !0);
						}else if(data.isUsed) {
							globalTopTip("您填写的F码已使用过", "top_error", 2000, $("#price_dlg"), !0);
						}else if(data.isLocked) {
							globalTopTip("您填写的F码已锁定", "top_error", 2000, $("#price_dlg"), !0);
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
			},
			getUserlist: function(curPage) {
				$.ajax({
					type: 'POST',
					async: false,
					url: '/promo/manage/index/loadUsers',
					data: {
						passMD5: ID,
						curPage: curPage
					},
					success: function (data) {
						console.log(data);
						if(data.fail) {
							window.location.href = './login.html';
							return;
						}
						userList.list = data.list;
					$('#pager').empty().pagination(curPage, data.total, data.count, this.getUserlist);
					},
				})
			},
			cancel: function(e) {
				var isLoading = $(this).data('isLoading');
				if(isLoading) {
					return;
				}
				var self = this;
				console.log(self.list[e.target.dataset.id].tradeNumber)
				var item = self.list[e.target.dataset.id];
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
		}
	});




















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









	