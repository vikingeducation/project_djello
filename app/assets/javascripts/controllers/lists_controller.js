djello.controller('ListsCtrl', ['$scope', 'ListsService', 'BoardsService','$state', function($scope, ListsService, BoardsService, $state) {


  $scope.listData = {};
  $scope.currentBoardId = BoardsService.currentBoardId;
  $scope.currentLists = ListsService.currentLists;
  $scope.isNewListOpen = false;


  $scope.createList = function(formIsValid) {
    if (formIsValid) {
      console.log($scope.currentBoardId)
      $scope.listData["board_id"] = $scope.currentBoardId;
      console.log($scope.listData)

      ListsService.createList($scope.listData)
      $scope.isNewListOpen = false;
      $scope.listData = {};
      // $state.go('boards.show', { id: $scope.currentBoardId })
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