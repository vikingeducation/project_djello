djelloApp.controller( 'authenticationCtrl',
  ['$scope', 'Auth', '$location',
  function($scope, Auth, $location){

    $scope.user = {};

    $scope.signInUser = function(){
      console.log("Sign in method called");
      console.log($scope.user);

      var config = {
        headers: {
          'X-HTTP-Method-Override': 'POST'
        }
      };

      Auth.login($scope.user, config).then(function(user) {
          $location.path("/home");
          alert('Successfully signed in user!');
        }, function(error) {
          console.info('Error in authenticating user!');
          alert('Error in signing in user!');
        });
    };

    $scope.signOut = function(){
      console.log('running');
      var config = {
          headers: {
              'X-HTTP-Method-Override': 'DELETE'
          }
        };

        Auth.logout(config).then(function(oldUser) {
          alert(oldUser.name + "you're signed out now.");
        }, function(error) {
          alert('An error occurred logging out.');
        });
    };

  }]);
