app.directive('newCardPanel', function() {

  return {
    templateUrl: 'templates/directives/new_card_panel.html',
    restrict: 'E',
    scope: {
      listIndex: '=',
      listId: '=',
      boardIndex: '='
    }
  };

});
