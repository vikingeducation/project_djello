djello.controller('indexBoardsCtrl',
  ['$scope', 'boards', 'ModalService',
  function($scope, boards, ModalService) {

    $scope.boards = boards;

    $scope.$on('board.created', function(event, board) {
      $scope.boards.unshift(board);
    });

    $scope.$on('board.deleted', function(event, board) {
      boardService.getAll()
                  .then( function(response) {
                    angular.copy(response, $scope.boards)
                  })
    });

    /// testing modal
    $scope.testingModal = function() {
      ModalService.showModal({
        templateUrl: "/templates/test_modal.html",
        controller: ['$scope', 'close', function($scope, close) {
                      $scope.close = function(result) {
                        close(result, 500); // close, but give 500ms for bootstrap to animate
                      };
                    }]
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          console.log('successful thing')
        });
      });
    };

  }])