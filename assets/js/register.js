$("#submit").click(function () {
	$(".warn").css({'display':'none'})
	var accountName = $("input[name='accountName']").val().trim(),
	password = $("input[name='password']").val().trim(),
	confirm_password = $("input[name='confirm_password']").val().trim(),
	phone_number = $("input[name='phone_number']").val().trim(),
	email = $("input[name='email']").val().trim(),
	phone_number_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	email_reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(!accountName) {
		console.log('accountName not empty')
		$(".accountName_warn").css({'display':'inline-block'});
	} else if(accountName.length < 6 || accountName.length > 20) {
		console.log('accountName length error')
		$(".accountName_warn").css({'display':'inline-block'});
	} else if(!password) {
		console.log('password not empty')
		$(".password_warn").css({'display':'inline-block'});
	} else if(password < 6 || password.length > 20) {
		console.log('password length error')
		$(".password_warn").css({'display':'inline-block'});
	} else if(!confirm_password) {
		console.log('password not empty')
		$(".confirm_password_warn").css({'display':'inline-block'});
	} else if(confirm_password != password) {
		console.log('confirm_password not repeat')
		$(".confirm_password_warn").css({'display':'inline-block'});
	} else if(!phone_number) {
		console.log('password not empty')
		$(".phone_number_warn").css({'display':'inline-block'});
	} else if(!phone_number_reg.test(phone_number)) {
		console.log('phone_number error')
		$(".phone_number_warn").css({'display':'inline-block'});
	} else if(!email_reg) {
		console.log('password not empty')
		$(".email_warn").css({'display':'inline-block'});
	} else if(!email_reg.test(email)) {
		console.log('email error')
		$(".email_warn").css({'display':'inline-block'});
	}else {
		var dataregister = {
			"account": phone_number,
			"accountName": accountName,
			"accountType": 'email',
			"country": "sdfa",
			"email": email,
			"firstName": "1",
			"idCardNumber": "12345678",
			"lastName": "7",
			"password": password,
			"phone": phone_number
		   }
		$.ajax({
		   headers: {
				  Accept: "application/json; charset=utf-8",
				  Authorization:"Basic cHJvbW9zZXJ2ZXI6ZTYxOTcyMDViYTZmOWM2"
			  },
		   type: 'POST',
		   url: '/promo/public/account',
		   data: JSON.stringify(dataregister),
		   contentType: "application/json; charset=utf-8",
			success: function (data) {
				console.log('');
				location.href = '/login.html';
			},
			error: function (data) {
				console.log(data)
				$('#submit').after('<div style="color:red;">手机号已注册！</div>');
			}
		})
	}

	  
});