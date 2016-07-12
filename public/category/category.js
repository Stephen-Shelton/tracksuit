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
      }];

    $scope.category =  categoryFactory.category;
    $scope.activity = $scope.activities[0].label
    $scope.categoryName = "Sleep";

    var selectedActivity = $scope.selectedActivity;

    $scope.payload = {
      category: $scope.categoryName,
      activity: selectedActivity,
      time: ""
    };

    $scope.sendData = function(payload, selectedActivity){
      categoryFactory.sendData(payload, selectedActivity).then(function(response){
        $scope.category.category = response.data.category;
        $scope.category.activity = response.data.activity;
        $scope.category.duration = response.data.duration;
      });
    }
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
    var category = {};

    var sendData = function(payload, selectedActivity){
      payload.time = Date.now();
      payload.activity = selectedActivity.label
      return $http.post('/api/toggleActivity', payload)
    };


    return {
      sendData : sendData,
      category: category
    }
  }])
