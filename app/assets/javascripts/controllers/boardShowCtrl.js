djelloApp.controller('boardShowCtrl',
  ['$scope', 'Restangular', 'board',
  function($scope, Restangular, board ){
    // board;
    $scope.board = board;
    $scope.newList = {};

    $scope.addList = function(){

      Restangular.all('lists').post(
        { list: {
                  board_id: $scope.board.id,
                  title: $scope.newList.title,
                  description: $scope.newList.description
                }
        }).then(function(createdList){
          console.log(board);
          $scope.board.lists.push(createdList);
      });
  };

}]);