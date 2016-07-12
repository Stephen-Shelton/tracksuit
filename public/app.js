angular.module("app", [
  'ui.bootstrap',
  'category',
  'ui.router',
  'goals'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('goals', {
    url: '/goals',
    templateUrl: './goals.html',
    controller: 'goalsController'
  })
  $stateProvider.state('category', {
    url: '/',
    templateUrl: 'category.html'
  })
})
