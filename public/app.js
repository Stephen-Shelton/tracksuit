angular.module("app", [
  'ui.bootstrap',
  'category',
  'ui.router'
  ])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) { //add state and URL provide

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'index.html'
    })
    .state('home.category', {
      url: "/category",
      templateUrl: 'Category/category.html',
      controller: 'categoryController'
    })
  
  $urlRouterProvider.otherwise('/home/category')
})





