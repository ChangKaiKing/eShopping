function Page(dataall) {

	this.dataall = dataall;

}
Page.prototype = {

	constructor: Page,
	init: function() {
		mui.init();

		this.bindEvents();

	},
	bindEvents: function() {
		console.log(this.dataall.data.images.length);
		var $itemEnd = $("<div class='mui-slider-item mui-slider-item-duplicate'><a href='#'><img src='" + this.dataall.data.images[this.dataall.data.images.length - 1] + "'> </a> </div>");
		$("#picLoop").append($itemEnd);
		for(var i = 0; i < this.dataall.data.images.length; i++) {
			if(i == 0) {

				var $itemEnd = $("<div class='mui-slider-item'><a href='#'><img src='" + this.dataall.data.images[i] + "'></a></div>");
				$("#picLoop").append($itemEnd);
				var addId = $("<div class='mui-indicator mui-active'></div>");
				$("#idLoop").append(addId);
			} else {
				var $itemEnd = $("<div class='mui-slider-item'><a href='#'><img src='" + this.dataall.data.images[i] + "'></a></div>");
				$("#picLoop").append($itemEnd);
				var addId = $("<div class='mui-indicator'></div>");
				$("#idLoop").append(addId);
			}

		}
		var $itemEnd = $("<div class='mui-slider-item mui-slider-item-duplicate'><a href='#'><img src='" + this.dataall.data.images[0] + "'> </a> </div>");
		$("#picLoop").append($itemEnd);
		mui("#slider").slider({
			interval: 3000
		});

		var $subtitle = $("<span>" + this.dataall.data.subheading + "</span>");
		$("#introduce_text").append($subtitle);

		var $addMoney=$("<span class='introduce_color'>￥"+this.dataall.data.price+"</span><s><span>￥"+this.dataall.data.marketPrice+"</span></s>");
		$("#addmoney").append($addMoney);
	}

}

mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var picId = self.picId;
	console.log("详情页面" + picId);
	$.ajax({

		type: "POST",
		url: "http://111.204.156.218:8085/product/showOneProduct",
		dataType: 'jsonp',
		async: false,
		//jsonp: 'jsonp', //回调函数名的key值 可省略
		//jsonpCallback: 'jsonp', //回调函数的函数名 可省略
		crossDomain: true,
		beforeSend: function() {
			//console.log(this.username);
		},
		data: {
			id: picId,
		},
		success: function(datatext) {
			//alert("1");
			//获取全部json数据
			//alert(JSON.stringify(datatext));
			console.log(JSON.stringify(datatext));
			if(datatext.success == true) {
				var page = new Page(datatext);
				page.init();
			}
			//dataobj = datatext;
			//console.log(dataobj);
			//alert(datatext);
		},
		error: function(err) {

		}

	});

});