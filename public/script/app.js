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
        lat = oData.events.event[i].latitude;
        lng = oData.events.event[i].longitude;

        //$('.picture').css('background-image', 'url(' + oData.events.event[0].image.medium.url + ')');
        //$('.picture1').css('background-image', 'url(' + oData.events.event[1].image.medium.url + ')');
      //$('.picture').append('<img src="'+oData.events.event[i].image.medium.url+'">');
      }
      $('.detail').append('<h5>' + oData.events.event[0].title + '</h5><h6>' + oData.events.event[0].venue_name + '</h6>');
    });
 }
)

var map;
function initMap() {
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
