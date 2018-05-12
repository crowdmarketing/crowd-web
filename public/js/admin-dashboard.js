$(document).ready(function () {

	var randomScalingFactor = function () {
		return Math.round(Math.random() * 100);
	};

	window.chartColors = {
		red: 'rgb(255, 99, 132)',
		orange: 'rgb(255, 159, 64)',
		yellow: 'rgb(255, 205, 86)',
		green: 'rgb(75, 192, 192)',
		blue: 'rgb(54, 162, 235)',
		purple: 'rgb(153, 102, 255)',
		grey: 'rgb(201, 203, 207)'
	};


	var randomConfig = function () {
		return {
			type: ['horizontalBar', "pie", "line"][Math.round(Math.random() * 2)],
			data: {
				datasets: [{
					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
					],
					backgroundColor: [
						window.chartColors.red,
						window.chartColors.orange,
						window.chartColors.yellow,
						window.chartColors.green,
						window.chartColors.blue,
					],
					label: ''
				}],
				labels: [
					'',
					'',
					'',
					'',
					''
				]
			},
			options: {
				responsive: true
			}
		};
	};

	window.onload = function () {
		var ctx1 = document.getElementById('chart-area1').getContext('2d');
		var ctx2 = document.getElementById('chart-area2').getContext('2d');
		var ctx3 = document.getElementById('chart-area3').getContext('2d');
		var ctx4 = document.getElementById('chart-area4').getContext('2d');
		var ctx5 = document.getElementById('chart-area5').getContext('2d');
		window.myPie1 = new Chart(ctx1, randomConfig());
		window.myPie2 = new Chart(ctx2, randomConfig());
		window.myPie3 = new Chart(ctx3, randomConfig());
		window.myPie4 = new Chart(ctx4, randomConfig());
		window.myPie5 = new Chart(ctx5, randomConfig());
	};


	var colorNames = Object.keys(window.chartColors);

});