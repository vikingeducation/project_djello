djello.factory('authorization', ['Auth', '$state', '$rootScope',
  function(Auth, $state, $rootScope){
    function authorize() {
      console.log('authorization');
      // return Auth.currentUser().then(function(user){
        // console.log('user: ', user);
        if (!Auth.isAuthenticated()) {
          console.log('not Authenticated!');
          $rootScope.returnToState = $rootScope.toState;
          $rootScope.returnToStateParams = $rootScope.toStateParams;
          $state.go('site.signin');
        }
      // })
    }

    return {
      authorize: authorize
    }
}])