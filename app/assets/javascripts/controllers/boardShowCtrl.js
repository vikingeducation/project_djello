app.controller('BoardShowCtrl',['$scope', '$location', 'Restangular', 'Boards', 'board', function($scope, $location, Restangular, Boards, board){
    $scope.board = board

    $scope.addList = function(){

    }

    // $scope.$on('devise:unauthorized', function(){
    //   console.log("Caught unauthorized!");
    //   $location.path('/board');
    // })
}]);
