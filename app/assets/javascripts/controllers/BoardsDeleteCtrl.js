app.controller('BoardsDeleteCtrl', ['$scope', 'Restangular', '$state', '$stateParams', function($scope, Restangular, $state, $stateParams) {


	$scope.deleteBoard = function(){
		Restangular.one('boards', $stateParams.id).remove()
			.then(function(){
				$state.go('boards.index');
			})
	}

	// Now actually run the delete
	$scope.deleteBoard();

}]);