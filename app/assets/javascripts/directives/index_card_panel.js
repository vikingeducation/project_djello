app.directive('indexCardPanel',
['CardService', function (CardService) {

  return {
    templateUrl: 'templates/directives/index_card_panel.html',
    restrict: 'E',
    scope: {
      card: '=',
      list: '=',
      usersCache: '='
    }
  };

}]);
