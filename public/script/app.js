$(document).ready(
  function show_alert(){
   var oArgs = {
      app_key: "V8Qd6k9G6vFg92b3",
      q: "music",
      where: "New York",
      "date": "2016010100-2016120100",
      page_size: 20,
      sort_order: "popularity",
   };

   EVDB.API.call("/events/search", oArgs, function(oData) {
     console.log(oData);
      for (i = 0; i < oData.events.event.length; i++){
        initMap(oData.events.event[0].latitude, oData.events.event[0].longitude);
        $('.events').append('<div class="title">'
        +oData.events.event[i].title+'</div><div class="details">'
        +oData.events.event[i].venue_name+'<br>'
        +oData.events.event[i].venue_address+'<br>'
        +oData.events.event[i].city_name+', '+oData.events.event[i].region_abbr+' '+oData.events.event[i].postal_code+'<br><br>'
        +oData.events.event[i].start_time+
        '<br><br><br></div></div>'
        );
      }
    });
 }
)

var map;
function initMap(lat, lng) {
  setTimeout(function(){
    map = new google.maps.Map(document.getElementById('map'), {
     zoom: 13,
     center: {lat: parseFloat(lat), lng: parseFloat(lng)}
   });
   var marker = new google.maps.Marker({
     position: {lat: parseFloat(lat), lng: parseFloat(lng)},
     map: map,
     draggable: true,
   });
   google.maps.event.addListener(marker, 'dragend', function (evt) {
     lat = evt.latLng.lat().toString();
     lng = evt.latLng.lng().toString();
   });
  }, 10);
}

var app = angular.module('EventApp', ['ngAnimate']);
app.controller('MainController', ['$http', function($http){
  var mainCtrl = this;
  mainCtrl.loadMapCoor = function(){
  	initMap();
  };
}]);
