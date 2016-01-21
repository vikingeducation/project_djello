app.controller('CardShowCtrl', ['$scope', 'board', 'list', 'card', 'Restangular', function($scope, board, list, card, Restangular) {

	$scope.board = board;
	$scope.list = list;
	$scope.card = card;
	$scope.activity = JSON.parse(card.activity);

	$scope.edit = false;
	$scope.formData = {
		content: $scope.card.content
	}; 
	$scope.editCard = function(){
		Restangular.one('cards', $scope.card.id).patch({ card: { content: $scope.formData.content } })
			.then(function(response){
				console.log(response);
				$scope.card = response;
				$scope.formData = { content: response.content };
				$scope.edit = false;
			});
	}

}]);