app.controller('ListsNewCtrl', ['$scope','$state', '$stateParams', 'Restangular', function($scope, $state, $stateParams, Restangular) {

	
	$scope.submitList = function(){
		Restangular.all('lists').post({ list: { board_id: $stateParams.id,
																					title: 		$scope.formData.title,
																					description: 	$scope.formData.description}})
													.then(function(createdList){
														$state.go('boards.show', { id: createdList.board_id })
													})
	}

	$scope.formData = {}

}]);