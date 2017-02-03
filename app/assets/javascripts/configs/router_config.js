// ----------------------------------------
// Router
// ----------------------------------------

Djello.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        template: 'Hello Angular World',
      });
  }]);

Djello.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

Djello.run(['$rootScope', function($rootScope) {
  $rootScope.$on("$stateChangeError", console.error.bind(console));
}]);



