app.component('editCardModal',{
  controller: 'editCardModalCtrl',
  controllerAs: 'vm',
  bindings: {
    card: '=',
    usersData: '='
  },
  templateUrl: 'templates/directives/edit_card_modal.html'
});
