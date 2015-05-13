
$(function(){

$(":button").on("click", function(){
  var city = $(".input-city").val();
  var state = $(".input-state").val();
  $.ajax({
    url: "/map",
    data: {"city": city, "state": state }
  }).done(function(data) {
    // var markers = [];
    for(var i = 0; i < data.length; i++){
      $('.hood').append("<li><a href='#'>" + data[i]["name"] + ", " + data[i]["latitude"] + ', ' + data[i]["longitude"] + "</a></li>");
      // markers += [data[i]["name"], data[i]["latitude"], data[i]["longitude"]];
    }
    // console.log(markers);
  });
});

});


jQuery(function($) {
    // Asynchronously Load the map API
    var script = document.createElement('script');
    script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['Washington Park', 39.701697,-104.966358],
        ['Hale', 39.732844,-104.931504]
    ];

    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Washington Park</h3>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>Hale</h3>' + '</div>']
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            };
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });

}
