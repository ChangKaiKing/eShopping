function Page() {

}
Page.prototype = {

	constructor: Page,
	init: function() {
		mui.init();

		this.bindEvents();

	},
	bindEvents: function() {
		var userLogin = mui('.userlogin')[0];
		userLogin.addEventListener('tap', this.userLoginAddUser.bind(this));
	},
	userLoginAddUser: function() {

		mui.openWindow({
			url: 'index.html',
			id: 'index.html',
		});

	}
}
mui.plusReady(function() {
	var page = new Page();
	page.init();
});