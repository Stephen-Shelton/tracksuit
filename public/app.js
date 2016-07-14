angular.module("app", [
  'ui.bootstrap',
  'category',
  'goals',
  'ui.router',
  'angularMoment',
  'Auth'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/signin');

  $stateProvider.state('goals', {
    url: '/goals',
    templateUrl: './goals/goals.html',
    controller: 'goalsController',
    authenticate: true
  })
  .state('signin', {
    url: '/signin',
    templateUrl: './auth/signin.html',
    authenticate: false
  })
  // .state('category', {
  //   url: '/',
  //   templateUrl: './category/category.html',
  //   controller: 'categoryController'
  // })
  .state('dashboard', {
    url: '/',
    templateUrl: './dashboard/dashboard.html',
    controller: 'categoryController',
    authenticate: true
  });
})
.run(['$rootScope', '$location', '$state', '$window', function ($rootScope, $location, $state, $window) {

  $rootScope.user = {};

  // $rootScope.$watch('$rootScope.user.status', function() {
  //   if ($rootScope.user.status === 'connected') {
  //     // Logged into your app and Facebook.
  //     $state.go('dashboard');
  //   } else if ($rootScope.user.status === 'not_authorized') {
  //     // The person is logged into Facebook, but not your app.
  //     // $location.path('/signin');
  //     $state.go('signin');
  //   } else {
  //     // The person is not logged into Facebook, so we're not sure if
  //     // they are logged into this app or not.
  //     $state.go('signin');
  //   }
  // });

  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    $rootScope.user.status = response.status;
    // $rootScope.user.name = response.name;
    // $rootScope.user.email = response.email;
    console.log('LOOK FOR THIS NOW!!!!',response);
    console.log('LOOK FOR THIS NOW!!!!',$rootScope.user);

    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      $state.go('dashboard');
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      // $location.path('/signin');
      $state.go('signin');
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      $state.go('signin');
    }
  }

  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $window.fbAsyncInit = function() {
  FB.init({
    appId      : '1654239444895169',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // $rootScope.$on('$stateChangeStart', function (evt, next, current) {
  //   authFactory.checkLoginState();
  //   // if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
  //   //   $location.path('/signin');
  //   // }
  // });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    if(toState.authenticate && $rootScope.user.status !== 'connected') {
      $state.transitionTo("signin");
      event.preventDefault();
    }
  });

}]);
