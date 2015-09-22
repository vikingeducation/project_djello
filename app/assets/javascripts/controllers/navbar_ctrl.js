djello.controller('navbarCtrl', ['$scope', 'Auth', '$state',
  function($scope, Auth, $state) {

    console.log('signed in?', Auth._currentUser);

}])