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
		var addUser = mui("#addUser")[0];
		addUser.addEventListener('tap', this.addUserPsd.bind(this))
	},
	addUserPsd: function() {
		mui.openWindow({
			url: 'register.html',
			id: 'register.html',
		});
	},
	checkUser: function() {

		this.username = mui("#username")[0].value;
		this.password = mui("#password")[0].value;

		if(this.username == "") {
			alert("用户名不能为空");

		} else if(this.password == "") {
			alert("密码不能为空");

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
					console.log(JSON.stringify(datatext));

					if(datatext.success == true) {
						plus.storage.removeItem("usernameId");
						console.log(datatext.data.username + "");
						plus.storage.setItem("usernameId", datatext.data.username + "");
						mui.openWindow({
							url: 'main.html',
							id: 'main.html',
							createNew: false,
							extras: {
								myfrom: 'userLogin'
							},
							show: {
								autoShow: true, //页面loaded事件发生后自动显示，默认为true
								duration: 500 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
							},
							waiting: {
								autoShow: true, //自动显示等待框，默认为true
								title: '正在加载...', //等待对话框上显示的提示内容
							}

						});
						plus.webview.currentWebview().close();
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