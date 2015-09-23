djelloApp = angular.module('djelloApp', ['ui.router', 'restangular', 'Devise']);

djelloApp.config(['RestangularProvider', function(RestangularProvider){

   RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({
        "content-type": "application/json"
    });

}]);

djelloApp.config(function(AuthProvider) {
    // Configure Auth service with AuthProvider
    AuthProvider.loginPath('/api/v1/users/sign_in.json');
    AuthProvider.loginMethod('POST');
    AuthProvider.logoutPath('/api/v1/users/sign_out.json');
    AuthProvider.logoutMethod('DELETE');
});

djelloApp.config(['$stateProvider', '$urlRouterProvider',
                  function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/users/sign_in');

  $stateProvider.state('boards', {
    url: '/boards',
    templateUrl: 'templates/boards.html',
    controller: 'boardCtrl',
    resolve: {
              boards: ['Restangular', function(Restangular){
                return Restangular.all('boards').getList();
              }]
            }
  });

// Add the Navbar as a view above under boards

  $stateProvider.state('boards.show', {
    url: '/boards/:id',
    templateUrl: 'templates/boardShow.html',
    controller: 'boardShowCtrl'
  });

  $stateProvider.state('sign_in', {
    url: '/users/sign_in',
    templateUrl: 'templates/signIn.html',
    controller: 'authCtrl'
  });

}]);

djelloApp.run(function($rootScope){
    $rootScope.$on("$stateChangeError", console.log.bind(console));
  });