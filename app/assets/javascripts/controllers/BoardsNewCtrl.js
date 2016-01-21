app.controller('BoardsNewCtrl', ['$scope', 'Restangular', '$state', function($scope, Restangular, $state) {

	$scope.formData = {};

	$scope.submitBoard = function(){
		Restangular.all('boards').post({ board: { name: $scope.formData.name } })
			.then(function(createdBoard){
				$state.go('boards.index');
			})
	}

}]);