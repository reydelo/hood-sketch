$(function(){
  //find neighborhoods of city
  $(":button").on("click", function(){
    var city = $(".input-city").val().titleize();
    var state = $(".input-state").val().toUpperCase();
    $.ajax({
      url: "/hoods",
      data: {"city": city, "state": state }
    }).done(function(data) {
      $(".hoods li").remove();
      $(".hoods .title h3").remove();
      $('.hood h3').remove();
      $('.hoodInfo h4').remove();
      $('.hoodInfo li').remove();
      $('.hoods i').remove();
      $('#charts_div').children().remove();
      $('.hoods .title').append("<h3>Neighborhoods of " + city + ', ' + state + "</h3>");
      for(var i = 0; i < data.length; i++){
        // $('.hoods').append("<li><a href='#'>" + data[i] + "</a></li>");
        if (i%3 === 0) {
          $(".hoods .left-column").append("<li><a href='#hood'>" + data[i].name + "</a></li>");
        } else if(i%2 === 0) {
          $(".hoods .middle-column").append("<li><a href='#hood'>" + data[i].name + "</a></li>");
        } else {
          $(".hoods .right-column").append("<li><a href='#hood'>" + data[i].name + "</a></li>");
        }
      }
      $('.hoods').append("<a href='#hood'><i class='fa fa-chevron-down'></i></a>");
    });
    $('html, body').animate({
      scrollTop: $('.hoods').offset().top
    }, 1500);
  });
  var globalData;
  var hood;
  //find data of neighborhood
  $("div .hoods").on('click', 'li', function(){
    var city = $(".input-city").val().titleize();
    var state = $(".input-state").val().toUpperCase();
    hood = $(this).text();
    var nation = 'US';
    $.ajax({
      url: "/hood",
      data: {"city": city, "state": state, "hood": hood}
    }).done(function(data) {
      globalData = data;
      $('.hood h3').remove();
      $('.hoodInfo h4').remove();
      $('.hoodInfo li').remove();
      $('.hood i').remove();
      $('#charts_div').children().remove();
      $('.hood .title').append('<h3>' + hood + ' of ' + city.titleize() + ', ' + state + '</h3>');
      // hood characteristics of people
      for(var i = 0; i < globalData[2].uniqueness.category.length; i++){
        $(".hoodInfo .left").append("<h4>" + data[2].uniqueness.category[i].type + "</h4>");
        if (Array.isArray(data[2].uniqueness.category[i].characteristic)) {
          for(var f = 0; f < data[2].uniqueness.category[i].characteristic.length; f++){
            $(".hoodInfo .left").append("<li>" + data[2].uniqueness.category[i].characteristic[f] + "</li>");
          }
        } else {
          $('.hoodInfo .left').append('<li>' + data[2].uniqueness.category[i].characteristic + '</li>');
        }
      }
      $('.hood').append("<a href='#charts'><i class='fa fa-chevron-down'></i></a>");
      $('.hood i').on('click', function() {
        $('html, body').animate({
          scrollTop: $('.charts').offset().top
        }, 1500);
      });

      //Hood Stats
      var stats = [];
      //City median home size (hood median home size is not available)
      stats.push(city + " median home size: " + data[1].tables.table[0].data.attribute[2].values.city.value + " sq ft");
      //Average Year Built
      stats.push(hood + " average home age: " + data[1].tables.table[0].data.attribute[3].values.neighborhood.value);
      stats.push(city + " average home age: " + data[1].tables.table[0].data.attribute[3].values.city.value);
      //Median income
      stats.push(medianIncome(data, hood, city, state));
      stats.push(homesWithKids(data, hood, city, state));
      for(var x = 0; x < stats.length; x++){
        $(".hoodInfo .right").append("<br><li>" + stats[x] + "</li>");
      }

      // owner vs renters chart
      var owners = data[1].tables.table[0].data.attribute[0].values.neighborhood.value;
      var renters = data[1].tables.table[0].data.attribute[1].values.neighborhood.value;
      drawPieChart();
      function drawPieChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Type');
        data.addColumn('number', 'Percent');
        data.addRows([
          ['Owners', owners * 100],
          ['Renters', renters * 100],
        ]);
        var options = {'title':'Owners vs. Renters',
        'width':500,
        'height':400};
        var chart = new google.visualization.PieChart(document.getElementById('charts_div'));
        chart.draw(data, options);
      }
      if((renters * 100) > 50) {
        $('#chart_description').append('<p>This displays the percentage of home owners versus renters.  The majority of people in this neighborhood are renters.</p>');
      }
      else if((owners * 100) > 50) {
        $('#chart_description').append('<p>This displays the percentage of home owners versus renters.  The majority of people in this neighborhood are home owners.</p>');
      }
      else {
        $('#chart_description').append('<p>This displays the percentage of home owners versus renters.  Home owners and renters are split evenly in this neighborhood.</p>');
      }
      $('.container').append("<center><a href='#search'><i class='fa fa-chevron-up'></i></a><center>");
    });
    $('html, body').animate({
      scrollTop: $('.hood').offset().top
    }, 1500);
  });


  $('#renters').on('click', function() {
    var city = $(".input-city").val().titleize();
    var state = $(".input-state").val().toUpperCase();
    var hood = $(this).text();
    var nation = 'US';
    //owner vs renters chart
    var owners = globalData[1].tables.table[0].data.attribute[0].values.neighborhood.value;
    var renters = globalData[1].tables.table[0].data.attribute[1].values.neighborhood.value;
    $('#chart_description p').remove();
    drawPieChart();
    function drawPieChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Type');
      data.addColumn('number', 'Percent');
      data.addRows([
        ['Owners', owners * 100],
        ['Renters', renters * 100],
      ]);
      var options = {
      'width': 500,
      'height': 400};
      var chart = new google.visualization.PieChart(document.getElementById('charts_div'));
      chart.draw(data, options);
    }
    if((renters * 100) > 50) {
      $('#chart_description').append('<p>This displays the percentage of home owners versus renters.  The majority of people in this neighborhood are renters.</p>');
    }
    else if((owners * 100) > 50) {
      $('#chart_description').append('<p>This displays the percentage of home owners versus renters.  The majority of people in this neighborhood are home owners.</p>');
    }
    else {
      $('#chart_description').append('<p>This displays the percentage of home owners versus renters.  Home owners and renters are split evenly in this neighborhood.</p>');
    }
  });

  $("#commute").on('click', function() {
    var city = $(".input-city").val().titleize();
    var state = $(".input-state").val().toUpperCase();
    var nation = 'US';
    // commute breakdown by population line chart
    var underTenMin = globalData[2].tables.table[2].data.attribute[0];
    var overSixtyMin = globalData[2].tables.table[2].data.attribute[1];
    var tenToTwentyMin = globalData[2].tables.table[2].data.attribute[2];
    var twentyToThirtyMin = globalData[2].tables.table[2].data.attribute[3];
    var thirtyToFortyFiveMin = globalData[2].tables.table[2].data.attribute[4];
    var fortyFiveToSixtyMin = globalData[2].tables.table[2].data.attribute[5];
    google.setOnLoadCallback(drawLineCommuteChart);
    $('#chart_description p').remove();
    var times = [
      { 'time': 'under ten minutes', 'percent': underTenMin.value },
      { 'time': 'ten to twenty minutes', 'percent': tenToTwentyMin.value },
      { 'time': 'twenty to thirty minutes', 'percent': twentyToThirtyMin.value },
      { 'time': 'thirty to forty five minutes', 'percent': thirtyToFortyFiveMin.value },
      { 'time': 'forty five to sixty minutes', 'percent': fortyFiveToSixtyMin.value },
      { 'time': 'over sixty minutes', 'percent': overSixtyMin.value }
    ];
    var majority = _.max(times, function(x) {
      return x.percent;
    });
    $('#chart_description').append('<p>The largest population of this neighborhood spends<br>' + majority.time + ' for their daily commute.</p>');
    drawLineCommuteChart();
    function drawLineCommuteChart() {
      var commuteData = google.visualization.arrayToDataTable([
        ['Commute Time', 'Percent of Population'],
        [underTenMin.name, underTenMin.value*100],
        [tenToTwentyMin.name, tenToTwentyMin.value*100],
        [twentyToThirtyMin.name, twentyToThirtyMin.value*100],
        [thirtyToFortyFiveMin.name, thirtyToFortyFiveMin.value*100],
        [fortyFiveToSixtyMin.name, fortyFiveToSixtyMin.value*100],
        [overSixtyMin.name, overSixtyMin.value*100]
      ]);
      var options = {
        legend: { position: 'bottom' },
        width: 900,
        height: 500
      };
      var chart = new google.visualization.LineChart(document.getElementById('charts_div'));
      chart.draw(commuteData, options);
    }
  });

  $("#age").on('click', function() {
    var city = $(".input-city").val().titleize();
    var state = $(".input-state").val().toUpperCase();
    var nation = 'US';
    // age breakdown line chart
    var underTen = globalData[2].tables.table[1].data.attribute[1];
    var underTwenty = globalData[2].tables.table[1].data.attribute[2];
    var underThirty = globalData[2].tables.table[1].data.attribute[3];
    var underFourty = globalData[2].tables.table[1].data.attribute[4];
    var underFifty = globalData[2].tables.table[1].data.attribute[5];
    var underSixty = globalData[2].tables.table[1].data.attribute[6];
    var underSeventy = globalData[2].tables.table[1].data.attribute[7];
    var overSeventy = globalData[2].tables.table[1].data.attribute[0];
    drawLineAgeChart();
    $('#chart_description p').remove();
    var ages = [
      { 'group': 'under ten', 'value': underTen.value },
      { 'group': 'teens', 'value': underTwenty.value },
      { 'group': 'twenties', 'value': underThirty.value },
      { 'group': 'thirties', 'value': underFourty.value },
      { 'group': 'fourties', 'value': underFifty.value },
      { 'group': 'sixties', 'value': underSixty.value },
      { 'group': 'seventies', 'value': underSeventy.value },
      { 'group': 'eighties or above', 'value': overSeventy.value }
    ];
    var majority = _.max(ages, function(x) {
      return x.value;
    });
    $('#chart_description').append("<p id='age-description'>The largest age group in this neighborhood are people in their " + majority.group + ".</p>");

    function drawLineAgeChart() {
      var data = google.visualization.arrayToDataTable([
        ['Age', 'Percent of Population'],
        [underTen.name, underTen.value*100],
        [underTwenty.name, underTwenty.value*100],
        [underThirty.name, underThirty.value*100],
        [underFourty.name, underFourty.value*100],
        [underFifty.name, underFifty.value*100],
        [underSixty.name, underSixty.value*100],
        [underSeventy.name, underSeventy.value*100],
        [overSeventy.name, overSeventy.value*100]
      ]);
      var options = {
        legend: { position: 'bottom' },
        height: 600,
        width: 800
      };
      var chart = new google.visualization.LineChart(document.getElementById('charts_div'));
      chart.draw(data, options);
    }
  });

  $("#price").on('click', function() {
    var city = $(".input-city").val().titleize();
    var state = $(".input-state").val().toUpperCase();
    var nation = 'US';
    // Median List Price
    var medianListPrice = globalData[0].tables.table.data.attribute[8];
    var medianPriceTitle = medianListPrice.name;
    drawBarChart();
    $('#chart_description p').remove();
    function drawBarChart() {
      var data = google.visualization.arrayToDataTable([
        [ 'Price per Square Foot', hood, city, nation],
        [  ' ', parseInt(medianListPrice.values.neighborhood.value), parseInt(medianListPrice.values.city.value), parseInt(medianListPrice.values.nation.value)],
      ]);
      var options = {
        chart: {
          'width':500,
          'height':500
        }
      };
      var chart = new google.charts.Bar(document.getElementById('charts_div'));
      chart.draw(data, options);
    }
  });

  $("#relationship").on('click', function() {
    var city = $(".input-city").val().titleize();
    var state = $(".input-state").val().toUpperCase();
    var nation = 'US';
    // relationships donut chart
    var divorcedFemale = globalData[2].tables.table[4].data.attribute[0];
    var divorcedMale = globalData[2].tables.table[4].data.attribute[1];
    var marriedFemale = globalData[2].tables.table[4].data.attribute[2];
    var marriedMale = globalData[2].tables.table[4].data.attribute[3];
    var singleFemale = globalData[2].tables.table[4].data.attribute[4];
    var singleMale = globalData[2].tables.table[4].data.attribute[5];
    var widowedFemale = globalData[2].tables.table[4].data.attribute[6];
    var widowedMale = globalData[2].tables.table[4].data.attribute[7];
    relationshipChart();
    $('#chart_description p').remove();
    function relationshipChart() {
      var relationshipData =
      google.visualization.arrayToDataTable([
        ["Relationship Status", "Portion of Neighborhood"],
        [singleFemale.name, singleFemale.value*100],
        [singleMale.name, singleMale.value*100],
        [divorcedFemale.name, divorcedFemale.value*100],
        [divorcedMale.name, divorcedMale.value*100],
        [marriedFemale.name, marriedFemale.value*100],
        [marriedMale.name, marriedMale.value*100],
        [widowedFemale.name, widowedFemale.value*100],
        [widowedMale.name, widowedMale.value*100]
      ]);
      var options = {
        pieHole: 0.2,
        width: 700,
        height: 700
      };
      var chart = new google.visualization.PieChart(document.getElementById('charts_div'));
      chart.draw(relationshipData, options);
    }
  });

});
