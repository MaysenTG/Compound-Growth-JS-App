

var capital;
var numyears;
var interest;
var contribution;
var exponentialValues = [];
var config;
var graphLabel;
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
  };
  
var ctx = $('#exponentialGrowthChart').get(0).getContext('2d', {alpha: false});


// Variables for chart
var labels = [];
const options = {
    scales: {
        y: {
            min: 1,
            max: 10,
        },  
    },
    scale: {
        pointLabels: {
            fontSize: 24,
        },   
    },
    
    hover: {
        mode: 'nearest',
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
            label: 'Compound Growth',
            data: [],
            fill: false,
            backgroundColor: 'rgb(255, 255, 255)',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            
        }]
    },
    options: options,
});

jQuery("#submit-btn").on("click", function (e) {
    e.preventDefault();
    capital = 0;
    numyears = 0;
    interest = 0;
    contribution = 0;
    exponentialValues = [];
    
    capital = $("#initialcapital").val();
    numyears = $("#numyears").val();
    interest = $("#interest").val();
    interest /= 100;
    contribution = $('#contribution').val();

    $("div").getLabels();
    $("div").calculateGrowth();
    $("div").createUserChart();
    $(".exponentialGrowthChart").css('opacity', '1');
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
        
        myChart.options.scales.y.min = Math.round(capital);
        myChart.options.scales.y.max = Math.round(exponentialValues[exponentialValues.length-1]);
        
        
        myChart.update();
    };
})(jQuery);
