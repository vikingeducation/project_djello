app.controller("NewBoardCtrl", ["$scope", "boardsService", "teamsService", "Auth", "$state", function($scope, boardsService, teamsService, Auth, $state) {
  $scope.board = {}

  Auth.currentUser().then(function(response) {
    console.log(response)
    $scope.user = response
    teamsService.getUserTeams(response).then(function(response) {
      console.log(response)
      $scope.teams = response
    })
  })


  $scope.boards = boardsService.all().$object

  $scope.handleForm = function() {
    boardsService.create($scope.board)
    $state.go("boardsIndex")
  }

  

}])