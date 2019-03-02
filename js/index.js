var Jump = function() {
	window.location.href = "page/QuestionCreate.html";
}


//此处使用原生js来写jQuery的淡入效果
var fadein = function(element, target, speed) {
	// console.log("fadein执行");
	
	//element是将要修改的元素,需设置opacity值
	//target是想要达到的透明度值
	//speed是完成速度（毫秒）
	if(element) {
		var v = parseInt(window.getComputedStyle(element, null).opacity);
		var count = 10 / speed;			//此处的100需要与setInterval第二个参数一致	
		var avg = (target - v) * count;	//每调用一次函数所完成的opacity增量
		var timer = setInterval(function() {
			if(v < target) {
				// c++;
				v += avg;
				// console.log("avg值"+avg);
				// console.log("v值"+v);
				element.style.opacity = v;
			} else {
				clearInterval(timer);
			}
		}, 10);
	}
	// return c;
}


var ele = document.getElementById('background-font');
var button = document.getElementsByClassName('background-button')[0];

fadein(ele, 1, 2000);

var buttonDelay = function() {
	fadein(button, 1, 500);
}

window.setTimeout(buttonDelay, 1000);	//延时执行按钮淡入

