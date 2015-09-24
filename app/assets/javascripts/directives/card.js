app.directive("card", function(){
  var template = '<div ng-click="showModal()" class="col-xs-12 list-card well" ng>\
  {{ value.title}}\
  </div>'

  return {
    restrict: "E",
    replace: true,
    template: template,
    scope: {
      value: "=cardel",
    },
    controller: ['$scope', 'ModalService', function($scope, ModalService){

      $scope.showModal = function(){
        console.log($scope.value)
        ModalService.showModal({
          inputs: {
            modalCard: $scope.value
          },
          templateUrl: "templates/cards/modal.html",
          controller: ['$scope','Cards', 'close', 'modalCard', function($scope,Cards, close, modalCard){

            $scope.modalCard = modalCard;

            $scope.enableTitleEditor = function() {
              $scope.disableDescEditor();
              $scope.titleEditorEnabled = true;
              $scope.titleEditableValue = $scope.modalCard.title;
            };

            $scope.disableTitleEditor = function() {
              $scope.titleEditorEnabled = false;
            };

            $scope.saveTitle = function() {
              $scope.disableTitleEditor();
              var message = JSON.parse(JSON.stringify($scope.modalCard));
              message.title = $scope.titleEditableValue;
              Cards.editCard(message, function(result){
                $scope.modalCard.title = result.title;
              });
            };

            $scope.enableDescEditor = function() {
              $scope.disableTitleEditor();
              $scope.descEditorEnabled = true;
              $scope.descEditableValue = $scope.modalCard.description;
            };

            $scope.disableDescEditor = function() {
              $scope.descEditorEnabled = false;
            };

            $scope.saveDescription = function() {
              $scope.disableDescEditor();
              var message = JSON.parse(JSON.stringify($scope.modalCard));
              message.description = $scope.descEditableValue;
              Cards.editCard(message, function(result){
                $scope.modalCard.description = result.description;
              });
            };

            $scope.disableEditors = function(){
              $scope.disableDescEditor();
              $scope.disableTitleEditor();
            }

            $scope.complete = function(){
              var message = JSON.parse(JSON.stringify($scope.modalCard));
              message.completed = true;
              Cards.editCard(message, function(result){
                $scope.modalCard.completed = result.completed
                $scope.close(result);
              })
            }

            $scope.close = function(result){
              close(result, 500);
            };

          }]
        }).then(function(modal) {

          //it's a bootstrap element, use 'modal' to show it
          modal.element.modal();
          modal.close.then(function(result) {
          });
        });
      }


    }]
  }
})
