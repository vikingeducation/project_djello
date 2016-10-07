app.factory('ModalService', ['btfModal', function(btfModal) {
  return btfModal({
    controller: 'ModalCtrl',
    controllerAs: 'modal',
    templateUrl: 'templates/modal.html'
  });

}]);
