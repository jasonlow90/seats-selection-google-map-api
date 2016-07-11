function initMap(testing) {

  // Geo coordinates of conference location:
  var generalAssembly = {lat: -37.818637, lng: 144.958976};
  // var sydney = {lat: -33.867614, lng: 151.209017};
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: generalAssembly,
    scrollwheel: false,
    zoom: 12
  });

  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });

  // Set destination, origin and travel mode.
  var request = {
    destination: generalAssembly,
    origin: testing,
    travelMode: google.maps.TravelMode.DRIVING
  };

  // Pass the directions request to the directions service.
  var directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // Display the route on the map.
      directionsDisplay.setDirections(response);
    }
  });

}


$(function(){

  $('#submit').on('click', function(){
    event.preventDefault();
    var address = $('input:eq(0)').val(); // selecting the input tag
    // var formattedAddress = address.replace(" ", "-");

    // Get request to display the route between conference location and input location
    $.ajax({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCi0m1wOwIL5-JkxkTNTpl8cI_PWBran-Y',
    }).done(function(data){

      var originCoordinates = data.results[0].geometry.location; // => geocoordinates of the query location

      // Passing the origin geo coordinates as the origin into initmap
      initMap(originCoordinates);

      // To get the distance and duration between wdi conference location and user's origin
      $.ajax({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=-37.818637,144.958976&destinations='+originCoordinates.lat+','+originCoordinates.lng+'&mode=driving&key=AIzaSyCi0m1wOwIL5-JkxkTNTpl8cI_PWBran-Y'
      }).done(function(data){
        var duration = data.rows[0].elements[0].duration;
        var distance = data.rows[0].elements[0].distance;

        $('#output').text("Distance to WDI Conference: " + distance.text + " at approximately " + duration.text);
      });
    });

  });

});
