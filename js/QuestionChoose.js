//数据格式
/**
*

var SourceData = {
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


var SourceData = {};


//==================以上数据为测试========================

//Ajax调用GET获取数据
var ajaxCall = function() {
	var httphtml = new XMLHttpRequest();
	var resText;
    var res;

	httphtml.open('GET', "http://111.231.143.176:8080/Questionnaire5/paper/list", true);

	httphtml.onreadystatechange = function() {
		if (httphtml.readyState == 4 && httphtml.status == 200 || httphtml.status == 304) {
			resText = httphtml.responseText;
            // console.log(resText);
            // console.log(resText.success);
            // var test = JSON.parse(resText);
            // console.log(test);
            res = JSON.parse(resText);
            console.log(res);
            console.log("res.success");
            console.log(res.success);
            SourceData = res;

            render();
		}
	}

	httphtml.send();
    return res;
}



//渲染页面
var render = function() {
	// console.log(SourceData.data.length);

	var contentBody = document.getElementById('content-body');
	var QuestionNode = document.createElement('div');
	var titleBox = '';

	// console.log(SourceData.data[0].paperTitle);

	if (SourceData.success == true) {
		for (var i = 0; i < SourceData.data.length; i++) {
			titleBox += "<div class='Question-wrap'> <div class='Question-wrap-title' id='"  +SourceData.data[i].paperId+ "' onclick='Jump(" +SourceData.data[i].paperId+ ")'> <span>" + SourceData.data[i].paperTitle + "</span> </div> </div>";
		}
	}

	QuestionNode.innerHTML = titleBox;
	contentBody.appendChild(QuestionNode);
}


//页面跳转
var Jump = function(i) {
	console.log(i);
	var q;
	window.location.href = "QuestionFill.html?q="+i;
}


//整体调用
window.onload = function() {
	console.log("页面加载完毕");
	ajaxCall();
    // var test = ajaxCall();
    // SourceData = ajaxCall();

    // console.log(SourceData);

    
	// render();
}
