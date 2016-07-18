angular.module('goalProgress', [])

.controller('goalProgressController', ['$scope', 'goalsFactory', 'categoryFactory',
  function($scope, goalsFactory, categoryFactory) {
  $scope.width // = some math
  $scope.categories = goalsFactory.categories;

}])
