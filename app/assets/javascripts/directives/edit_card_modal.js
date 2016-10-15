app.component('editCardModal',{
  controller: 'EditCardModalCtrl',
  controllerAs: 'vm',
  bindings: {
    card: '=',
    usersData: '='
  },
  templateUrl: 'templates/directives/edit_card_modal.html'
});
