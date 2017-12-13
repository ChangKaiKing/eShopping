function Page() {

}
Page.prototype = {

	constructor: Page,
	init: function() {
		mui.init();

		this.bindEvents();

	},
	bindEvents: function() {

		var self = plus.webview.currentWebview();
		$('#cmySbd').text(self.cmySbd);
		$('#cmyName').text(self.cmyName);
		$("#cmySrc").show();
		mui("#cmySrc")[0].setAttribute("src", self.cmySrc);
		var sizes = new Array();
		sizes = self.cmySize.split("*");
		var cmyNum = $('#commodity_num').val();
		var cmySize = sizes[0] * sizes[1] * self.cmyMoy;
		plus.storage.removeItem("cs");
		plus.storage.setItem("cs", cmySize + "");
		$("#cmyMoney").text(cmySize);

		console.log("商品id" + self.cmyId);
		console.log("商品单价" + self.cmyMoy);
		console.log("商品名称" + self.cmyName);
		console.log("商品介绍" + self.cmySbd);
		console.log("尺寸:" + self.cmySize);
		console.log("自定义图片路径：" + self.cmySrc);
		console.log("一件的价格:" + cmySize);
		console.log("存储一件的价格为:" + plus.storage.getItem("cs"));
		mui('#address')[0].addEventListener('tap', this.addUserRess.bind(this));
		mui('#payment')[0].addEventListener('tap', this.nowPayment.bind(this));
	},
	addUserRess: function() {

		$('#addUserRess').show();
	},
	nowPayment: function() {
		var self = plus.webview.currentWebview();
		var ress = $('#ress').val();
		var contacts = $('#contacts').val();
		var phone = $('#phone').val();
		console.log("收货地址" + ress);
		if(self.cmyId == null) {
			alert("商品错误，请重新打开");
		} else if(plus.storage.getItem("usernameId") == null) {
			alert("用户未登录");
			mui.openWindow({
				url: 'index.html',
				id: 'index.html',
				createNew: false,
				show: {
					autoShow: true, //页面loaded事件发生后自动显示，默认为true
					duration: 500 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				},
				waiting: {
					autoShow: true, //自动显示等待框，默认为true
					title: '正在加载...', //等待对话框上显示的提示内容
				}

			});
		} else if(ress == "" || contacts == "" || phone == "") {
			alert("请补全收货信息");
		} else {
			var cmyMoney = $('#cmyMoney').text();
			console.log("准备上传");
			$.ajax({

				type: "POST",
				url: "http://111.204.156.218:8085/order/buy",
				dataType: 'jsonp',
				async: false,
				//jsonp: 'jsonp', //回调函数名的key值 可省略
				//jsonpCallback: 'jsonp', //回调函数的函数名 可省略
				crossDomain: true,
				beforeSend: function() {
					//console.log(this.username);
				},
				data: {
					username: plus.storage.getItem("usernameId"),
					address: $('#ress').val(),
					status: $('#contacts').val(),
					telephone: $('#phone').val(),
					productId: self.cmyId,
					size: self.cmySize,
					uploadFile: "",
					amount: $('#amount').val(),
					orderPrice: cmyMoney,
					remarks: $('#remarks').val(),

				},
				success: function(datatext) {
					//alert("1");
					//获取全部json数据
					alert(JSON.stringify(datatext));

					if(datatext.success == true) {

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

function OnInput(event) {
	var cs = plus.storage.getItem("cs");
	console.log(event.target.value);
	console.log(cs);
	$("#cmyMoney").text(cs * event.target.value);
}
//将图片压缩转成base64 
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	// calculate the width and height, constraining the proportions 
	if(width > height) {
		if(width > 100) {
			height = Math.round(height *= 100 / width);
			width = 100;
		}
	} else {
		if(height > 100) {
			width = Math.round(width *= 100 / height);
			height = 100;
		}
	}
	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/
	var dataURL = canvas.toDataURL("image/png", 0.8);
	return dataURL.replace("data:image/png;base64,", "");
}