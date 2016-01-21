app.controller('BoardsShowCtrl', ['$scope', '$stateParams', 'Restangular', 'board', 'lists', 'cards', function($scope, $stateParams, Restangular, board, lists, cards) {

	$scope.board = board;
	$scope.lists = lists;
	$scope.cards = cards;

	$scope.$watch(
		"board.name",
		_.debounce(function(value){
			Restangular.one('boards', $scope.board.id).patch({ board: { name: value } })
		}, 500)
	);

	// Function to delete any of the lists shown here
	$scope.removeList = function(id){
		Restangular.one('lists', id).remove()
			.then(function(){
				$scope.lists = Restangular.all('lists').getList({board_id: $stateParams.id}).$object;
			})
	}

}]);