djello.controller('BoardsCtrl', [
  '$scope', 'boards', 'BoardService', '$state', 'Auth', 'MemberService', 'user', 'currentUser', 'Restangular',
  function($scope, boards, BoardService, $state, Auth, MemberService, user, currentUser, Restangular){


  $scope.boards = boards;
  $scope.currentUser = currentUser;
  Restangular.restangularizeCollection(null, $scope.currentUser.boards, 'boards');


  console.log($scope.currentUser);


  $scope.noBoards = function(){
    return $scope.boards.length < 1
  }

  $scope.createBoard = function(){
    BoardService.createBoard()
    .then(function(response){
      $scope.currentUser.boards.push(response);
      $state.go('boards.show', {id: response.id})
    })
  }
  
}])