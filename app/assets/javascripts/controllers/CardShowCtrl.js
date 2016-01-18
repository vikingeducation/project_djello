app.controller('CardShowCtrl', ['$scope', 'board', 'list', 'card', 'Restangular', function($scope, board, list, card, Restangular) {

	$scope.board = board;
	$scope.list = list;
	$scope.card = card;
	$scope.activity = JSON.parse(card.activity);

}]);