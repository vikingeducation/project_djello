djelloApp.controller('boardShowCtrl',
  ['$scope', 'Restangular', 'board',
  function($scope, Restangular, board ){
    // board;
    $scope.board = board;
    $scope.newList = {};
    $scope.addNewList = false;
    $scope.list = {};

    $scope.updateFieldForListTitle = false;

    $scope.beginUpdatingListTitle = function(listID){
      console.log(listID);
      $scope.updateFieldForListTitle = $scope.updateFieldForListTitle ? false : true;
    };

    $scope.updateListTitle = function(list){
      // console.log(list);
      var listToUpdate = Restangular.one('lists', list.id);
      console.log(listToUpdate);
      // listToUpdate = list;
      Restangular.copy(listToUpdate).put().then(function(){
        $scope.updateFieldForListTitle = false;
        $location.path('/boards/'+$scope.board.id);
      });
    };

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