app.controller("BoardsCtrl",
              ["$scope", "Restangular", "UserService", "boards", 'userPromise', '$location',
              function($scope, Restangular, UserService, boards, userPromise, $location){
  console.log("init boards ctrl")
  console.log(userPromise)
  console.log(UserService.currentUser.user)
  if (!userPromise) {
    $location.path('/')
  };

  $scope.boards = boards;
}])