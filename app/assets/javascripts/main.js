$(function(){
  $(":button").on("click", function(){
    var city = $(".input-city").val()
    var state = $(".input-state").val()
    $.ajax({
      url: "/",
      data: {"city": city, "state": state },
      success: function(){ $(".hoods").load("/ .hoods") }
    });
  });

});
