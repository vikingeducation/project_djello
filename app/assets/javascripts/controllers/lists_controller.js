djello.controller('ListsCtrl', ['$scope', 'ListsService', 'BoardsService', function($scope, ListsService, BoardsService) {


  $scope.listData = {};
  $scope.currentBoardId = BoardsService.currentBoardId;


  $scope.createList = function(formIsValid) {
    if (formIsValid) {
      // console.log("board id:" + $scope.currentBoardId)
      $scope.listData["board_id"] = $scope.currentBoardId;
      console.log($scope.listData)
      ListsService.createList($scope.listData).then(function(list) {
        console.log("created a new list")
      })
    }
  }


}]);