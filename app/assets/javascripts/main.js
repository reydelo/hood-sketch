$(function(){

  //find neighborhoods of city
  $(":button").on("click", function(){
    var city = $(".input-city").val();
    var state = $(".input-state").val();
    $.ajax({
      url: "/hoods",
      data: {"city": city, "state": state }
    }).done(function(data) {
      $(".hoods").children().remove();
      $('.hood').children().remove();
      $('.hoods').append("<h3>Neighborhoods of " + city + ', ' + state + "</h3>");
      for(var i = 0; i < data.length; i++){
        $(".hoods").append("<li><a href='#'>" + data[i] + "</a></li>");
      }
    });
  });

  //find data of neighborhood
  $("div").on('click', 'a', function(){
    var city = $(".input-city").val();
    var state = $(".input-state").val();
    var hood = $(this).text();
    $.ajax({
      url: "/hood",
      data: {"city": city, "state": state, "hood": hood}
    }).done(function(data) {
      console.log(data);
      $('.hood').children().remove();
      $('.hood').append('<h3>' + hood + ' of ' + city + ', ' + state + '</h3>');
      // hood characteristics of people
      for(var i = 0; i < data[2]["uniqueness"]["category"].length; i++){
        $(".hood").append("<h4>" + data[2]["uniqueness"]["category"][i]['type'] + "</h4>");
        if (Array.isArray(data[2]["uniqueness"]["category"][i]['characteristic'])) {
        for(var f = 0; f < data[2]["uniqueness"]["category"][i]['characteristic'].length; f++){
          $(".hood").append("<li>" + data[2]["uniqueness"]["category"][i]['characteristic'][f] + "</li>");
        }
        } else {
          $('.hood').append('<li>' + data[2]["uniqueness"]["category"][i]['characteristic'] + '</li>');
        }
      }
      //Median List Price
      var medianPriceTitle = data[0]["tables"]["table"]["data"]["attributes"][8]['name'];

    });

  });
});
