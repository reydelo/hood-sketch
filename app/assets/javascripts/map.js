//
// $(function(){
//
// $(":button").on("click", function(){
//   var city = $(".input-city").val();
//   var state = $(".input-state").val();
//   $.ajax({
//     url: "/map",
//     data: {"city": city, "state": state }
//   }).done(function(data) {
//     var markers = [];
//     debugger
//     for(var i = 0; i < data.length; i++){
//       // $('.hood').append("<li><a href='#'>" + data[i]["name"] + ", " + data[i]["latitude"] + ', ' + data[i]["longitude"] + "</a></li>");
//       markers.push(data[i].name, data[i].latitude, data[i].longitude);
//     }
//     console.log(markers);
//   });
// });
//
// });
