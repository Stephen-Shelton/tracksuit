// create a goal
  // choose a category
    // choose a number of target hours
      // post to server new goal
      // display new goal

angular.module('goals', [])

.controller('goalsController', ['$scope', function($scope) {
  $scope.category = //factoryvar;
  $scope.hours = 0;

  $scope.postGoal = function($scope.category, $scope.hours) {
    // sendData
      //.then display posted data
  }
}])
