angular.module("app", [
  'ui.bootstrap',
  'category',
  'goals',
  'ui.router'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('goals', {
    url: '/goals',
    templateUrl: './goals/goals.html',
    controller: 'goalsController'
  })

  .state('signin', {
    url: '/signin',
    templateUrl: './auth/signin.html'
  })

})
