function Page() {
	var username = null;
	var password = null;
}
Page.prototype = {

	constructor: Page,
	init: function() {
		mui.init();

		this.bindEvents();

	},
	bindEvents: function() {
		var login = mui('#Signin')[0];
		login.addEventListener('tap', this.checkUser.bind(this));
	},
	checkUser: function() {

		this.username = mui("#username")[0].value;
		this.password = mui("#password")[0].value;

		if(this.username == "") {
			alert("用户名不能为空");
			return false;
		} else if(this.password == "") {
			alert("密码不能为空");
			return false;
		} else {
			//console.log("dataobj");

			$.ajax({

				type: "POST",
				url: "http://111.204.156.218:8085/login",
				dataType: 'jsonp',
				async: false,
				//jsonp: 'jsonp', //回调函数名的key值 可省略
				//jsonpCallback: 'jsonp', //回调函数的函数名 可省略
				crossDomain: true,
				beforeSend: function() {
					//console.log(this.username);
				},
				data: {

					username: this.username,
					password: this.password
				},
				success: function(datatext) {
					//alert("1");
					//获取全部json数据
					//alert(JSON.stringify(datatext));

					if(datatext.success == true) {
						mui.openWindow({
							url: 'main.html',
							id: 'main.html',
							extras: {
								name: this.username,
							}
						});
					}
					//dataobj = datatext;
					//console.log(dataobj);
					//alert(datatext);
				},
				error: function(err) {

					console.log(JSON.stringify(err));

				}

			});
		}
	}
}
mui.plusReady(function() {
	var page = new Page();
	page.init();
});