

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
                    size: 30
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

//jQuery("#submit-btn").on("click", function (e) {
jQuery('#exponentialForm').submit(function(e) {
    e.preventDefault();
    // Reset values so charts don't add together
    capital = 0;
    numyears = 0;
    interest = 0;
    contribution = 0;
    exponentialValues = [];
    
    // Grab values from form
    capital = $("#initialcapital").val();
    numyears = $("#numyears").val();
    interest = $("#interest").val();
    interest /= 100;
    contribution = $('#contribution').val();
    
    // Call helper functions below to organize data
    $("div").getLabels();
    $("div").calculateGrowth();
    
    $("div").formatStyles();
    
    $("div").createUserChart();
});


// Turn the number of years into an array of 1 to the number of years
(function ($) {
    $.fn.getLabels = function () {
        labels = Array.from({ length: numyears }, (v, k) => k + 1);
    };
})(jQuery);

// Calculate the compound growth and add it to an array at each iteration (or year)
(function ($) {
    $.fn.calculateGrowth = function () {
        var growthValue = capital;
        exponentialValues[0] = growthValue;

        for (let i = 1; i < numyears; i++) {
            growthValue *= ((1 + interest) + contribution);
            exponentialValues.push(parseFloat(growthValue).toFixed(2));
        }
    };
})(jQuery);


// Format the html/css
(function ($) {
    $.fn.formatStyles = function () {
    
    // Enable clear button
    $("#clear-btn").css('cursor', 'pointer');
    $("#clear-btn").css('opacity', '1');
    
    $(".exponentialGrowthChart").css('opacity', '1');
    
    
    // Clear the form
    $("#exponentialForm").trigger("reset");
    
    $(".capital").text("$"+numberWithCommas(capital));
    $(".numyears").text(numyears);
    $(".interest").text(interest*100+"%");
    if(contribution > 0) {
        $(".contribution").text("$"+numberWithCommas(contribution));
    } else {
        $(".contribution").text("No contribution");
    }
    $(".final").text("$"+numberWithCommas(exponentialValues.slice(-1)));
    };
})(jQuery);

// Return number with comma's in place
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// Update chart with info
(function ($) {
    $.fn.createUserChart = function () {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = exponentialValues;
        
        // Set lower and upper bounds of y axis
        myChart.options.scales.y.min = Math.round(capital);
        myChart.options.scales.y.max = Math.round(exponentialValues[exponentialValues.length-1]);
        
        
        myChart.update();
    };
})(jQuery);


// Reset chart
$(document).ready(function() {
    $("#clear-btn").click(function(){
        myChart.data.labels = [];
        myChart.data.datasets[0].data = [];
        
        myChart.options.scales.y.min = 1;
        myChart.options.scales.y.max = 10;
        
        myChart.update();
        
        $('.subtext').empty();
        $(".exponentialGrowthChart").css('opacity', '0.4');
        $("#clear-btn").css('opacity', '0.3');
    }); 
});