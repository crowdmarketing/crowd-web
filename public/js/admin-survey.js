$(document).ready(function () {


	var surveyIndex = 0;
	var surveyRenderer = new Maro.listRenderer(".survey-list", $(".survey-list").html(), [{
		type: "text",
		title: "오늘 드신 메뉴는 어땠나요?",
		point: 10,
		i: 0
	}]);

	$("body").on("click", ".survey-list-item", function () {
		$(".survey-list-item").removeClass("selected");
		$(this).addClass("selected");
	});
	$("body").on("click", ".survey-list-item-type", function () {
		var item = $(this).parents(".survey-list-item")[0];
		console.log(item);
		$(item).attr("type", $(this).prop('checked') ? "mc" : "text");
	});
	$("body").on("click", ".survey-add", function () {
		surveyRenderer.addRenderData({
			type: "mc",
			title: "",
			point: 10,
			i: ++surveyIndex
		});
		$(".survey-list-item").removeClass("selected");

	});
});