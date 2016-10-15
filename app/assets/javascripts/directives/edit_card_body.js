app.component('editCardBody', {
  require: {
    modalCtrl: '^editCardModal'
  },
  controller: 'editCardBodyCtrl',
  controllerAs: 'vm',
  templateUrl: 'templates/directives/edit_card_body.html',
});
