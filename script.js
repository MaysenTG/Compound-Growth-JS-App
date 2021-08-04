var capital;
var numyears;
var interest;
var contribution;
var exponentialValues = [];
var ctx = $('#exponentialGrowthChart').get(0).getContext('2d');

// Variables for chart
var labels = [];
const options = {
    scales: {
        y: {
            beginAtZero: true,
        },

        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 14
                    }
                }
            }
        },
        maintainAspectRatio: true,
        responsive: true,
    }
}

// Set chart
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
});



$(document).ready(function () {
    // Get value on button click and show alert
    $("#exponentialForm").submit(function () {
        capital = $("#initialcapital").val();
        numyears = $("#numyears").val();
        interest = $("#interest").val();
        interest /= 100;
        contribution = $('#contribution').val();

        $("#exponentialForm").getLabels();
        $("#exponentialForm").calculateGrowth();
        $("#exponentialForm").showData();
    });
});

(function ($) {
    $.fn.showData = function () {
        myChart.update();
    };
})(jQuery);


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
        alert(exponentialValues);
    };
})(jQuery);




(function ($) {
    $.fn.createUserChart = function () {
        myChart.update();
    };
})(jQuery);