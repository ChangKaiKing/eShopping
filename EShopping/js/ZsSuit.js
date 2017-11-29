/**
 * @author  zhouqiao
 * @date    2017-02-21
 * @mail    zhou.qiao@zol.com.cn
 * @unset   第一步 var zsSuit  = new ZsSuit(2); //初始化对象及层级数    
 *          第二步 zsSuit.config(suitObj); //suitObj为按规则排列的json对象,如 {"6692398":"0_26_0_2","6692393":"0_24_0_2"} //{套装ID:第一层_第二层_第三层_第四层}
 *          第三步 选中某项时 zsSuit.set(2,5) //设置第2层级的值为5
 *                取消某项时 zsSuit.unset(2) //取消第2层级值的设置
 *          第四步 添加zsSuit.callback 回调函数，参数为(canNotArr, suitId)，前者表示哪些值不能被选中，后者不为零时表示当前选择已经确定出了唯一值
 */

function ZsSuit(number) {
	this.num = number, //套装几层结构
		this.suitRuleInfo = {}, //套装信息 如 {"6692398":"0_26_0_2","6692393":"0_24_0_2"} //{套装ID:第一层_第二层_第三层_第四层}
		this.paramsSort = [], //已经设置的层级ID及值[0:21,1:0,2:0,3:5]
		this.paramsArr = [], //每层可选范围[0:[21,11],1:[2]],
		this.canNotArr = [], //不能选数组，返回给回调函数使用
		this.tempCan = []; //临时可选
}

ZsSuit.prototype = {
	//配置
	config: function(obj) {
		this.suitRuleInfo = obj.suitRuleInfo;
		this.init();
	},
	//设置信息
	set: function(position, val) {
		this.paramsSort[position] = val;
		this.singleInit();
		this.out();
	},
	//删除信息
	unset: function(position) {
		this.paramsSort[position] = 0;
		this.singleInit();
		this.out();
	},
	//全局初始化
	init: function() {
		
		
		//每层可选范围
		for(var i in this.suitRuleInfo) {
			var curSuitRuleInfo = this.suitRuleInfo[i].split("_");
			for(var j in curSuitRuleInfo) {
				if(this.inArr(curSuitRuleInfo[j], this.paramsArr[j]) < 0) {
					if(curSuitRuleInfo[j] > 0) {
						this.paramsArr[j].push(curSuitRuleInfo[j]);
					}
				}
			}
		}
	},

	//单次初始化变量，每次选择变更时要调整的量［将每层不可选的项置为空］
	singleInit: function() {
		for(var i = 0; i < this.num; i++) {
			this.canNotArr[i] = [];
		}
	},

	//外部输出
	out: function() {
		//判断当前设置了几个层级
		var number = 0;
		

		
	},
	//按需创建正则
	createPattren: function(positionObj) {
		var pattrenArr = new Array;
		for(var i = 0; i < this.num; i++) {
			var curVal = '[0-9]+';
			if(i in positionObj) {
				curVal = positionObj[i];
			}
			pattrenArr.push(curVal);
		}
		var pattren = pattrenArr.join('_');
		return pattren;
	},

}