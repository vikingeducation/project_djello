djello.controller('newBoardsCtrl',
  ['$scope', 'boardService', 'boardMembershipService', '$state', '$rootScope',
  function($scope, boardService, boardMembershipService, $state, $rootScope) {

    $scope.createBoard = function() {
      boardService.createBoard($scope.newBoard)
                  .then( function(response) {
                          boardMembershipService.createMembership(response)
                          $scope.newBoard = {};
                          $rootScope.$broadcast('board.created', response);
                          $state.go('boards.index');
                        })
    }

  }])