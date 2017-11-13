function Page() {
	var username=null;
	var password=null;
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

		if(username == "") {
			alert("用户名不能为空");
			return false;
		}
		if(password == "") {
			alert("密码不能为空");
			return false;
		}
		//console.log("dataobj");

		$.ajax({

			type: "POST",
			//url: "http://localhost/article/list/suggest?page=1&type=refresh&count=30",//不能访问
			//url: "https://api.douban.com/v2/book/search?q=%E5%93%88%E5%88%A9%E6%B3%A2%E7%89%B9&count=20", //可以访问
			//url:"http://192.168.10.14:8088/demo3",
			//url:"http://i1y8030025.iok.la/ayc/device.action",
			//url: "http://192.168.10.75:53436/Handler.ashx",
			//url: "http://192.168.10.7:8080/login",
			//url: "http://i1y8030025.iok.la/login",
			//url: "http://192.168.10.222:7070/login",
			//url: "http://111.204.156.218:7070/login",
			url:"http://111.204.156.218:8085/login",
			dataType: 'jsonp',
			async: false,
			//jsonp: 'jsonp', //回调函数名的key值 可省略
			//jsonpCallback: 'jsonp', //回调函数的函数名 可省略
			crossDomain: true,
			beforeSend: function() {
				//console.log(this.username);
			},
			data: {

				Username: this.username,
				Password: this.password
			},
			success: function(datatext) {
				//alert("1");
				//获取全部json数据
				//alert(JSON.stringify(datatext));
				
				if(datatext.success==true){
					location.href="main.html"
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
mui.plusReady(function() {
	var page = new Page();
	page.init();
});