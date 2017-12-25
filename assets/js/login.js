function addCookie(name,value, exdays){ 
		var d = new Date();  
    	d.setTime(d.getTime() + (exdays*24*60*60*1000));  
    	var expires = "expires="+d.toUTCString();    /**添加设置cookie**/  
	    var name = name;  
	    var value = escape(value);
	    document.cookie = name + "=" + value + "; " + expires; 
}  
function getCookieValue(name){  /**获取cookie的值，根据cookie的键获取值**/  
    //用处理字符串的方式查找到key对应value  
    var name = escape(name);  
    //读cookie属性，这将返回文档的所有cookie  
    var allcookies = document.cookie;         
    //查找名为name的cookie的开始位置  
    name += "=";  
    var pos = allcookies.indexOf(name);      
    //如果找到了具有该名字的cookie，那么提取并使用它的值  
    if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败  
        var start = pos + name.length;                  //cookie值开始的位置  
        var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置  
        if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie  
        var value = allcookies.substring(start,end); //提取cookie的值  
        return (value);                           //对它解码        
    }else{  //搜索失败，返回空字符串  
        return "";  
    }  
} 
var x = getCookieValue('Authorization');
$("#submit").click(function () {
	var datalogin = {
		username: $("input[name='username']").val().trim(),
		password: $("input[name='password']").val().trim(),
		grant_type: "password"
	}
	$.ajax({
	   headers: {
	          Accept: "application/json; charset=utf-8",
	    	  Authorization:"Basic cHJvbW9zZXJ2ZXI6ZTYxOTcyMDViYTZmOWM2"
	      },
	   type: 'POST',
	   url: '/promo/token',
	   data: datalogin,
	   contentType: "application/x-www-form-urlencoded",
		success: function (data) {
    		addCookie('Authorization', data.access_token, 1);
			// if() {
			// 	window.location.href='./verification.html'
			// }else {
				
			// 	window.location.href="./presale.html"
			// }
			window.location.href='../activity/1.html'
		},
		error: function (data) {
			$(".login_warn").css({
				'display': 'inline-block'
			})
		}
	});
});