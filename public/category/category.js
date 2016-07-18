var category = angular.module('category', ['angularMoment', 'chart.js'])
  .controller('categoryController', ['$scope', '$http', '$document', 'categoryFactory', function($scope, $http, $document, categoryFactory) {

    $scope.categories = categoryFactory.categories;

    $scope.sendData = function(category, selectedActivity){
      var payload = {
        category: category
      };
      console.log(payload, selectedActivity);
      categoryFactory.sendData(payload, selectedActivity).then(function(response){
        $scope.categories.category = response.data.category;
        $scope.categories.activity = response.data.activity;
      });
    };

    $scope.getAllData = function(){
      categoryFactory.getAllData().then(function(response){
        var activityData = {};

        response.data.forEach(function(doc){
          doc.time.forEach(function(time){
            var start = new Date(time[0]);
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

          $scope.unparsedActivityData = activityData
        });

        function parseActivity(activitiesObj){
          var activityResults = [];

          for(var prop in activitiesObj){
            activitiesObj[prop].forEach(function(activity){
                individualActivity = {};
                individualActivity.date = prop;
                individualActivity.category = activity.category;
                individualActivity.activity = activity.activity;
                individualActivity.start = moment(activity.time[0]).format('h:mm A');
                individualActivity.stop =  moment(activity.time[1]).format('h:mm A');
                individualActivity.duration =  Math.floor(moment.duration((activity.time[1] - activity.time[0])/1000/60/60, 'hours'));
                activityResults.push(individualActivity);
            });
          }
          return activityResults;
        };


        var colorMap = {};

        function parseBarChartData(activitiesObj){
          var obj = {};
          for(var date in activitiesObj){
            var barChartData = {};
            activitiesObj[date].forEach(function(activity){
              barChartData[JSON.stringify({
                start: activity.time[0],
                stop: activity.time[1]
              })] = activity.category;
            })
            colorMap[date] = barChartData;
            obj[date] = sortBarChartData(barChartData, date);
          }

          return obj;
        }

        function sortBarChartData(barChartDataObj, date){
          var sortedActivityArray = Object.keys(barChartDataObj).sort(function(a,b) {
            return JSON.parse(a).start - JSON.parse(b).start;
          });
          return parsePercentage(sortedActivityArray, date)
        }


        function parsePercentage(sortedArray, date){
          var percentages = []
          var containerArray = []
          sortedArray.forEach(function(activity){
            containerArray.push(JSON.parse(activity));
          })

          containerArray.forEach(function(obj){
            
            var percentage = (obj.stop - obj.start)/1000/60/60/24*100
            var category = colorMap[date][JSON.stringify(obj)]
            var percentageObj = {}
            percentageObj.percentage = percentage;
            percentageObj.category = category
            percentages.push(percentageObj)
          })
        return percentages
        }

        // function insertBlankSpace(sortedActivityArray){
        //   var parsedContainer = []
        //   if(sortedActivityArray.length<2){
            
        //   }
        //   for(var i = 0; i< sortedActivityArray.length -1; i++){
        //     parsedContainer.push(JSON.parse(sortedActivityArray[i]));
        //   }
        // }

        $scope.activityData = parseActivity(activityData);

        $scope.barChartData = parseBarChartData(activityData)
        categoryFactory.set($scope.activityData);
      });
    };
    $scope.getAllData();
  }])

  .controller('chartCtrl', ['$scope', 'categoryFactory', function($scope, categoryFactory) {
    $scope.labels = [];
    $scope.data = [];

    var colors = {
      sleep: '#337AB7',
      fun: "#5CB85C",
      work: "#D9534F",
      development:"#F0AD4E"
    };

    $scope.$watch(function() {return categoryFactory.get();}, function (value) {
      var dougnutData = {};

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
        $scope.data.push(Math.round(dougnutData[prop]/1000/60/60));
        // $scope.colours.push(colors[prop])
      }
    });
  }])

  .factory('categoryFactory', ['$document', '$http', function($document, $http){
    // var category = {};

    var categories = [
      {
        category: 'Sleep',
        time: 0,
        colorClass: 'panel-primary',
        activities: [
          {
            id: 1,
            label: 'Nap'
          },
          {
            id: 2,
            label: 'Deep Sleep'
        }]
      },
      {
        category: 'Fun',
        time: 0,
        colorClass: 'panel-green',
        activities: [
          {
            id: 1,
            label: 'Visit Friends'
          },
          {
            id: 2,
            label: 'Play Games'
        }]
      },
      {
        category: 'Work',
        time: 0,
        colorClass: 'panel-red',
        activities: [
          {
            id: 1,
            label: 'Office Time'
          },
          {
            id: 2,
            label: 'Work From Home'
        }]
      },
      {
        category: 'Development',
        time: 0,
        colorClass: 'panel-yellow',
        activities: [
          {
            id: 1,
            label: 'Study Databases'
          },
          {
            id: 2,
            label: 'Study Angular'
        }]
      }
    ];

    var activitiesObj = {};

    var sendData = function(payload, selectedActivity){
      console.log("SELECTED ACTIVITY 1:",selectedActivity);
      payload.time = Date.now();
      payload.activity = selectedActivity.label;
      console.log("PAYLOAD:",payload);
      return $http.post('/api/toggleActivity', payload);
    };

    var getAllData = function(user){
      return $http.post('/api/all', {userID: '001'});
    };

    var setter = function(data) {
      activitiesObj = data;
    };

    var getter = function() {
      return activitiesObj;
    };

    return {
      set: setter,
      get: getter,
      sendData : sendData,
      // category : category,
      categories: categories,
      getAllData : getAllData
    };
  }]);
