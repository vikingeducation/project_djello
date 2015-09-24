djelloApp.controller('boardShowCtrl',
  ['$scope', 'Restangular', 'board',
  function($scope, Restangular, board){

    $scope.board = board;
    $scope.newList = {};
    $scope.addNewList = false;

    $scope.addList = function(){
      $scope.addNewList = $scope.addNewList ? false : true;
    };

    $scope.createList = function(){
      Restangular.all('lists').post(
        { list: {
                  board_id: $scope.board.id,
                  title: $scope.newList.title,
                  description: $scope.newList.description
                }
        }).then(function(createdList){
          console.log(board);
          $scope.board.lists.push(createdList);
          $scope.addNewList = false;
      });
  };

}]);