djello.controller('ModalCtrl', ['$scope', 'ModalService', function($scope, ModalService) {


  $scope.show = function() {
    console.log("got into show?")
    ModalService.showModal({
      templateUrl: 'templates/card_modal.html',
      controller: "ModalController"
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        console.log(result)
      })
    })
  }

}])



djello.controller('ModalController', ['$scope', 'close', function($scope, close) {

  $scope.close = function(result) {
    close(result, 500);
  }
}])