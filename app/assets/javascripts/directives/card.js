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
