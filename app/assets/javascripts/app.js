var djello = angular.module('djello', ['ui.router', 'restangular', 'Devise']);

djello.factory('_', ['$window', function($window){
  return $window._;
}]);

// CSRF support
djello.config(
  ["$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]')
      .attr('content');
    $httpProvider
      .defaults
      .headers
      .common['X-CSRF-Token'] = token;
}]);

djello.config(['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
}]);

djello.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('boards', {
      url: '/',
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('boards.index', {
      url: '',
      templateUrl: '/templates/boards/index.html.erb'
    })
}]);
    