

var capital;
var numyears;
var interest;
var contribution;
var exponentialValues = [];
var config;
var graphLabel;
var ctx = $('#exponentialGrowthChart').get(0).getContext('2d');


// Variables for chart
var labels = [];
const options = {
    scales: {
        ticks: {
            beginAtZero: true,
        },

        myScale: {
            position: "left",
        }
    },

    plugins: {
        legend: {
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 40
                }
            }
        }
    },
    responsive: true,
}

var myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: 'My First Dataset',
            data: [],
            //fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: options,
});

jQuery("#submit-btn").on("click", function (e) {
    e.preventDefault();
    capital = $("#initialcapital").val();
    numyears = $("#numyears").val();
    interest = $("#interest").val();
    interest /= 100;
    contribution = $('#contribution').val();

    $("div").getLabels();
    $("div").calculateGrowth();
    $("div").createUserChart();
    $('#finalResult').text(exponentialValues[exponentialValues.length - 1]);
});


(function ($) {
    $.fn.getLabels = function () {
        labels = Array.from({ length: numyears }, (v, k) => k + 1);
    };
})(jQuery);

(function ($) {
    $.fn.calculateGrowth = function () {
        var growthValue = capital;
        exponentialValues[0] = growthValue;

        for (let i = 1; i < numyears; i++) {
            growthValue *= (1 + interest) + contribution;
            exponentialValues.push(parseFloat(growthValue).toFixed(1));
        }
    };
})(jQuery);




(function ($) {
    $.fn.createUserChart = function () {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = exponentialValues;

        myChart.update();
    };
})(jQuery);
