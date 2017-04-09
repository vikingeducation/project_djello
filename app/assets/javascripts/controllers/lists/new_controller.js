djello.controller('newListsCtrl',
  ['$scope', 'listService', 'lists', '$state', '$rootScope',
  function($scope, listService, lists, $state, $rootScope) {

    $scope.lists = lists;

    $scope.createList = function() {
      listService.createList($scope.newList) //board param id?
                  .then( function(response) {
                          $scope.newList = {};
                          $rootScope.$broadcast('list.created', response);
                          $state.go('boards.index'); //relevant board
                        })
    }

  }])