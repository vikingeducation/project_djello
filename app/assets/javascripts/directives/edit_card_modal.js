app.directive('editCardModal',
['CardService', function(CardService) {

  return {
    restrict: 'E',
    templateUrl: 'templates/directives/edit_card_modal.html',
    link: function (scope) {
      // Have to separate form data from model so as not to have two-way
      // binding.
      scope.cardForm = {
        id: scope.card.id,
        title: scope.card.title,
        body: scope.card.body
      };
      // See edit-card-body directive.
      scope.bodyEditState = false;
      scope.submitEditForm = function () {
        console.log('this is firing');
        CardService.update(scope.cardForm);
        scope.bodyEditState = false;
      };
    }
  };

}]);
