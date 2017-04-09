djello.controller('newBoardsCtrl',
  ['$scope', 'boardService', '$state', '$rootScope',
  function($scope, boardService, $state, $rootScope) {

    $scope.createBoard = function() {
      boardService.createBoard($scope.newBoard)
                  .then( function(response) {
                          $scope.newBoard = {};
                          $rootScope.$broadcast('board.created', response);
                          $state.go('boards.index');
                        })
    }

  }])