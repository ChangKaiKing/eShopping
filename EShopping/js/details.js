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

		

	},
	addHomeView: function() {

	}
}

mui.plusReady(function() {

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
			id: 511,
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

			console.log(JSON.stringify(err));

		}

	});

});