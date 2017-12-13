function Page() {

}
Page.prototype = {

	constructor: Page,
	init: function() {
		mui.init();

		this.bindEvents();

	},
	bindEvents: function() {
		console.log(plus.storage.getItem("usernameId")+"");
		if(plus.storage.getItem("usernameId") == null) {
			var userLogin = mui('.userlogin')[0];
			userLogin.addEventListener('tap', this.userLoginAddUser.bind(this));
		} else {
			$('.signin').text(plus.storage.getItem("usernameId")+"");
		}

	},
	userLoginAddUser: function() {

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
		mui.back;

	}
}
mui.plusReady(function() {
	var page = new Page();
	page.init();
});