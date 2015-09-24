var app = angular.module('app', ['ui.router', 'restangular', 'Devise', 'angularModalService'])

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
                if (Auth.isAuthenticated()) {
                  return Auth.currentUser()
                } else { return };
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
                if (Auth.isAuthenticated()) {
                  return Auth.currentUser()
                } else { return };
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
          },

          "newList@app.boards": {
            templateUrl: 'templates/lists/new.html',
          },

          "newCard@app.boards": {
            templateUrl: 'templates/cards/new.html',
          },

        }
      })

      .state('app.boards.newList', {
        url: "/list/new",
        views: {
          "newList@app.boards": {
            templateUrl: 'templates/lists/form.html',
          }
        }
      })

      .state('app.boards.newCard', {
        url: "/cards/new/:listId",
        views: {
          "newCard@app.boards": {
            templateUrl: 'templates/cards/form.html',
            controller: 'CardsNewCtrl'
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

  .config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

        var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
            function success(response) {
                return response
            };

            function error(response) {
                if (response.status == 401) {
                    $rootScope.$broadcast('event:unauthorized');
                    $location.path('/login');
                    return response;
                };
                return $q.reject(response);
            };

            return function(promise) {
                return promise.then(success, error);
            };
        }];
        $httpProvider.interceptors.push(interceptor);
  }])

  .run(function($http) {
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $http.defaults.headers.post['dataType'] = 'json'
  });