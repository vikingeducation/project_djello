Djello.controller('BoardShowCtrl', ['$scope', 'Auth', 'board', 'BoardService', 'ListService', 'CardService',
  function($scope, Auth, board, BoardService, ListService, CardService) {
    Auth.currentUser().then(function(user) {
        $scope.currentUser = user;
      }, function(response) {
        console.log(response);
      });

  $scope.board = board;
  $scope.lists = board.lists;
  $scope.cardParams = {};
  $scope.listParams = { title: "new list", board_id: board.id };

  $scope.createList = function(board) {
    board.createList($scope.listParams)
          .then(function(response) {
            console.log(response);
          }, function(response) {
            console.error(response);
          });
  }

  $scope.createCard = function(list) {
    list.createCard($scope.cardParams)
          .then(function(response) {
            console.log(response);
            $scope.cardParams = {};
          }, function(response) {
            console.error(response);
          });
  }

  $scope.changeList = function(list, title) {
    params = {title: title};
    ListService.updateList(list, params);
  }

  $scope.changeCard = function(card, title) {
    params = {title: title};
    CardService.updateCard(card, params);
  }

}]);