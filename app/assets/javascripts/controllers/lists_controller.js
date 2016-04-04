djello.controller('ListsCtrl', ['$scope', 'ListsService', 'BoardsService','$state', function($scope, ListsService, BoardsService, $state) {


  $scope.listData = {};
  $scope.currentBoardId = BoardsService.currentBoardId;
  $scope.currentLists = ListsService.currentLists;


  $scope.createList = function(formIsValid) {
    if (formIsValid) {
      $scope.listData["board_id"] = $scope.currentBoardId;
      ListsService.createList($scope.listData)
      $scope.listData = {};
      $state.go('boards.show', { id: $scope.currentBoardId })
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