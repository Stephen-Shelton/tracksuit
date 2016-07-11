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

   $scope.categoryName = "Sleep";
   $scope.state = "start";
   var selectedActivity = $scope.selectedActivity;
    $scope.payload = {
      category: $scope.categoryName,
      activity: selectedActivity,
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

    var sendData = function(payload, state, selectedActivity){
      payload.time = Date.now();
      payload.state = state
      payload.activity = selectedActivity.label
      console.log('sending payload: ', payload)

      $http.post('/api/toggleActivity', payload)
      .then(function successCallback(response) {
        category.category = response.data.category;
        category.duration = response.data.duration;
        console.log('resp from server: ', response.data)
        console.log('----------------------')
      }, function errorCallback(err) {
        console.error(err)
      });
    }

    return {
      sendData : sendData
    }
  }])