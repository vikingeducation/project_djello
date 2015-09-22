var app = angular.module('app', ['ui.router', 'restangular', 'Devise'])

.config(["RestangularProvider", function(RestangularProvider){
  RestangularProvider.setBaseUrl("/api/v1")
  RestangularProvider.setRequestSuffix(".json")

}])

.config(function(AuthProvider) {
  AuthProvider.loginPath('/api/v1/users/sign_in.json');
})

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('login', {
        url: "/",
        templateUrl: 'templates/auth/login.html',
        controller: 'LoginCtrl'
        // data: { auth: Auth.currentUser().then(function(user){
        //   return user
        // })}
      })

      .state('boards', {
        url: "/boards",
        templateUrl: 'templates/boards/layout.html',
        controller: 'BoardsCtrl',
        resolve: {
          boards: ['Restangular', function(Restangular){
            return Restangular.all("boards").getList()
          }]
        }
      })
  }])

// .config(function($routeProvider, $locationProvider) {
//     $routeProvider.
//       when("/persons",
//         { templateUrl: "partials/index.html" }).
//       when("/login",
//         { templateUrl: "partials/login.html", controller: "LoginCtrl" }).
//       // event more routes here ...
//       otherwise( { redirectTo: "/persons" });
//   })

// app.run(function($rootScope, Auth, $location){
//   $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
//     if ( !Auth.isAuthenticated() ) {
//         $location.path("/")
//     }
//   })
// });

.run( function($rootScope, $location, Auth) {
    // register listener to watch route changes
    $rootScope.$on( "$stateChangeStart", function(event, next, current) {
      console.log("running")
      console.log(Auth.isAuthenticated())
      if ( !Auth.isAuthenticated() ) {
        // no logged user, we should be going to #login
        if ( next.templateUrl == 'templates/auth/login.html' ) {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path( '/' );
        }
      } else {
        if ( next.templateUrl == 'templates/auth/login.html' ) {
          $location.path( '/boards' );
        }
      }
    });
 })
