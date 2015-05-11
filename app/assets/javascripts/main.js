$(function(){
  $(":button").on("click", function(){
    var city = $(".input-city").val();
    var state = $(".input-state").val();
    $.ajax({
      url: "/hoods",
      data: {"city": city, "state": state }
    }).done(function(data) {
      $("li").remove()
      for(var i = 0; i < data.length; i++){
        $(".hoods").append("<li>" + data[i] + "</li>")
      }

      // $('body').append(html);
      });

  });
});



//success: function(){ $(".hoods").load("/hoods .hoods") }
