djello.controller('navbarCtrl', ['$scope', 'Auth', '$state',
  function($scope, Auth, $state) {
    // $scope.isLoggedIn = Auth.isAuthenticated();
    //
    // Auth.logout()
    //
    Auth.currentUser().then(function(user) {
            // User was logged in, or Devise returned
            // previously authenticated session.
            console.log("user is", user); // => {id: 1, ect: '...'}
        }, function(error) {
            // unauthenticated error
            console.log(error)
        });

}])