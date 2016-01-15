app.controller('BoardsShowCtrl', ['$scope', 'Restangular', 'board', 'lists', 'cards', function($scope, Restangular, board, lists, cards) {

	$scope.board = board;
	$scope.lists = lists;
	$scope.cards = cards;

	$scope.$watch(
		"board.name",
		_.debounce(function(value){
			Restangular.one('boards', $scope.board.id).patch({ board: { name: value } })
		}, 500)
	);

}]);