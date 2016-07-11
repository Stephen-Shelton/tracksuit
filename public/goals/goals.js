// create a goal
  // choose a category
    // choose a number of target hours
      // post to server new goal
      // display new goal

angular.module('goals', [])

.controller('goalsController', ['$scope', function($scope) {
  $scope.time = goalsFactory.time;
  $scope.categories = goalsFactory.categories;
  $scope.goals = goalsFactory.goals;

  $scope.createGoal = function(category, time) {
    var goal = {
      userID = 'testID', //TODO: Update this to username from global factoryvar
      goalCategory = category,
      goalActivityName = category, //TODO: Update this to activity from $scope
      goalTime = time
    };

    $scope.goals[goal.goalActivityName] = goal;
    return goal;
  }

  $scope.postGoal = function($scope.category, $scope.hours) {
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
