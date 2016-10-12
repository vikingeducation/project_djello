app.controller('editCardBodyCtrl',
['CardService', function(CardService) {
  var vm = this;

  vm.revealForm = function () {
    vm.modalCtrl.bodyEditState = true;
  };
  vm.cancel = function() {
    vm.modalCtrl.bodyEditState = false;
  };

  vm.submitEditForm = function () {
    vm.modalCtrl.submitEditForm();
  };
}]);
