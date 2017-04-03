var djello = angular.module('djello', ['ui.router', 'restangular', 'Devise'])

djello.config(
  ["$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]')
      .attr('content');
    $httpProvider
      .defaults
      .headers
      .common['X-CSRF-Token'] = token;
  }])

.controller('usersCtrl',
  ['$scope', 'Auth',
  function($scope, Auth) {

    Auth.currentUser()
      .then(function(user) {
        $scope.currentUser = user;
        console.log(user);
      }, function(response) {
        console.error(response);
      });

  }])


.config( function($stateProvider, $urlRouterProvider) {


})