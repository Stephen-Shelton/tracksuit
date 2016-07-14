// create a goal
  // choose a category
    // choose a number of target hours
      // post to server new goal
      // display new goal

angular.module('goals', [])

.controller('goalsController', ['$scope', 'goalsFactory', function($scope, goalsFactory) {
  $scope.time = goalsFactory.time;
  $scope.categories = goalsFactory.categories;
  $scope.goals = goalsFactory.goals;

  $scope.createGoal = function(category, time) {
    var goal = {
      userID: 'testID', //TODO: Update this to username from global factoryvar
      category: category,
      activity: category, //TODO: Update this to activity from $scope
      time: time
    };

    $scope.goals[goal.activity] = goal;
    return goal;
  };

  $scope.postGoal = function(categories, time) {
    goalsFactory.sendData($scope.createGoal('Exercise', 1000), {name: 'Exercise'})
    .then(goalsFactory.getAllData).then(function(response) {console.log(response.data)});
      //.then display posted data
  }
}])

.factory('goalsFactory', ['$http', function($http) {
  var categories = [
    { name: 'Sleep' },
    { name: 'Exercise' }
  ];
  var time = 0;
  var goals = {};

  var sendData = function(payload, selectedActivity){
    payload.time = 1000;
    payload.activity = selectedActivity.name;
    return $http.post('/api/goals', payload)
  };
  var getAllData = function(user){
    return $http.get('/api/goals', {userID: '001'});
  }

  return {
    categories: categories,
    time: time,
    goals: goals,
    sendData: sendData,
    getAllData: getAllData
  }
}])


// view goals
  // display actual time and goal time --> eventually display bar chart of activity time vs goal time
    // click on button to edit goal --> eventually click on bar to edit goal
      // on edit goal interface choose a new number of target hours
        // put to server updated goal
        // return to default goal view, displaying updated goal

// TODO goal integration with main view
  // inspiring callouts when you make progress on a goal
  // nagging reminders when you get close to a goal in a 'negative' category
  // neutral callout when you do an activity you don't have a goal for

// TODO create daily or weekly goals

// TODO make suggestions on how to achieve goals based on activity history

// goal schema:
/*
 {
   userID: String,
   category: String,
   activity: String,
   time: Number
 }
*/
