djello.controller('BoardsShowCtrl',
  [ '$scope', 'Restangular',
  function($scope, Restangular) {

    $scope.board = {
      id: 5,
      title: 'Board Title'
    };

    $scope.newBoard = { title: 'New Board', owner_id: 1};
    $scope.createBoard = function() {
      Restangular.all('boards').post($scope.newBoard)
        .then( function() { console.log('created!') } );
    }

}]);