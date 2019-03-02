var g = function(id) {
	return document.getElementById(id);
}

//数据格式
/**
*

问卷提交格式：
{
  "formData":[
    {
			"type": "radio",
			"title": "第一道题",
			"data": [
				"选项1",
				"选项2",
				"选项3"
			]
    },{
    
    	"type": "radio",
			"title": "第一道题",
			"data": [
				"选项1",
				"选项2",
				"选项3"
			]
    
    }	
	]
}


*
**/


//===================表单切换=======================
var inputTypeSelectBtn = g('input-type-select');

var selectTypes = {
	"title": g("title-box"),
	"radio": g('radio-box'),
	"checkbox": g('checkbox-box'),
	"text": g('text-box')
}

//获取选择value
var getSelectContent = function(select) {
	var index = select.selectedIndex;
	return select.options[index].value;
}

//初始化value值
var selectValue = getSelectContent(inputTypeSelectBtn);

var changeType = function(type) {
	for(var i in selectTypes){
		selectTypes[i].style.display = 'none';
	}
	selectTypes[type].style.display = "block";
}



//当表单切换时触发
inputTypeSelectBtn.onchange = function() {
	selectValue = getSelectContent(inputTypeSelectBtn);
	changeType(selectValue);
}

//======================配置选项添加及删除功能===========

var Option = function(type, value, deleteBtn, selfElement) {
	this.type = type;
	this.value = value;
	this.deleteBtn = deleteBtn;
	this.deleteBtn.self = this;
	this.selfElement = selfElement;
	this.selfElement.self = this;
}

var options = [];	//存放所有选项

var addOptionsBtns = {
	'radio': selectTypes['radio'].getElementsByClassName('add-btn')[0],
	'checkbox': selectTypes['checkbox'].getElementsByClassName('add-btn')[0]
}

var addOptionsInputs = {
	'radio': selectTypes['radio'].getElementsByClassName('add-option')[0],
	'checkbox': selectTypes['checkbox'].getElementsByClassName('add-option')[0]
}

var addOption = function(selectTypes, key, value) {
	

	var type = key;
	var optionsWrap = selectTypes.getElementsByClassName('options-wrap')[0];
	var optionWrap = document.createElement('div');
	optionWrap.className = 'option-wrap';
	optionWrap.innerHTML = '<div class="delete-mask">删除</div> <span class="option-set">' + value + '</span>';
	optionsWrap.appendChild(optionWrap);
	var deleteBtn = optionWrap.getElementsByClassName('delete-mask')[0];
	var selfElement = optionWrap;
	var option = new Option(type, value, deleteBtn, selfElement);
	

	options.push(option);




	deleteBtn.addEventListener('click', function() {
		deleteOption(deleteBtn);
	});
}

//删除操作
var deleteOption = function(btn) {
	for(var i = 0; i < options.length; i++) {
		if(options[i] === btn.self) {
			options.splice(i ,1);
			break;
		}
	}
	btn.self.selfElement.parentNode.removeChild(btn.self.selfElement);
	delete btn.self;
}

//为按钮绑定事件
for(var key in addOptionsBtns) {
	(function(e) {
		addOptionsBtns[e].onclick = function() {
			var value = selectTypes[e].getElementsByClassName('add-option')[0].value;
			if(value === "") {
				return false;	
			}
			addOption(selectTypes[e], e, value);
			selectTypes[e].getElementsByClassName('add-option')[0].value = '';
		}
	})(key)
}

for (var key in addOptionsInputs) {
	(function(e) {
		addOptionsInputs[e].addEventListener('keyup', function() {
			if (event.keyCode === 13) {
				addOptionsBtns[e].click();
			}
		});
	})(key)
}


//==========================渲染问卷==================
var form = g('form');
var addQuestionBtn = g('question-submit');

addQuestionBtn.onclick = function() {
	var isOptions;
	var questionText = selectTypes[selectValue].getElementsByClassName('set-question')[0].value;
	if (selectValue === 'radio' || selectValue === 'checkbox') {
		isOptions = 'haveOptions';
	} else {
		isOptions = 'noOptions';
	}
	if(questionReady[isOptions](questionText)) {
		renderQuestion(questionData(questionText));
		resetSetBox();
		moveSetBox();
	}
}

var questionReady = {
	'haveOptions': function(questionText) {
		if (questionText === '') { 
			return false;
		} 
		return true;
	},
	'noOptions': function(questionText) {
		if (questionText === '') {
			return false;
		}
		return true;
	}
}

