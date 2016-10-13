app.controller("BoardCtrl", ['$scope', 'boardService', '$stateParams', 'listService', function($scope, boardService, $stateParams, listService){


  

  boardService.getBoard($stateParams.id).then(function(response){
    $scope.board = response;

    $scope.lists = $scope.board.lists;
  }, function(){
    console.log("couldn't get all boards");
  })
  
  
  $scope.listForm = {};

  $scope.creatingList = false;

  $scope.toggleCreatingList = function(){
    $scope.creatingList = !$scope.creatingList;
  };

  $scope.createList = function(){
    var listParams = $scope.listForm;
    listParams.board_id = $scope.board.id;

    listService.createList(listParams).then(function(response){
      $scope.lists.push(response);
    }, function(){
      console.log("there was an error creating list");
    });

    $scope.listForm = {};
    $scope.toggleCreatingList();
  };

  $scope.deleteList = function(list, index){
    listService.deleteList(list.id).then(function(){
      $scope.lists.splice(index, 1);
    }, function(){
      console.log("couldn't delete list");
    });


  };

}]);