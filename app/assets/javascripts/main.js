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
      for(var i = 0; i < data.length; i++){
        $(".hood").append("<h4>" + data[i]['type'] + "</h4>");
        if (Array.isArray(data[i]['characteristic'])) {
        for(var f = 0; f < data[i]['characteristic'].length; f++){
          $(".hood").append("<li>" + data[i]['characteristic'][f] + "</li>");
        }
        } else {
          $('.hood').append('<li>' + data[i]['characteristic'] + '</li>');
        }
      }
    });

  });
});
