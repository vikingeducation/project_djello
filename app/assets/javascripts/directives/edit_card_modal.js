app.directive('editCardModal',
['CardService', function(CardService) {

  return {
    restrict: 'E',
    templateUrl: 'templates/directives/edit_card_modal.html',
    scope: {
      card: '='
    }
  };

}]);
