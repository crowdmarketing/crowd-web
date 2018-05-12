$(document).ready(function () {
	$("body").on("submit", "#frmPoint", function (e) {
		e.preventDefault();
		var formData = {
			phone_number: $(".point-number").val()
		}
		$.ajax({
			url: '/api/companys/' + company_id + '/users',
			headers: {
				"accept": "*/*",
				"Content-Type": "application/json"
			},
			processData: false,
			contentType: false,
			dataType: "html",
			type: 'POST',
			data: JSON.stringify(formData)
		}).done(function (data) {
			alert("설문조사를 전송하였습니다.");
			$("#frmPoint")[0].reset();
		}).fail(function () {

		}).always(function () {

		});
	});
});