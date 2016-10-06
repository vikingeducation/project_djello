app.directive('createBoardPanel',
['BoardService', function(BoardService) {

  return {
    restrict: 'E',
    templateUrl: 'templates/directives/create_board_panel.html',
    link: function(scope) {
      scope.boardForm = {
        title: '',
        description: ''
      };

      scope.resetForm = function() {
        scope.boardForm = {
          title: '',
          description: ''
        };
      };

      scope.submitForm = function() {
        BoardService.create(scope.boardForm)
          .then(function(response) {
            $scope.resetForm();
            $scope.$emit('board.create', response);
          })
          .catch(function(reason) {
            console.log('ERROR!! Reason:');
            console.log(reason);
          });
      };
    }
  };


}]);