//数据存储
var formData = [];
var Questionobj = {};
var questionTitle = "";


var questionData = function(questionText) {
	var optionsValue = [];
	for (var i = 0; i < options.length; i++) {
		if (options[i].type === selectValue) {
			optionsValue.push(options[i].value);
			
		}
	}
	var data = {
		type: selectValue,
		questionValue: questionText,
		optionsValue: optionsValue
	};



	//================此处进行存储数据=============
	
	if(selectValue === 'radio' || selectValue === 'checkbox') {
		formData.push({
			"type": selectValue,
			"title": questionText,
			"optionsValue": optionsValue
		})
	} else if(selectValue == 'text') {
		formData.push({
			"type": selectValue,
			"title": questionText,
			"optionsValue": ["text", "text", "text"]
		})
	} else {
		questionTitle = questionText;
	}


	//AJAX返回数据
	Questionobj = {
		"questionTitle": questionTitle,
		"formData": formData
	}

	return data;
}


var renderQuestion = function(data) {
	var questionBox = document.createElement('div');
	questionBox.className = 'question-wrap ' + data.type +'-type';
	var date = Date.now();

	switch (data.type) {
		case 'radio':
		case 'checkbox':
			(function() {
				var optionsBox = "<div class='options-block'>";
				for (var i = 0; i < data.optionsValue.length; i++) {
					optionsBox += "<div class='option'> <input class='" + data.type +  "' type='" + data.type + "' name='" + date + "' value='" + data.optionsValue[i] + "'>" + data.optionsValue[i] + "</div>";
				}
				optionsBox += "</div>";
				questionBox.innerHTML = "<div class='question'> <span>" +data.questionValue + "</span> </div>" + optionsBox;
				form.appendChild(questionBox);
			})()
			break;
		case 'text':
			(function() {
				var textBox = "<div class='text-input-block-div'> <input class='text-input-block' type='text' name='" +date + "'> </div>";
				questionBox.innerHTML = "<div class='question'> <span>" + data.questionValue + "</span> </div>" + textBox;
				form.appendChild(questionBox);
			})()
			break;
		case 'title':
		(function() {
			questionBox.innerHTML = "<div class='QuestionTitle'> <span>" + data.questionValue + "</span> </div>";
			form.appendChild(questionBox);
		})()
		break;
		default:
			console.log("表单生成失败");
	}
}

var resetSetBox = function() {
	for (var key in selectTypes) {
		var input = selectTypes[key].getElementsByClassName('set-question')[0];
		input.value = '';
	}
	for ( var i = options.length - 1; i >= 0; i--) {
		deleteOption(options[i].deleteBtn);
	}
}

//移动右侧框
var formSetBox = g('content-right');
var formBox = g('content-body');
var moveSetBox = function() {
	var questionElements = formBox.getElementsByClassName('question-wrap');
	var topPosition = formBox.offsetHeight - questionElements[questionElements.length - 1].offsetHeight;
	startMove(formSetBox, topPosition, 10);
}

var timer = null;
var positionTop = 0;
startMove = function(element, target, interval) {

	clearInterval(timer);
	timer = setInterval(function() {
		var speed = (target - element.offsetTop) / 10;
		speed = speed > 0 ? Math.ceil(speed) : 0;
		if (element.offsetTop >= target) {

			clearInterval(timer);
		} else {
			positionTop = positionTop + speed;
			element.style.top = positionTop + 'px';
		}
	}, interval)
}


//问卷生成完成点击事件，将调用AJAX
var button = document.getElementById('generate-question');

button.addEventListener("click", function() {

	var httphtml;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari  
        httphtml = new XMLHttpRequest();
    } else {
        // code for IE6, IE5  
        httphtml = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (!httphtml) {
        alert("httphtml异常");
        return false;
    }

    var string = JSON.stringify(Questionobj, undefined, 2);

    console.log(string);

    httphtml.open("POST", "http://111.231.143.176:8080/Questionnaire5/paper/add", true);
    httphtml.setRequestHeader("Content-type","application/json;charset=UTF-8");  

    // console.log(httphtml.readyState);
    // console.log(httphtml.status);

   	alert("问卷已生成")

    //因为服务器并没有返回数据，所以值为1
    httphtml.onreadystatechange = function () {
    	 /*
        存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
        0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪
        */

        if(httphtml.readystate == 4) {
        	/*
            200: "OK"
            404: 未找到页面
            */
            if(httphtml.status == 200) {
            	alert("问卷已生成");
            }
        }
    }

    httphtml.send(string);
})