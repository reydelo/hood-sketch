$(function(){

  //titleize function
  String.prototype.titleize = function() {
    var words = this.split(' ');
    var array = [];
    for (var i=0; i<words.length; ++i) {
      array.push(words[i].charAt(0).toUpperCase() + words[i].toLowerCase().slice(1));
    }
    return array.join(' ');
  };

  //find neighborhoods of city
  $(":button").on("click", function(){
    var city = $(".input-city").val();
    var state = $(".input-state").val();
    $.ajax({
      url: "/hoods",
      data: {"city": city, "state": state }
    }).done(function(data) {
      $(".hoods li").remove();
      $(".hoods .title h3").remove();
      // $('.hood').children().remove();
      $('.hoods .title').append("<h3>Neighborhoods of " + city + ', ' + state + "</h3>");
      for(var i = 0; i < data.length; i++){
        // $('.hoods').append("<li><a href='#'>" + data[i] + "</a></li>");
        // debugger
        if (i%3 === 0) {
          $(".hoods .left-column").append("<li><a href='#'>" + data[i] + "</a></li>");
        } else if(i%2 === 0) {
          $(".hoods .middle-column").append("<li><a href='#'>" + data[i] + "</a></li>");
        } else {
          $(".hoods .right-column").append("<li><a href='#'>" + data[i] + "</a></li>");
        }
      }
    });
  });

  //find data of neighborhood
  $("div .hoods").on('click', 'li', function(){
    var city = $(".input-city").val();
    var state = $(".input-state").val();
    var hood = $(this).text();
    var nation = 'US';
    $.ajax({
      url: "/hood",
      data: {"city": city, "state": state, "hood": hood}
    }).done(function(data) {
      // $('.hood').children().remove();
      $('.hood .title').append('<h3>' + hood + ' of ' + city + ', ' + state + '</h3>');
      // hood characteristics of people
      for(var i = 0; i < data[2]["uniqueness"]["category"].length; i++){
        $(".hoodInfo").append("<h4>" + data[2]["uniqueness"]["category"][i]['type'] + "</h4>");
        if (Array.isArray(data[2]["uniqueness"]["category"][i]['characteristic'])) {
          for(var f = 0; f < data[2]["uniqueness"]["category"][i]['characteristic'].length; f++){
            $(".hoodInfo").append("<li>" + data[2]["uniqueness"]["category"][i]['characteristic'][f] + "</li>");
          }
        } else {
          $('.hoodInfo').append('<li>' + data[2]["uniqueness"]["category"][i]['characteristic'] + '</li>');
        }
      }
      //Median List Price
      var medianListPrice = data[0]["tables"]["table"]["data"]["attribute"][8];
      var medianPriceTitle = medianListPrice['name'];
      drawBarChart();
      function drawBarChart() {
        var data = google.visualization.arrayToDataTable([
          [ 'Price per Square Foot', hood, city, nation],
          [  ' ', parseInt(medianListPrice["values"]["neighborhood"]["value"]), parseInt(medianListPrice["values"]["city"]["value"]), parseInt(medianListPrice["values"]["nation"]["value"])],
        ]);
        var options = {
          chart: {
            title: medianPriceTitle,
            subtitle: '',
          }
        };
        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
        chart.draw(data, options);
      }
    });
  });


  //GOOGLE CHARTS
  // Set a callback to run when the Google Visualization API is loaded.
  //   google.setOnLoadCallback(drawPieChart);
  //
  //   // Callback that creates and populates a data table,
  //   // instantiates the pie chart, passes in the data and
  //   // draws it.
  //   function drawPieChart() {
  //     // Create the data table.
  //     var data = new google.visualization.DataTable();
  //     data.addColumn('string', 'Topping');
  //     data.addColumn('number', 'Slices');
  //     data.addRows([
  //       ['Mushrooms', 3],
  //       ['Onions', 1],
  //       ['Olives', 1],
  //       ['Zucchini', 1],
  //       ['Pepperoni', 2]
  //     ]);
  //
  //     // Set chart options
  //     var options = {'title':'How Much Pizza I Ate Last Night',
  //                    'width':400,
  //                    'height':300};
  //
  //     // Instantiate and draw our chart, passing in some options.
  //     var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  //     chart.draw(data, options);
  //   }
  //
  //
  //
  // google.setOnLoadCallback(drawBarChart);
  //      function drawBarChart() {
  //        var data = google.visualization.arrayToDataTable([
  //          [ '', 'Sales', 'Expenses', 'Profit'],
  //          [ '' ,1000, 400, 200],
  //
  //        ]);
  //
  //        var options = {
  //          chart: {
  //            title: 'Company Performance',
  //            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
  //          }
  //        };
  //
  //        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
  //
  //        chart.draw(data, options);
  //      }
  //
  //
  //
  //
  //on ready
});
