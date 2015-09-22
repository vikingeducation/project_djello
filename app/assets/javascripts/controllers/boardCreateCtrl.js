app.controller('BoardCreateCtrl',['$scope','Restangular', 'Boards', function($scope, Restangular, Boards){
    $scope.name = "";
    $scope.newBoard = function(){
        Restangular.all('boards').post({board: {name: $scope.name}}).then(function(newBoard){
          console.log(newBoard);
          Boards.addBoard(newBoard);
        })
    };
}]);
