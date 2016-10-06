Djello.controller('BoardsCtrl', ['$scope', 'BoardService', function($scope, BoardService){

  BoardService.getAllBoards()
    .then(function(response){
      console.log(response)
    $scope.boards = response;
  })



}])
