djello.controller('showBoardsCtrl',
  ['$scope', 'board', 'boardService', "$state", "$rootScope",
  function($scope, board, boardService, $state, $rootScope) {

    $scope.board = board;

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