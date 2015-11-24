$(document).ready(
  function show_alert(){
   var oArgs = {
      app_key: "V8Qd6k9G6vFg92b3",
      q: "music",
      where: "New York",
      "date": "2015112200-2016112200",
      page_size: 5,
      sort_order: "popularity",
   };

   EVDB.API.call("/events/search", oArgs, function(oData) {
     console.log(oData);
      for (i = 0; i < oData.events.event.length; i++){
        initMap(oData.events.event[i].latitude, oData.events.event[i].longitude);
        $('.events').append('<div class="row"><div class="column1"><img class="picture" src="'
        +oData.events.event[i].image.medium.url+'"></div><div class="column2"><div class="title">'
        +oData.events.event[i].title+'</div><div class="details">'+oData.events.event[i].venue_name+'</div></div>'
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
