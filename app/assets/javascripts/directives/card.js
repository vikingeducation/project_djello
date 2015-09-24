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
          controller: ['$scope', 'close', 'modalCard', function($scope, close, modalCard){

            $scope.modalCard = modalCard;

            $scope.enableTitleEditor = function() {
                $scope.titleEditorEnabled = true;
                $scope.titleEditableValue = $scope.modalCard.title;
            };

            $scope.disableTitleEditor = function() {
                $scope.titleEditorEnabled = false;
            };

            $scope.save = function(id) {
                $scope.disableTitleEditor();
                $scope.disableDescriptionEditor();
                $scope.editList({listid: $scope.value.id, result: {list: $scope.view.editableValue}});
                $scope.value.title = $scope.view.editableValue.title;
                $scope.value.description = $scope.view.editableValue.description;
            };

            $scope.close = function(result){
              close(result, 500);
            };

          }]
        }).then(function(modal) {

          //it's a bootstrap element, use 'modal' to show it
          modal.element.modal();
          modal.close.then(function(result) {
            console.log(result);
          });
        });
      }


    }]
  }
})
