djello.controller('ListsCtrl', ['$scope', 'ListsService', 'BoardsService', function($scope, ListsService, BoardsService) {


  $scope.listData = {};
  $scope.currentBoardId = BoardsService.currentBoardId;
  $scope.currentLists = ListsService.currentLists;


  $scope.createList = function(formIsValid) {
    if (formIsValid) {
      $scope.listData["board_id"] = $scope.currentBoardId;
      ListsService.createList($scope.listData).then(function(list) {
        ListsService.currentLists.push(list);
        $scope.listData = {};
      })
    }
  };



  $scope.deleteList = function() {
    ListsService.on()
  }


}]);