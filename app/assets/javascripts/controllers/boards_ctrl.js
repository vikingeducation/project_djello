app.controller("BoardsCtrl", ['$scope', 'boardService', function($scope, boardService){


  $scope.boards = boardService.getBoards().$object;
  
  $scope.creatingBoard = false;
  $scope.form = {};

  $scope.toggleCreating = function(){
    $scope.creatingBoard = !$scope.creatingBoard;
  };  

  $scope.createBoard = function(){
    boardService.createBoard($scope.form);

    $scope.form = {};
    $scope.creatingBoard = false;
  };



}]);