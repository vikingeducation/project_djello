app.controller('CardDeleteCtrl', ['$scope', 'Restangular', '$state', '$stateParams', function($scope, Restangular, $state, $stateParams) {


	$scope.deleteCard = function(){
		Restangular.one('cards', $stateParams.card_id).remove()
			.then(function(){
				debugger;
				$state.go('boards.show', $stateParams.id);
			})
	}

	// Now actually run the delete
	$scope.deleteCard();

}]);