$(document).ready(function () {



	var surveyData = [];
	var surveyRenderer = new Maro.listRenderer(".user-survey-list", $(".user-survey-list").html(), []);
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

		surveyRenderer.setRenderData(fnSurveyDataToRenderData(surveyData));

	}).fail(function () {

	}).always(function () {

	});




	var clickEffect = function (element) {
		var effect = $("<div class='clickEffect'></div>");
		console.log($(element).offset().left);
		console.log($(element).width());
		var left = $(element).offset().left + $(element).outerWidth() / 2;
		var top = $(element).offset().top + $(element).outerHeight() / 2;
		var st = $(window).scrollTop();
		effect.css("left", left);
		effect.css("top", top - st);
		$(element).parent().prepend(effect);
		setTimeout(function () {
			effect.remove();
		}, 500);
	}

	$("body").on("click", ".user-survey-list-item-mc-button", function () {

		var item = $(this).parents(".user-survey-list-item");
		$(item).find(".user-survey-list-item-mc-button").removeClass("selected");
		$(this).addClass("selected");
		clickEffect(this);



		// $(window).scrollTop();
		var body = $("html, body");
		var scrollTo = $(".user-survey-list-item:eq(" + ($(".user-survey-list-item").index(item) + 1) + ")").offset().top;
		body.stop().animate({ scrollTop: scrollTo }, 800, 'swing', function () {
		});
	});

	$("body").on("keydown", ".user-survey-list-item-text input", function (e) {

		if (e.keyCode == 13) {
			var item = $(this).parents(".user-survey-list-item");
			clickEffect(this);
			// $(window).scrollTop();
			var body = $("html, body");
			var scrollTo = $(".user-survey-list-item:eq(" + ($(".user-survey-list-item").index(item) + 1) + ")").offset().top;
			body.stop().animate({ scrollTop: scrollTo }, 620, 'swing', function () {
			});
		}
	});

	$("body").on("click", ".user-survey-submit", function(){
		alert("리워드가 적립되었습니다. 애플리케이션을 설치하여 포인트를 확인하여 보세요!");
	});
})