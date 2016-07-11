angular.module('category', [])

.controller('categoryController', function($scope, $http, $document, appFactory){
  $scope.state = "start";
  $scope.payload = {
    category: "",
    time: "",
    state: ""
  };
   $scope.category = {
      category : "filler text",
      duration : "0 seconds"
    };
  $scope.sendData = appFactory.sendData;

  $scope.changeState = function(){
    $scope.state === "start" ? $scope.state = "stop" : $scope.state = "start"
  };

  $scope.category = appFactory.category;

})
.factory('appFactory', ['$document', '$http', function($document, $http){

  var sendData = function(payload, state){
    var target = document.getElementById('category').innerHTML
    payload.category = target;
    payload.time = Date.now();
    payload.state = state

   

    $http.post('/api/toggleActivity', payload)
    .then(function successCallback(response) {
      category.category = response.data.category;
      category.duration = response.data.duration;
    }, function errorCallback(err) {
      console.error(err)
    });
  }

 

  return {
    sendData : sendData
  }
}])
