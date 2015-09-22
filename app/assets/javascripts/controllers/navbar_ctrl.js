djello.controller('navbarCtrl', ['$scope', '$state', 'userService',
  function($scope, $state, userService) {
    // $scope.isLoggedIn = Auth.isAuthenticated();
    //
    // Auth.logout()
    //
    // Auth.currentUser().then(function(user) {
    //         // User was logged in, or Devise returned
    //         // previously authenticated session.
    //         console.log("user is", user); // => {id: 1, ect: '...'}
    //     }, function(error) {
    //         // unauthenticated error
    //         console.log(error)
    //     });

    // $http.get("/current_user.json").then(function(data){
    //     console.log(data.data);
    // })
    userService.getCurrentUser.then(function(response){
        console.log(response.data);
        $scope.currentUser = response.data;
    })

}])