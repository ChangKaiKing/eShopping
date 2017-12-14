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
		var bHome = mui('#breakHome')[0];
		bHome.addEventListener('tap', this.breakHome.bind(this));

	},

	breakHome: function() {

		mui.openWindow({
			url: 'main.html',
			id: 'main.html',
			createNew: false,
			extras: {
				myfrom: 'paymentSuccess'
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
}
mui.plusReady(function() {
	var page = new Page();
	page.init();
});