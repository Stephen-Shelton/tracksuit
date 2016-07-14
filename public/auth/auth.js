angular.module('Auth', [])
//   .controller('authCtrl', function($rootScope) {
//     $rootScope.$watch('$rootScope.user.status', function() {
//       if ($rootScope.user.status === 'connected') {
//         // Logged into your app and Facebook.
//         $state.go('dashboard');
//       } else if ($rootScope.user.status === 'not_authorized') {
//         // The person is logged into Facebook, but not your app.
//         // $location.path('/signin');
//         $state.go('signin');
//       } else {
//         // The person is not logged into Facebook, so we're not sure if
//         // they are logged into this app or not.
//         $state.go('signin');
//       }
//   });
// })
  .factory('authFactory', function() {

    var user = {};



    return {
      // watch: $rootScope.$watch('$rootScope.user.status', function() {
      //         if ($rootScope.user.status === 'connected') {
      //           // Logged into your app and Facebook.
      //           console.log($rootScope.user.status);
      //           $state.go('dashboard');
      //         } else if ($rootScope.user.status === 'not_authorized') {
      //           // The person is logged into Facebook, but not your app.
      //           // $location.path('/signin');
      //           console.log($rootScope.user.status);
      //           $state.go('signin');
      //         } else {
      //           // The person is not logged into Facebook, so we're not sure if
      //           // they are logged into this app or not.
      //           console.log($rootScope.user.status);
      //           $state.go('signin');
      //         }
      //       })
    };
  });
