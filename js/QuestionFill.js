//数据格式
/**
*

*/


/*
var formData = {
    "success": true,
    "QuestionTitle": "关于李杰大佬的问卷",
    "data": [
        {
            "questionId": 1,
            "paperId": 1,
            "paperType": null,
            "questionTitle": "李杰为什么是大佬",
            "questionType": "radio",
            "questionChoose": ["单选1","单选2","单选3"],
            "solutions": [
                {
                    "solutionId": 1,
                    "paperId": 1,
                    "questionId": 1,
                    "answer": "a",
                    "type": null
                },
                {
                    "solutionId": 16,
                    "paperId": 1,
                    "questionId": 1,
                    "answer": "b",
                    "type": null
                }
            ]
        },
        {
            "questionId": 2,
            "paperId": 1,
            "paperType": null,
            "questionTitle": "李杰大佬怎么什么都会",
            "questionType": "checkbox",
            "questionChoose": ["多选1","多选2","多选3"],
            "solutions": [
                {
                    "solutionId": 2,
                    "paperId": 1,
                    "questionId": 2,
                    "answer": "a",
                    "type": null
                }
            ]
        },
        {
            "questionId": 3,
            "paperId": 1,
            "paperType": null,
            "questionTitle": "李杰大佬为什么这么屌",
            "questionType": "text",
            "questionChoose": ["多选1","多选2","多选3"],
            "solutions": [
                {
                    "solutionId": 2,
                    "paperId": 1,
                    "questionId": 2,
                    "answer": "a",
                    "type": null
                }
            ]
        }   
	 ],
    "error": null
}

*/



//==============下面是右侧问卷列表的数据================

/*
var rightData = {
    "success": true,
    "data": [
        {
            "paperId": 1,
            "paperTitle": "李杰是大佬"
        },
        {
            "paperId": 2,
            "paperTitle": "李杰强无敌"
        },
        {
            "paperId": 3,
            "paperTitle": "李杰是大佬"
        },
        {
            "paperId": 4,
            "paperTitle": "李杰强无敌"
        }       
	],
    "error": null
}

*/

//======================以上为测试数据=========================

//=======================主题问卷渲染函数=========================
var rightData = {};
var formData = {};



//页面间参数传递函数获取函数
var parseURL = function(url) {
	var url = url.split("?")[1];
	var res = url.split("=")[1];
	console.log(res);
	return res;
}

//ajax调用函数
var ajaxBodyCall = function() {
	var httphtml = new XMLHttpRequest();
	var resText;

	var url = window.location.href;
	var q = parseURL(url);
	console.log("q的值"+q);

	httphtml.open('GET', "http://111.231.143.176:8080/Questionnaire5/question/list/"+q, true);

	httphtml.onreadystatechange = function() {
		if (httphtml.readyState == 4 && httphtml.status == 200 || httphtml.status == 304) {
			resText = httphtml.responseText;
            // console.log(resText);

            res = JSON.parse(resText);

            console.log("中间ajax");
            console.log(res);
            formData = res;
            bodyRender();
		}
	}

	httphtml.send();
}


var bodyRender = function() {

	//渲染问卷标题
	var QuestionFlag = 0;

	for (var i = 0; i < formData.data.length; i++) {

	var date = Date.now();

	//渲染问卷标题
	if (QuestionFlag === 0) {
		var questionBox = document.createElement('div');
		questionBox.className = 'question-wrap ' + formData.data[i].questionType +'-type';

		questionBox.innerHTML = "<div class='QuestionTitle'> <span>" + formData.data[0].paperTitle + "</span> </div>";
		form.appendChild(questionBox);
		QuestionFlag = 1;
	}
	
	var questionBox = document.createElement('div');
	questionBox.className = 'question-wrap ' + formData.data[i].questionType +'-type';
    console.log(formData.data[i].questionType);
	switch (formData.data[i].questionType) {
		case 'radio':
		case 'checkbox':
			(function() {
				var optionsBox = "<div class='options-block'>";
				for (var j = 0; j < formData.data[i].options.length; j++) {
					optionsBox += "<div class='option'> <input class='" + formData.data[i].questionType +  "' type='" + formData.data[i].questionType + "' name='" + date + "' value='" + formData.data[i].options[j] + "'>" + formData.data[i].options[j] + "</div>";
				}
				optionsBox += "</div>";
				questionBox.innerHTML = "<div class='question'> <span>" + formData.data[i].question + "</span> </div>" + optionsBox;
				form.appendChild(questionBox);
			})()
			break;
		case 'text':
			(function() {
				var textBox = "<div class='text-input-block-div'> <input class='text-input-block' type='text' name='" + formData.data[i] + "'> </div>";
				questionBox.innerHTML = "<div class='question'> <span>" + formData.data[i].question + "</span> </div>" + textBox;
				form.appendChild(questionBox);
			})()
			break;

		default:
			console.log("表单生成失败");
	}
}
}



//============================右侧渲染函数=======================================


//ajax调用
var ajaxRightCall = function() {
	var httphtml = new XMLHttpRequest();
	var resText;

	httphtml.open('GET', "http://111.231.143.176:8080/Questionnaire5/paper/list", true);

	httphtml.onreadystatechange = function() {
		if (httphtml.readyState == 4 && httphtml.status == 200 || httphtml.status == 304) {
			resText = httphtml.responseText;
            // console.log("右侧");
            // console.log(resText);
            console.log(resText);


            res = JSON.parse(resText);
            console.log(res);

            rightData = res;

            listRender();
		}
	}

	httphtml.send();
}


//列表渲染
var listRender = function() {
	var FillNode = document.createElement('ul');
	var contentRight = document.getElementById('display-block');
	var titleBox = '';

	for (var i = 0; i < rightData.data.length; i++) {
		titleBox += "<li onclick='Jump(" +rightData.data[i].paperId+ ")'>" + rightData.data[i].paperTitle + "</li>";
	}

	FillNode.innerHTML = titleBox;
	contentRight.appendChild(FillNode);
}


var Jump = function(i) {
	console.log(i);
	var q;
	window.location.href = "QuestionFill.html?q="+i;
}

var Submit = function() {
    alert("问卷已提交");
    var url = window.location.href;
    console.log("submit");
    console.log(parseURL(url));
    if (parseURL(url) === '1') {
        console.log("执行");
        window.location.href = "QuestionResults.html";
    }
}


window.onload = function() {
	console.log("页面加载完毕");
	ajaxBodyCall();
	

	ajaxRightCall();

}
