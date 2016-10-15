app.directive('boardsDropdown', function() {

  return {
    templateUrl: 'templates/directives/boards_dropdown.html',
    restrict: 'E',
    scope: {
      boardsData: '='
    },
    link: function(scope) {
      scope.changeShowBoard = function () {
        return scope.$emit('boards.changeSelected', scope.selectedBoard);
      };
    }
  };
});
