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

      scope.logError = function(reason) {
        console.log('ERROR!! Reason:');
        console.log(reason);
      };

      scope.submitForm = function() {
        BoardService.create(scope.boardForm)
          .then(scope.resetForm)
          .catch(scope.logError);
      };
    }
  };


}]);
