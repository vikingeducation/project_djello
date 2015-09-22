app.controller('boardCreateCtrl',['$scope','Restangular', function($scope, Restangular){
    $scope.name = "";
    $scope.newBoard = function(){
        Restangular.all('boards').post({board: {name: $scope.name}}).then(function(newBoard){
          
        }
    };
}]);