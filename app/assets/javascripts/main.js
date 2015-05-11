$(function(){
  $(":button").on("click", function(){
    var city = $(".input-city").val();
    var state = $(".input-state").val();
    $.ajax({
      url: "/hoods",
      data: {"city": city, "state": state }
      }).done(function(data) {
        $("li").remove();
        for(var i = 0; i < data.length; i++){
          $(".hoods").append("<li><a href='#'>" + data[i] + "</a></li>");
        }
        // $('body').append(html);
      });
    });
    $("div").on('click', 'a', function(){
      // var city = $(".input-city").val();
      // var state = $(".input-state").val();
      var hood = $(this).text();
      console.log(hood);
      // $.ajax({
      //   url: "/hood",
      //   data: {"city": city, "state": state, "hood": hood}
      // }).done(function(data) {
      //   console.log(data);
      // });

    });
});



//success: function(){ $(".hoods").load("/hoods .hoods") }
