function Page() {

}
Page.prototype = {

	constructor: Page,
	init: function() {
		mui.init({
			subpages: [{
				url: 'mainlist.html',
				id: 'one',
				styles: {
					top: '45px', //mui标题栏默认高度为45px；
					bottom: '49px' //默认为0px，可不定义；
				}
			}]

		});

		this.bindEvents();

	},
	bindEvents: function() {
		//alert(this.dataall.data[0].createTime);

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
		var ml = plus.webview.getWebviewById('one');
		var jl = plus.webview.getWebviewById('tow');
		var sc = plus.webview.getWebviewById('three');
		var my = plus.webview.getWebviewById('four');
		if(ml == null) {

			plus.webview.open('mainlist.html', 'one', {
				top: '45px', //mui标题栏默认高度为45px；
				bottom: '49px' //默认为0px，可不定义；
			});
		}

		if(jl != null) {
			jl.close();
		}
		if(sc != null) {
			sc.close();
		}
		if(my != null) {
			my.close();
		}

	},
	addJournalismView: function() {

		var ml = plus.webview.getWebviewById('one');
		var jl = plus.webview.getWebviewById('tow');
		var sc = plus.webview.getWebviewById('three');
		var my = plus.webview.getWebviewById('four');
		if(jl == null) {
			plus.webview.open('journalism.html', 'tow', {
				top: '45px', //mui标题栏默认高度为45px；
				bottom: '49px' //默认为0px，可不定义；
			});

		} else {
			plus.webview.getWebviewById('tow').show();
		}
		if(ml != null) {
			ml.close();
		}
		if(sc != null) {
			sc.close();
		}
		if(my != null) {
			my.close();
		}
	},
	addShoppingCartView: function() {

		var ml = plus.webview.getWebviewById('one');
		var jl = plus.webview.getWebviewById('tow');
		var sc = plus.webview.getWebviewById('three');
		var my = plus.webview.getWebviewById('four');
		if(sc == null) {
			plus.webview.open('shoppingcart.html', 'three', {
				top: '45px', //mui标题栏默认高度为45px；
				bottom: '49px' //默认为0px，可不定义；
			});
		} else {
			plus.webview.getWebviewById('three').show();
		}
		if(ml != null) {
			ml.close();
		}
		if(jl != null) {
			jl.close();
		}
		if(my != null) {
			my.close();
		}
	},
	addMyView: function() {

		var ml = plus.webview.getWebviewById('one');
		var jl = plus.webview.getWebviewById('tow');
		var sc = plus.webview.getWebviewById('three');
		var my = plus.webview.getWebviewById('four');

		if(my == null) {
			plus.webview.open('my.html', 'four', {
				top: '45px', //mui标题栏默认高度为45px；
				bottom: '49px' //默认为0px，可不定义；
			});
		} else {
			plus.webview.getWebviewById('four').show();
		}

		if(ml != null) {
			ml.close();
		}
		if(jl != null) {
			jl.close();
		}
		if(sc != null) {
			sc.close();
		}
	}
}

mui.plusReady(function() {
//	var self = plus.webview.currentWebview();
//	if(self.myfrom == "userLogin") {
//		var wvs = plus.webview.getDisplayWebview();
//		for(var i = 0; i < wvs.length; i++) {
//			plus.webview.close(wvs[i]);
//		}
//		
//	}
	var page = new Page();
	page.init();

});