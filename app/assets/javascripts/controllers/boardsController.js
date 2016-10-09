djello.controller('BoardsCtrl', [
  '$scope', 'boards', 'BoardService', '$state', 'Auth', 'MemberService', 'user', 'currentUser', 'Restangular',
  function($scope, boards, BoardService, $state, Auth, MemberService, user, currentUser, Restangular){


  $scope.boards = boards;
  $scope.currentUser = currentUser;
  Restangular.restangularizeCollection(null, $scope.currentUser.boards, 'boards');
  Restangular.restangularizeCollection(null, $scope.currentUser.assigned_boards, 'boards');
  console.log($scope.currentUser.assigned_boards);
  $scope.newBoard = {};




  $scope.noBoards = function(){
    return $scope.boards.length < 1
  };

  $scope.createBoard = function(){
    $scope.creatingBoard = !$scope.creatingBoard
    $scope.checkForParams();
    BoardService.createBoard($scope.newBoard.title)
    .then(function(response){
      $scope.currentUser.boards.push(response);
      $scope.newBoard = {};
      $state.go('boards.show', {id: response.id})
    })
  };

  $scope.checkForParams = function(){
    if ($scope.newBoard.title === undefined){
      $scope.newBoard.title = "Click to add title";
    } 
  }

  $scope.displayBoardCreate = function(){
    $scope.creatingBoard = !$scope.creatingBoard
  }
  
}])