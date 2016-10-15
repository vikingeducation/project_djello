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

      scope.resetForm = function(response) {
        scope.boardForm = {
          title: '',
          description: ''
        };
        return response;
      };

      scope.emitSuccess = function(response) {
        scope.$emit('boards.notices', 'success');
      };

      scope.submitForm = function() {
        BoardService.create(scope.boardForm)
          .then(scope.resetForm)
          .then(scope.emitSuccess);
      };
    }
  };


}]);
