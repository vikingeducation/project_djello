var app = angular.module('app', ['ui.router', 'restangular', 'Devise'])

  .config(["RestangularProvider", function(RestangularProvider){
    RestangularProvider.setBaseUrl("/api/v1")
    RestangularProvider.setRequestSuffix(".json")

  }])

  .config(function(AuthProvider) {
    AuthProvider.loginPath('/api/v1/users/sign_in.json');
    AuthProvider.logoutPath('api/v1/users/sign_out.json');
    AuthProvider.logoutMethod('DELETE');
  })

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('app', {
        url: "/",
        views: {
          "navbar": {
            templateUrl: 'templates/partials/navbar.html',
            controller: 'NavbarCtrl',
          },
          "content": {
            templateUrl: 'templates/auth/login.html',
            controller: 'LoginCtrl',
            resolve: {
              userPromise: ['Auth', function(Auth) {
                console.log("resolving promise")
                return Auth.currentUser()
              }]
            }
          },
          "footer": {
            templateUrl: 'templates/partials/footer.html',
          }
        }
      })

      .state('app.login', {
        url: "login",
        views: {
          "content@": {
            templateUrl: 'templates/auth/login.html',
            controller: 'LoginCtrl',
            resolve: {
              userPromise: ['Auth', function(Auth) {
                console.log("resolving promise")
                return Auth.currentUser()
              }]
            }
          }
        }
      })

      .state('app.logout', {
        url: "logout",
        controller: 'LogoutCtrl',
      })

      .state('app.boards', {
        url: "boards",
        views: {
          "content@": {
            templateUrl: 'templates/boards/layout.html',
            controller: 'BoardsCtrl',
            resolve: {
              userPromise: ['Auth', function(Auth) {
                return Auth.currentUser()
              }]
            }
          },
          "index@app.boards": {
            templateUrl: 'templates/boards/index.html',
            controller: 'BoardsCtrl',
            resolve: {
              userPromise: ['Auth', function(Auth) {
                return Auth.currentUser()
              }]
            }
          }
        }
      })

      .state('app.boards.new', {
        url: "/new",
        views: {
          "index@app.boards": {
            templateUrl: 'templates/boards/new.html',
            controller: 'BoardsNewCtrl'
          }
        }
      })
  }])
