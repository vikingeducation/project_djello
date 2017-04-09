djello.controller('showBoardsCtrl',
  ['$scope', 'board', 'lists', 'boardService', "$state", "$rootScope",
  function($scope, board, lists, boardService, $state, $rootScope) {

    $scope.board = board;

    $scope.lists = lists;

    $scope.delete = function() {
      boardService.delete($scope.board)
                  .catch(function(response) {
                    console.log("Error with status code", response.status);
                  })
                  .then( function(response) {
                    $rootScope.$broadcast('board.deleted', $scope.board)
                    $state.go('boards.index');
                  })
    }

  }])