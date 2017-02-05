Djello.controller('BoardShowCtrl', ['$scope', 'Auth', 'board', 'BoardService',
  function($scope, Auth, board, BoardService) {
    Auth.currentUser().then(function(user) {
        $scope.currentUser = user;
      }, function(response) {
        console.log(response);
      });

  $scope.board = board;
  $scope.lists = board.lists;

}]);