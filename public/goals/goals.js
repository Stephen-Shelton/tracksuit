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
      goalCategory: category,
      goalActivityName: category, //TODO: Update this to activity from $scope
      goalTime: time
    };

    $scope.goals[goal.goalActivityName] = goal;
    return goal;
  };

  $scope.postGoal = function(categories, time) {
    // sendData
      //.then display posted data
  }
}])

.factory('goalsFactory', function() {
  var categories = [
    { name: 'Sleep' },
    { name: 'Exercise' }
  ];
  var time = 0;
  var goals = {};

  return {
    categories: categories,
    time: time,
    goals: goals
  }
})


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
   goalCategory: String,
   goalActivityName: String,
   goalTime: Number
 }
*/
