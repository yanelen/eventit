var app = angular.module('NotebookApp', []);

app.controller('CreateController', ['$http', function($http){
  var that = this;
  $http.get('notes').success(function(data){
    that.notes = data;
  });

  this.create = function(){
    $http.post('/notes', {
      todo_value: this.value
    }).success(function(data){
      console.log(data);
      that.notes = data;
    });
  }
}]);
