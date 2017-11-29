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

		for(var i = 0; i < this.dataall.data.length; i++) {
			if(i % 2 == 0) {
				var $item = $("<div class='item' onclick='action(" + this.dataall.data[i].id + ")'><img src='" + this.dataall.data[i].images[1] + "'/><div class='wf-setnum'><span class='num'>" + this.dataall.data[i].price + "</span><span class='text'>元/cm²</span></div></div>");
				$("#itemleft").append($item);
			} else {

				var $item = $("<div class='item' onclick='action(" + this.dataall.data[i].id + ")'><img src='" + this.dataall.data[i].images[1] + "'/><div class='wf-setnum' style='right:3%'><span class='num'>" + this.dataall.data[i].price + "</span><span class='text'>元/cm²</span></div></div>");
				$("#itemright").append($item);
			}
		}

	},
	addHomeView: function() {

	}
}

mui.plusReady(function() {

	$.ajax({

		type: "POST",
		url: "http://111.204.156.218:8085/list",
		dataType: 'jsonp',
		async: false,
		//jsonp: 'jsonp', //回调函数名的key值 可省略
		//jsonpCallback: 'jsonp', //回调函数的函数名 可省略
		crossDomain: true,
		beforeSend: function() {
			//console.log(this.username);
		},
		data: {
			username: "123",
		},
		success: function(datatext) {
			//alert("1");
			//获取全部json数据
			//alert(JSON.stringify(datatext));

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

function action(i) {
	mui.openWindow({
		url: 'details.html',
		id: 'details.html',
		extras: {
			id: i,
		}
	});
}