angular.module("app", [
  'ui.bootstrap',
  'category'
  // 'ui.router'
  ])

.config(function($httpProvider) { //add state and URL provide
  
//   $urlRouterProvider.otherwise('/')

//   $stateProvider
//     .state('/', {
//       templateUrl: 'index.html',
//       controller: 'appController'
//     })
//     .state('/test', {
//       templateUrl: 'Category/category.html',
//       controller: 'categoryController'
//     })
})

.controller('appController', function($scope, $http, $document){
  $scope.state = "start"
  $scope.payload = {
    category: "",
    time: "",
    state: ""
  }


  $scope.sendData = function($document){
    var target = document.getElementById('category').innerHTML
    $scope.payload.category = target;
    $scope.payload.time = Date.now();
    $scope.payload.state = $scope.state
    $http({
      method: 'POST',
      url: '/api/toggleActivity'
    }).then(function successCallback(response) {
      console.log(response)
    }, function errorCallback(err) {
      console.error(err)
    });
  }

  $scope.changeState = function(){
    $scope.state === "start" ? $scope.state = "stop" : $scope.state = "start"
  }


