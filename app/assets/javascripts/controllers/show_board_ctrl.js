Djello.controller('ShowBoardCtrl', [
  '$scope',
  '$state',
  'BoardService',
  'ListService',
  '$stateParams',
  '$rootScope',
  function($scope, $state, BoardService, ListService, $stateParams, $rootScope) {

    var updateBoard = function() {
      BoardService.getBoard($stateParams.id).then(function(response) {
        $scope.board = response;
      })
    }

    $scope.deleteBoard = function() {
      BoardService.deleteBoard($scope.board)
      $state.go('main.boards');
    }

    BoardService.getAllBoards().then(function(response) {
      $scope.boards = response;
    })


    $scope.changeBoard = function(title) {
      BoardService.changeBoard($scope.board, title)
    }

    $scope.addList = function(data) {
      ListService.createList($scope.board.id, data).then(function(response){
        $scope.board.lists.push(response);
        $scope.newList = false;
        $scope.list = {};
      })
    }

    $scope.$on('list.deleted', function(){ updateBoard() });
    $scope.$on('card.deleted', function(){ updateBoard() });


    updateBoard();

  }
])
