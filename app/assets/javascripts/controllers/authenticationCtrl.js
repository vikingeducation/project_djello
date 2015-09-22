
djelloApp.controller( 'authenticationCtrl',
  ['$scope', 'Auth', '$location',
  function($scope, Auth, $location){

    $scope.user = {};

    $scope.signIn = function(){

      Auth.login($scope.user).then(function(user) {
          $location.path("/home");
          alert('Successfully signed in user!');
        }, function(error) {
          console.info('Error in authenticating user!');
          alert('Error in signing in user!');
        });

    };

  }]);