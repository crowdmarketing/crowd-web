$(document).ready(function () {




	var surveyData = [{
		type: "mc",
		title: "오늘 드신 메뉴는 어땠나요?",
		multiple_choice: [{ name: "매우 좋음" }, { name: "좋음" }, { name: "보통" }, { name: "나쁨" }, { name: "매우 나쁨" }],
		point: 10
	}];



	$.ajax({
		url: '/api/companys/' + company_id + '/surveys',
		processData: false,
		contentType: false,
		dataType: "json",
		cache: false,
		type: 'GET'

	}).done(function (data) {
		console.log(data);
		var s = JSON.parse(data.content);
		console.log(s);
		surveyData = s;
		fnRefreshRenderData();

	}).fail(function () {

	}).always(function () {

	});


	var fnSurveyDataToRenderData = function (surveyData) {
		var i = 0;
		var renderData = [];
		for (i = 0; i < surveyData.length; i++) {
			var tempRenderData = {
				type: surveyData[i].type,
				title: surveyData[i].title,
				point: surveyData[i].point,
				i: i
			}

			var j = 0;
			if (!surveyData[i].multiple_choice) {
				surveyData[i].multiple_choice = [];
			}


			for (j = 0; j < 5; j++) {
				tempRenderData["choice" + (j + 1)] = "";
			}
			for (j = 0; j < surveyData[i].multiple_choice.length; j++) {
				tempRenderData["choice" + (j + 1)] = surveyData[i].multiple_choice[j].name;
			}
			// tempRenderData.typeChecked = tempRenderData.type == "mc" ? "checked" : "";

			renderData.push(tempRenderData);
		}
		return renderData;
	}


	var fnRefreshRenderData = function () {

		surveyRenderer.setRenderData(fnSurveyDataToRenderData(surveyData));

		var i = 0;
		for (i = 0; i < $(".survey-list-item").length; i++) {
			$($(".survey-list-item:eq(" + i + ") .survey-list-item-type")).prop('checked', surveyData[i].type == "mc");
		}
	}

	var timerForSaveSurvey = null;
	var ajaxForSaveSurvey = null;
	var fnSaveSurveyWithTimeout = function () {
		timerForSaveSurvey && clearTimeout(timerForSaveSurvey);

		timerForSaveSurvey = setTimeout(function () {
			console.log(JSON.stringify(surveyData));
			ajaxForSaveSurvey && ajaxForSaveSurvey.abort();
			ajaxForSaveSurvey = $.ajax({
				url: '/api/companys/' + company_id + '/surveys',
				processData: false,
				contentType: false,
				dataType: "json",
				cache: false,
				type: 'POST',
				data: JSON.stringify(surveyData)
			}).done(function (data) {

			}).fail(function () {

			}).always(function () {

			});

		}, 500);
	}

	var surveyRenderer = new Maro.listRenderer(".survey-list", $(".survey-list").html(), []);


	$("body").on("click", ".survey-list-item", function () {
		$(".survey-list-item").removeClass("selected");
		$(this).addClass("selected");
	});
	$("body").on("click", ".survey-list-item-type", function () {
		var item = $(this).parents(".survey-list-item")[0];
		var text = $(this).prop("checked");
		console.log(item);
		$(item).attr("type", text ? "mc" : "text");
		surveyData[$(item).attr("index")].type = (text ? "mc" : "text");
		fnSaveSurveyWithTimeout();
	});
	$("body").on("keydown keyup change", ".survey-list-item-title", function () {
		var text = $(this).val();
		var item = $(this).parents(".survey-list-item")[0];
		surveyData[$(item).attr("index")].title = text;
		fnSaveSurveyWithTimeout();
	});
	$("body").on("keydown keyup change", ".survey-list-item-answer", function () {
		var text = $(this).val();
		var item = $(this).parents(".survey-list-item")[0];
		var index = $(item).find(".survey-list-item-answer").index($(this));

		surveyData[$(item).attr("index")].multiple_choice[index].name = text;
		console.log(surveyData);
		fnSaveSurveyWithTimeout();
	});
	$("body").on("keydown keyup change", ".survey-list-item-point", function () {
		var text = $(this).val();
		var item = $(this).parents(".survey-list-item")[0];

		surveyData[$(item).attr("index")].point = text;
		fnSaveSurveyWithTimeout();
	});
	$("body").on("click", ".survey-add", function () {
		surveyData.push({
			type: "mc",
			title: "",
			multiple_choice: [{ name: "매우 나쁨" }, { name: "나쁨" }, { name: "보통" }, { name: "좋음" }, { name: "매우 좋음" }],
			point: 10
		});
		fnRefreshRenderData();
		$(".survey-list-item").removeClass("selected");

	});
	$("body").on("click", ".survey-list-item-remove", function () {

		surveyData.splice(parseInt($(this).attr("index")), 1);

		fnSaveSurveyWithTimeout();
		fnRefreshRenderData();

	});

});