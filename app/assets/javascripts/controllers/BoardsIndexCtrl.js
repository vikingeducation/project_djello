app.controller('BoardsIndexCtrl', ['$scope', 'Restangular', 'boards', function($scope, Restangular, boards) {

	$scope.boards = boards;

}]);