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

    views: {

      'navbar':{
        templateUrl: 'templates/navbar.html',
        controller: 'navbarCtrl'
        },

      '':{
        templateUrl: 'templates/boardsLayout.html'
      }

    }
  });

  $stateProvider.state('boards.index',{
    url: '/',
    templateUrl: 'templates/boards.html',
    controller: 'boardCtrl',
    resolve: {
      boards: ['Restangular', function(Restangular){
                    return Restangular.all('boards').getList();
              }]
        }
  });

  $stateProvider.state('boards.index.show', {
    url: ':id',
    templateUrl: 'templates/boardShow.html',
    //nesting controllers? in nested routes???
    controller: 'boardShowCtrl',
    board: ['Restangular', '$stateParams',
                function(Restangular, $stateParams){
                  return Restangular.one('boards', $stateParams.id).get();
          }]
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