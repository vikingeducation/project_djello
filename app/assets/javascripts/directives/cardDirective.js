djelloApp.directive('cardDirective', function(){



  return {
    restrict: "E",
    replace: true,
    templateUrl: "templates/cardDirective.html",
    scope: {
      card: "=",
      saveTitle: "&"
    },
    controller: ['$scope', 'ModalService', 'Restangular', function($scope, ModalService, Restangular){

      $scope.cardClick = function(){
        
        ModalService.showModal({
          inputs: {
            modalCard: $scope.card
          },
          templateUrl: "templates/modal.html",
          controller: ['$scope', 'close', 'modalCard', function($scope, close, modalCard){
            
            $scope.modalCard = modalCard;
            $scope.editableTitle = false;
            $scope.editableDescription = false;

            $scope.close = function(result) {
              close(result, 500); // close, but give 500ms for bootstrap to animate
             };

             $scope.editTitle = function(){
                $scope.editableTitle = !$scope.editableTitle;
             };

             $scope.editDescription = function(){
              $scope.editableDescription = !$scope.editableDescription;
             };

             $scope.saveTitle = function(){
              $scope.editableTitle = false;
     
                Restangular.one('cards', $scope.modalCard.id).get().then(function(card){
                  
                    card.title = $scope.modalCard.title;
                    card.put();
                    console.log('success');
                
                }, function(fail){
                      
                      console.log(fail);
                
                });

             };

             $scope.saveDescription = function(){
              $scope.editableDescription = false;
     
                Restangular.one('cards', $scope.modalCard.id).get().then(function(card){
                  
                    card.description = $scope.modalCard.description;
                    card.put();
                    console.log('success');
                
                }, function(fail){
                      
                      console.log(fail);
                
                });


             };

          }]
        }).then(function(modal) {
          console.log(modal);
          //it's a bootstrap element, use 'modal' to show it
          modal.element.modal();
          modal.close.then(function(result) {
            console.log(result);
          });
        });
      };
    }]
  };
});
