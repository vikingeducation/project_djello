app.directive('editCardModal',
['CardService', function(CardService) {

  return {
    restrict: 'E',
    templateUrl: 'templates/directives/edit_card_modal.html',
    scope: {
      card: '@'
    },
    link: function(scope) {
      scope.cardForm = {
        id: scope.card.id,
        title: scope.card.title,
        body: scope.card.body
      };
      scope.submitEditForm = function () {
        console.log('this is firing');
        CardService.update(scope.cardForm);
      };
    }
  };

}]);
