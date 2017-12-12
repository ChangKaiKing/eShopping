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
		
	},
	addUserPsd: function() {
		
	},
	
	
}
mui.plusReady(function() {
	var page = new Page();
	page.init();
});