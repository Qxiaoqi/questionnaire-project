/*
url:localhost:8080/Questionnaire3/solution/list/#{paperId}

Json格式：
{
    "success": true,
    "data": [
        {
            "paperId": 1,
            "questionId": 1,
            "detailCensusDetails": [
                {
                    "option": "A",
                    "count": 1
                }
            ]
        },
        {
            "paperId": 1,
            "questionId": 2,
            "detailCensusDetails": [
                {
                    "option": "A",
                    "count": 1
                }
            ]
        },
        {
            "paperId": 1,
            "questionId": 3,
            "detailCensusDetails": [
                {
                    "option": "A",
                    "count": 1
                }
            ]
        }    
	],
    "error": null
}
*/

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

//渲染数据



var answerClock = [
	{
		"question": "你认为大学生就业困哪吗",
		"chartData":{
			"困难": 5,
			"不困难": 10
		}
	},
	{
		"question": "你认为自己的优势是什么",
		"chartData":{
			"学习成绩": 3,
			"专业技能": 7,
			"不知道": 5
		}
	},
	{
		"question": "你认为你现在最需要什么",
		"chartData":{
			"努力学习": 4,
			"去实际学习": 6,
			"不知道": 7 
		}
	}
]



//======================以上为测试数据=========================

console.log(answerClock.length);

var form = document.getElementById('form');

var render = function() {

	for (var i = 0; i < answerClock.length; i++) {
		var questionBox = document.createElement('div');
		questionBox.className = 'question-wrap';
		var titleBox = "<div class='titleBox'>" +answerClock[i].question+ "</div>";

		var str = "";
		//渲染图表
		var chartstr = "";
		chartstr += "<div class='chartblock'>"

		for(var k in answerClock[i].chartData) {
			
			chartstr += "<div class='chartbox'>";
			chartstr += "<div class='chartbox_data' style='height:" +answerClock[i].chartData[k]*20+ "px; background-color: #64B7FC' title='" +k+ "'></div>";
			chartstr += "</div>";
		}
		chartstr += "</div>";

		str = titleBox + chartstr;
		questionBox.innerHTML = str;
		form.appendChild(questionBox);
	}
}

render();