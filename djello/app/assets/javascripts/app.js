var djello = angular.module('djello', ['restangular', 'ui.router', 'Devise']);

djello.config(['RestangularProvider', function(RestangularProvider){
    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({
        "content-type": "application/json"
    });
}]);

djello.config(function(AuthProvider) {

        AuthProvider.loginPath('api/v1/users/sign_in.json');

        AuthProvider.logoutPath('api/v1/users/sign_out.json');
    });

djello.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider){
    $stateProvider
      .state('header', {
        url: '/',
        views: {
          'header': {
            templateUrl: 'templates/headerLayout.html',
            controller: 'headerCtrl'
          },
          '' : {
            templateUrl: 'templates/loginForm.html',
            controller: 'headerCtrl',
          }
        }
      })

      .state('board', {
        url: '/board',
        controller: 'boardCtrl',
        resolve:{
          'boards': function($location, loginService, Restangular){
                      if(loginService.signedInUser.user){
                        //get board data
                        return  Restangular.all('boards').getList();

                      }else{
                        $location.path('/');    //redirect login
                        alert("You don't have access here");
                      }
                    }
        },

        views: {
          'header': {
            templateUrl: 'templates/loggedInHeader.html',
            controller: 'headerCtrl'
          },
          '' : {
            templateUrl: 'templates/boardLayout.html',
            controller: 'boardCtrl'
          }
        }
      })

      .state('board.show', {
        url: '/:id',
        templateUrl: 'templates/boardShow.html',
        controller: 'boardShowCtrl',
        resolve: {
          showresponse: ['Restangular', '$stateParams',
                function(Restangular, $stateParams){
                  return Restangular.one('boards', $stateParams.id).get();
                  }]

        }
        //server request to validate board owner ok
      })

      // .state('board.new', {
      //   url: '/new',
      //   templateUrl: 'templates/newBoard.html',
      //   controller: 'board'
      // })
      ;


  }]);

//for errors

djello.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});