app.controller('CardNewCtrl', ['$scope', '$state', '$stateParams', 'Restangular', function($scope, $state, $stateParams, Restangular) {


	$scope.submitCard = function(){
		Restangular.all('cards').post({ card: { list_id: $stateParams.list_id,
																					content: 		$scope.formData.content}})
													.then(function(createdCard){
														$state.go('boards.show', { id: createdCard.list.board_id })
													})
	}

	$scope.formData = {}


}]);