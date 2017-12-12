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
		//商品图片轮播
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
		//商品简介
		var $subtitle = $("<span>" + this.dataall.data.subheading + "</span>");
		$("#introduce_text").append($subtitle);
		//商品价格
		var $addMoney = $("<span class='introduce_color'>￥" + this.dataall.data.price + "</span><s><span>￥" + this.dataall.data.marketPrice + "</span></s>");
		$("#addmoney").append($addMoney);

		//商品规格

		for(var i = 0; i <= this.dataall.data.sizes.length; i++) {
			if(i < this.dataall.data.sizes.length) {
				var $addLi = $("<li id='li" + i + "' num='0' onclick='specifications(" + i + "," + this.dataall.data.sizes.length + ")'  optionvalueid='" + i + "' class='' ><span style='font-size: 18px;'>" + this.dataall.data.sizes[i].lth + "*" + this.dataall.data.sizes[i].wth + "</span></li>");
				$("#addLi").append($addLi);
			} else {
				var $addLi = $("<li id='li" + i + "' num='0' onclick='specifications(" + i + "," + this.dataall.data.sizes.length + ")'  optionvalueid='" + i + "' class='' ><span style='font-size: 18px;'>自定义</span></li>");
				$("#addLi").append($addLi);
			}
		}

		//商品介绍
		var $adddescription = $("<span>" + this.dataall.data.description + "</span>");
		$("#addDescription").append($adddescription);
		//获取自定义图片
		var addPic = mui("#addPic")[0];
		addPic.addEventListener('tap', this.addPicAction.bind(this));

		var nowBuyPic = mui("#nowBuy")[0];
		nowBuyPic.addEventListener('tap', this.nowBuyCommodity.bind(this));

	},
	nowBuyCommodity: function() {
		//商品id
		var cmyId = this.dataall.data.id;
		//商品规格

		var cmySize = null;
		console.log("提交" + plus.storage.getItem("speSize"));
		if(plus.storage.getItem("speSize") == "自定义") {
			plus.storage.removeItem("speSize");
			var wth = $('#wth').text();
			var lgh = $('#lgh').text();
			if(wth == null || wth == "") {
				alert("请填写自定义长度");
			} else if(lgh == null || lgh == "") {
				alert("请填写自定义长度");
			} else {
				cmySize = wth + "*" + lgh;
				console.log("自定义" + cmySize);
			}
		} else {
			cmySize = plus.storage.getItem("speSize");
			console.log("选择" + cmySize);
		}
		//自定义图片路径
		var cmySrc = plus.storage.getItem("picSrc");
		//商品价格
		var cmyMoy = this.dataall.data.price;
		//商品名称
		var cmyName = this.dataall.data.name;
		//商品介绍
		var cmySbd = this.dataall.data.subheading;
		if(cmyId == null) {
			alert("商品有误，请重新打开");
		} else if(cmySize == null) {
			alert("请选择规格");
		} else {
			mui.openWindow({
				url: 'orderHtml.html',
				id: 'orderHtml.html',
				createNew: false,
				show: {
					autoShow: true, //页面loaded事件发生后自动显示，默认为true
					duration: 500 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				},
				extras: {
					cmyId: cmyId,
					cmySize: cmySize,
					cmySrc: cmySrc,
					cmyMoy: cmyMoy,
					cmyName: cmyName,
					cmySbd: cmySbd

				},
				waiting: {
					autoShow: true, //自动显示等待框，默认为true
					title: '正在加载...', //等待对话框上显示的提示内容
				}

			});
			mui.back;
		}

	},
	addPicAction: function() {
		if(mui.os.plus) {
			var a = [{
				title: "拍照"
			}, {
				title: "从手机相册选择"
			}];
			plus.nativeUI.actionSheet({
				title: "添加图片",
				cancel: "取消",
				buttons: a
			}, function(b) { /*actionSheet 按钮点击事件*/
				switch(b.index) {
					case 0:
						break;
					case 1:
						getImage(); /*拍照*/
						break;
					case 2:
						galleryImg(); /*打开相册*/
						break;
					default:
						break;
				}
			})
		}
	}

}

mui.plusReady(function() {
	plus.storage.removeItem("picSrc");
	plus.storage.removeItem("speSize");
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
var specifications = function(liId, max) {
	var s = "#li" + liId;
	var n = "#li" + max;

	var that = $(s),
		curVal = that.attr("optionValueId"),
		position = that.attr("num"),
		chooseFlag = that.hasClass("current"),
		canNotClick = that.find("span").hasClass("disabled");

	//是否可点击
	if(canNotClick) {

		return false;
	}

	//判断选择
	if(chooseFlag) {
		chooseCancel(1, position, curVal, s, n); //样式变化
	} else {
		chooseCancel(2, position, curVal, s, n); //重新选中
	}

}
var chooseCancel = function(type, position, val, s, n) {
	$(".sku").find("[num=" + position + "]").each(function() {
		var that = $(this),
			curVal = that.attr("optionValueId");

		//type操作 1取消 2选中
		if(curVal == val) {

			if(type == 1) {
				that.removeClass("current");
			} else {

				that.addClass("current").siblings().removeClass("current");
				plus.storage.removeItem("speSize");
				console.log(s);
				this.speSize = $(s).text();

				plus.storage.setItem("speSize", this.speSize);

				console.log(plus.storage.getItem("speSize"));
			}
			if($(n).hasClass("current")) {
				$("#customAction").show();
			} else {
				$("#customAction").hide();
			}
		}
	});
}

//拍照 
function getImage() {
	$("#myimg_id").show();
	var c = plus.camera.getCamera();
	c.captureImage(function(data) {
		plus.storage.removeItem("picSrc");
		var picSrc = plus.io.convertLocalFileSystemURL(data);
		plus.storage.setItem("picSrc", picSrc);
		mui("#myimg_id")[0].setAttribute("src", picSrc);
	}, function(s) {
		console.log("error" + s);
	}, {
		index: 1,
		format: 'jpg'
	})
}

//本地相册选择 
function galleryImg() {
	$("#myimg_id").show();
	// 从相册中选择图片  
	plus.gallery.pick(function(e) {
		plus.storage.removeItem("picSrc");
		var picSrc = e.files[0]
		plus.storage.setItem("picSrc", picSrc);
		console.log(picSrc);
		mui("#myimg_id")[0].setAttribute("src", picSrc);
	}, function(e) {
		console.log("取消选择图片");
	}, {
		filter: "image",
		multiple: true,
		maximum: 1,
		system: false,
		onmaxed: function() {
			plus.nativeUI.alert('最多只能选择1张图片');
		}
	});
}

//上传头像图片 
function uploadHead(imgPath) {
	console.log("imgPath = " + imgPath);
	mainImage.src = imgPath;
	mainImage.style.width = "60px";
	mainImage.style.height = "60px";

	var image = new Image();
	image.src = imgPath;
	image.onload = function() {
		var imgData = getBase64Image(image);
		/*在这里调用上传接口*/
		//              mui.ajax("图片上传接口", { 
		//                  data: { 
		//                       
		//                  }, 
		//                  dataType: 'json', 
		//                  type: 'post', 
		//                  timeout: 10000, 
		//                  success: function(data) { 
		//                      console.log('上传成功'); 
		//                  }, 
		//                  error: function(xhr, type, errorThrown) { 
		//                      mui.toast('网络异常，请稍后再试！'); 
		//                  } 
		//              }); 
	}
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