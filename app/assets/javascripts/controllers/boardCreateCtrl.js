app.controller('BoardCreateCtrl',['$scope', '$location', 'Restangular', 'Boards', function($scope, $location, Restangular, Boards){
    $scope.name = "";
    $scope.newBoard = function(){
        Restangular.all('boards').post({board: {name: $scope.name}}).then(function(newBoard){
          console.log(newBoard);
          Boards.addBoard(newBoard);
          $location.path("/board/index");
        })
    };
}]);
