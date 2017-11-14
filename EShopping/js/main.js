function Page() {
	var username = null;
	var password = null;
	var addJou = null;
	var addHome = null;
	var addSp = null;
	var addMy = null;
}
Page.prototype = {

	constructor: Page,
	init: function() {
		mui.init({
			subpages: [{
				url: 'mainlist.html',
				id: 'a1',
				styles: {
					top: '45px', //mui标题栏默认高度为45px；
					bottom: '49px' //默认为0px，可不定义；
				}
			}],
			preloadPages: [ //缓存其他页面 
				{
					url: 'journalism.html',
					id: 'a2',
					styles: {
						top: '45px', //mui标题栏默认高度为45px；
						bottom: '49px' //默认为0px，可不定义；
					}
				},
				{
					url: 'shoppingcart.html',
					id: 'a3',
					styles: {
						top: '45px', //mui标题栏默认高度为45px；
						bottom: '49px' //默认为0px，可不定义；
					}
				},
				{
					url: 'my.html',
					id: 'a4',
					styles: {
						top: '45px', //mui标题栏默认高度为45px；
						bottom: '49px' //默认为0px，可不定义；
					}
				}
			]
		});

		this.bindEvents();

	},
	bindEvents: function() {
		this.addHome = plus.webview.getWebviewById('a1');
		this.addJou = plus.webview.getWebviewById('a2');
		this.addSp = plus.webview.getWebviewById('a3');
		this.addMy = plus.webview.getWebviewById('a4');
		var home = mui('#home')[0];
		home.addEventListener('tap', this.addHomeView.bind(this));
		var journalism = mui('#journalism')[0];
		journalism.addEventListener('tap', this.addJournalismView.bind(this));
		var shoppingcart = mui('#shoppingcart')[0];
		shoppingcart.addEventListener('tap', this.addShoppingCartView.bind(this));
		var my = mui('#my')[0];
		my.addEventListener('tap', this.addMyView.bind(this));

	},
	addHomeView: function() {
		addHome.show();
		addJou.hide();
		addSp.hide();
		addMy.hide();
	},
	addJournalismView: function() {
		addHome.hide();
		addJou.show();
		addSp.hide();
		addMy.hide();
	},
	addShoppingCartView: function() {
		addHome.hide();
		addJou.hide();
		addSp.show();
		addMy.hide();
	},
	addMyView: function() {
		addHome.hide();
		addJou.hide();
		addSp.hide();
		addMy.show();
	}
}

mui.plusReady(function() {
	var page = new Page();
	page.init();
});