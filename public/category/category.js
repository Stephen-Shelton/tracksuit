var category = angular
  .module('category', ['angularMoment', 'chart.js'])

  .controller('categoryController', function($scope, $http, $document, categoryFactory){
    
  })
  .controller('chartCtrl', function($scope, categoryFactory) {
    $scope.labels = [];
    $scope.data = [];
    var colors = {
      sleep: '#337AB7',
      fun: "#5CB85C",
      work: "#D9534F",
      development:"#F0AD4E"
    }
   
    $scope.$watch(function() {return categoryFactory.get();}, function (value) {
      var dougnutData = {}
      
      for (var i = 0; i < value.length; i++) {
        var activity = value[i];
        if(!dougnutData[activity.category]){
          dougnutData[activity.category] = activity.duration;
        }
        else {
          dougnutData[activity.category] += activity.duration;
        }

      }
      for(var prop in dougnutData){
        $scope.labels.push(prop);
        $scope.data.push(Math.round(dougnutData[prop]/1000/60/60))
        // $scope.colours.push(colors[prop])
      }
    });
    
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

      $scope.message = {
        text: 'hello world!',
        time: new Date()
      };

    $scope.category =  categoryFactory.category;
    $scope.activity = $scope.activities[0].label
    $scope.categoryName = "sleep";

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

    $scope.getAllData = function(){
      categoryFactory.getAllData().then(function(response){
        var activityData = {};
        response.data.forEach(function(doc){
          doc.time.forEach(function(time){
            var start = new Date(time[0])
            var startDate =  (start.getMonth() + 1) + "/" + start.getDate() + "/" + start.getFullYear();
            var stop = new Date(time[1]);
            var stopDate = (stop.getMonth() + 1) + "/" + stop.getDate() + "/" + stop.getFullYear();
            if(activityData[startDate] === undefined){
              activityData[startDate] = [];
            }

            if(stopDate === startDate) {
              activityData[startDate].push({
                category: doc.category,
                activity: doc.activity,
                time: [start.getTime(), stop.getTime()]
              });
            } else {
              var begin = new Date(time[1]).setHours(0,0,0,0);
              var end = new Date(time[0]).setHours(23,59,99,999);
              activityData[stopDate] = activityData[stopDate] || [];
              activityData[startDate].push({
                category: doc.category,
                activity: doc.activity,
                time: [start.getTime(), end]
              });
              activityData[stopDate].push({
                category: doc.category,
                activity: doc.activity,
                time: [begin, stop.getTime()]
              });
            }
          });
        });

        function parseActivity(activitiesObj){
          activityResults = []
          for(var prop in activitiesObj){
            activitiesObj[prop].forEach(function(activity){
                individualActivity = {};
                individualActivity.date = prop;
                individualActivity.category = activity.category;
                individualActivity.activity = activity.activity;
                individualActivity.start = moment(activity.time[0]).format('h:mm A');
                individualActivity.stop =  moment(activity.time[1]).format('h:mm A');
                individualActivity.duration =  Math.floor(moment.duration((activity.time[1] - activity.time[0])/1000/60/60, 'hours'))
                activityResults.push(individualActivity);
            })
          }
          return activityResults;
        }

        $scope.activityData = parseActivity(activityData);
        categoryFactory.set($scope.activityData);
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
    var oldData = {};
    var activitiesObj = {};

    var sendData = function(payload, selectedActivity){
      payload.time = Date.now()
      payload.activity = selectedActivity.label
      return $http.post('/api/toggleActivity', payload)
    };
    var getAllData = function(user){
      return $http.post('/api/all', {userID: '001'});
    }
    var setter = function(data) {
      activitiesObj = data;
    }
    var getter = function() {
      return activitiesObj;
    }
    return {
      set: setter,
      get: getter,
      sendData : sendData,
      category : category,
      getAllData : getAllData
    }
  }])
