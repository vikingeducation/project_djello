djello.controller('newListsCtrl',
  ['$scope', 'listService', 'board', 'lists', '$state', '$rootScope',
  function($scope, listService, board, lists, $state, $rootScope) {

    $scope.displayForm = false;

    $scope.changeDisplay = function() {
      $scope.displayForm = !$scope.displayForm;
    }

    $scope.lists = lists;

    $scope.createList = function() {
      console.log('creating list')
      $scope.newList.board_id = board.id;
      listService.createList($scope.newList) //board param id?
                  .then( function(response) {
                          $scope.newList = {};
                          $scope.lists.push(response);
                          console.log('created', response)
                        })
    }

  }])