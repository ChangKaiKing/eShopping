function Page() {
	var username = null;
}
Page.prototype = {

	constructor: Page,
	init: function() {
		mui.init();

		this.bindEvents();

	},
	bindEvents: function() {
		var isTrue = mui('#isTrue')[0];
		isTrue.addEventListener('tap', this.userNameIsTrue.bind(this));
		var addusercontent = mui('#addusercontent')[0];
		addusercontent.addEventListener('tap', this.addUser.bind(this));
	},
	userNameIsTrue: function() {
		var username = mui('#adduasrname')[0].value;

		if(this.username == "") {
			alert("请填写账号");
		} else {
			//console.log("dataobj");
			console.log("keyi");

			//			$.post("http://111.204.156.218:8085/checkUsername", {
			//					username: this.username,
			//				}
			//
			//				function(data, status) {
			//					alert(alert(JSON.stringify(data));)
			//				});
			$.ajax({
				type: 'POST',
				url: "http://111.204.156.218:8085/checkUsername",
				dataType: 'jsonp',
				async: false,
				//jsonp: 'jsonp', //回调函数名的key值 可省略
				//jsonpCallback: 'jsonp', //回调函数的函数名 可省略
				crossDomain: true,
				data: {
					username: username,
				},
				success: function(datatext) {
					//alert("1");
					//获取全部json数据
					//alert(JSON.stringify(datatext.status));
					console.log(datatext.status);

					if(datatext.status == 1) {
						$("#noName").text("");
						$("#yesName").text("该用户名可以注册");
					} else {
						$("#yesName").text("");
						$("#noName").text("该用户名已经存在");
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
	},
	addUser: function() {
		var username = mui('#adduasrname')[0].value;
		var psd = mui('#addpsd')[0].value;
		var myname = mui('#addname')[0].value;
		var userid = mui('#adduserid')[0].value;
		var email = mui('#addemail')[0].value;
		var phone = mui('#addphone')[0].value;
		if(this.username == "") {
			alert("用户名不能为空");

		} else if(psd == "") {
			alert("密码不能为空");

		} else {
			$.ajax({

				type: "POST",
				url: "http://111.204.156.218:8085/register",
				dataType: 'jsonp',
				async: false,
				//jsonp: 'jsonp', //回调函数名的key值 可省略
				//jsonpCallback: 'jsonp', //回调函数的函数名 可省略
				crossDomain: true,
				data: {
					username: username,
					password: psd,
					email: email,
					name: myname,
					telephone: phone,
					identity: userid,
				},
				success: function(datatext) {
					//alert("1");
					//获取全部json数据
					console.log(datatext.msg);
					alert(JSON.stringify(datatext.msg));

					if(datatext.msg == "注册成功") {
						mui.openWindow({
							url: 'index.html',
							id: 'index.html',
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