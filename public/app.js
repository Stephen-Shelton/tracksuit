angular.module("app", [
  'ui.bootstrap',
  'category',
  'goals',
  'ui.router',
  'angularMoment'
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
  // .state('category', {
  //   url: '/',
  //   templateUrl: './category/category.html',
  //   controller: 'categoryController'
  // })
  .state('dashboard', {
    url: '/',
    templateUrl: './dashboard/dashboard.html',
    controller: 'categoryController'
  });
})
.controller("userController", function($scope, $location){
  $scope.user = "FB User"
  $scope.logout = function(){ 
    $location.path('/signin')
    
  
    //PASSPORT REQUEST TO SERVER?
  }
  $scope.login = function(){
    $http.get('/auth/facebook', function(resp){
      console.log(resp)
    })
  }
})
.run(function(amMoment) {
    amMoment.changeLocale('de');
});

