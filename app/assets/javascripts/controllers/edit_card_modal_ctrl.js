app.controller('editCardModalCtrl',
['CardService', 'MemberService', 'UserService',
function(CardService, MemberService, UserService) {
  var vm = this;
  vm.searchDependencies = {
    parent: vm.card,
    parentType: 'card',
    collection: vm.usersData,
    searchKey: 'username'
  };

  MemberService.all(vm.card.id, vm.searchDependencies.parentType)
    .then(function(data) {
      vm.membersCache = data;
    });

  // Have to separate form data from model so as not to have two-way
  // binding.
  vm.cardForm = {
    id: vm.card.id,
    title: vm.card.title,
    body: vm.card.body,
    completed: vm.card.completed
  };

  // See edit-card-body directive.
  vm.bodyEditState = false;

  vm.submitEditForm = function () {
    CardService.update(vm.cardForm);
    vm.bodyEditState = false;
  };

  vm.addMember = function () {
    MemberService.create({
      parent_id: vm.card.id,
      parent_type: 'card',
      username: UserService.getSuggestion()
    });
  };
}]);
