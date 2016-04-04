djello.controller('ListsCtrl', ['$scope', 'ListsService', 'BoardsService', function($scope, ListsService, BoardsService) {


  $scope.listData = {};
  $scope.currentBoardId = BoardsService.currentBoardId;
  $scope.currentLists = ListsService.currentLists;


  $scope.createList = function(formIsValid) {
    if (formIsValid) {
      $scope.listData["board_id"] = $scope.currentBoardId;
      ListsService.createList($scope.listData)
      $scope.listData = {};
    }
  };


  $scope.updateList = function($data, list, type) {
    if (type === 'title') {
      list.title = $data;
    } else if (type === 'description') {
      list.description = $data;
    }
    ListsService.updateList(list)
  }


  $scope.deleteList = function(list) {
    ListsService.deleteList(list);
  }




}]);