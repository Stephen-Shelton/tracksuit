var category = angular
  .module('category', [])

  .controller('categoryController', function($scope, $http, $document, categoryFactory){
    ////////////////////////
    /// Not sure if we even need this controller
    ///////////////////////
  })
  .controller('sleepController', function($scope, $http, $document, categoryFactory){
    $scope.activities = [
      {
      id: 1,
      label: 'Nap'
      },
      {
      id: 2,
      label: 'Deep Sleep'
      }
    ];

   $scope.categoryName = "Sleep"
   $scope.state = "start";
    $scope.payload = {
      category: $scope.categoryName,
      time: "",
      state: ""
    };
     $scope.category = {
        category : "filler text",
        duration : "0 seconds"
      };
    $scope.sendData = categoryFactory.sendData;

    $scope.changeState = function(){
      $scope.state === "start" ? $scope.state = "stop" : $scope.state = "start"
    };

    $scope.category = categoryFactory.category;

  })
  .controller('funController', function($scope, $http, $document, categoryFactory){
   $scope.categoryName = "Fun"
   $scope.state = "start";
    $scope.payload = {
      category: $scope.categoryName,
      time: "",
      state: ""
    };
     $scope.category = {
        category : "filler text",
        duration : "0 seconds"
      };
    $scope.sendData = categoryFactory.sendData;

    $scope.changeState = function(){
      $scope.state === "start" ? $scope.state = "stop" : $scope.state = "start"
    };

    $scope.category = categoryFactory.category;

  })
  .controller('workController', function($scope, $http, $document, categoryFactory){
   $scope.categoryName = "work"
   $scope.state = "start";
    $scope.payload = {
      category: $scope.categoryName,
      time: "",
      state: ""
    };
     $scope.category = {
        category : "filler text",
        duration : "0 seconds"
      };
    $scope.sendData = categoryFactory.sendData;

    $scope.changeState = function(){
      $scope.state === "start" ? $scope.state = "stop" : $scope.state = "start"
    };

    $scope.category = categoryFactory.category;

  })
  .controller('selfController', function($scope, $http, $document, categoryFactory){
   $scope.state = "start";
   $scope.categoryName = "Self Improvement"
    $scope.payload = {
      category: $scope.categoryName,
      time: "",
      state: ""
    };
     $scope.category = {
        category : "filler text",
        duration : "0 seconds"
      };
    $scope.sendData = categoryFactory.sendData;

    $scope.changeState = function(){
      $scope.state === "start" ? $scope.state = "stop" : $scope.state = "start"
    };

    $scope.category = categoryFactory.category;

  })
  .factory('categoryFactory', ['$document', '$http', function($document, $http){

    var sendData = function(payload, state){
      // console.log('sending data')
      console.log('sending payload: ', payload)
      // payload.category = target;
      payload.time = Date.now();
      payload.state = state

      $http.post('/api/toggleActivity', payload)
      .then(function successCallback(response) {
        // console.log(response.data)
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