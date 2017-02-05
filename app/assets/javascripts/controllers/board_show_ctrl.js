Djello.controller('BoardShowCtrl', ['$scope', 'Auth', 'board', 'BoardService', 'CardService', 'ListService',
  function($scope, Auth, board, BoardService, CardService, ListService) {
    Auth.currentUser().then(function(user) {
        $scope.currentUser = user;
      }, function(response) {
        console.log(response);
      });

  $scope.board = board;
  $scope.lists = board.lists;
  $scope.cardParams = {};
  $scope.listParams = { title: "new list" };

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


}]);