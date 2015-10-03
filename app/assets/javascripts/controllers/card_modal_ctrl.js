djello.controller('cardModalCtrl', 
  ['$scope',
   'card', 
   'board', 
   'list',
   'users',
   'sessionService', 
   'cardService', 
   'close',
   'Restangular', 
   function($scope, card, board, list, users, sessionService, cardService, close, Restangular){
    $scope.card = card;
    $scope.board = board;
    $scope.list = list;
    $scope.users = users;
    $scope.currentUser = sessionService.currentUser;
    $scope.cardForm = { name: card.name, content: card.content };

    $scope.closeModal = function(){
      close('success');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }

    $scope.updateCard = function(){
      if ($scope.card.name != $scope.cardForm.name) {
        var nameMsg = $scope.currentUser.user.email + " changes the title to " + $scope.cardForm.name;
      };
      if ($scope.card.content != $scope.cardForm.content) {
        var contentMsg = $scope.currentUser.user.email + " changes the content to " + $scope.cardForm.content;
      };
      if (nameMsg || contentMsg) {
        cardService.updateCard($scope.board, $scope.card, $scope.cardForm, nameMsg, contentMsg);
      }
      $scope.showForm.status = false;
    }

    $scope.completeCard = function(card, list) {
      $scope.board.data.one('cards', card.id).remove().then(function(deletedCard){
        list.cards.splice(list.cards.indexOf(card), 1);
      })
    }

    $scope.addMember = function(card_id, member_id) {
      Restangular.all("user_cards").post({
        card_id: card_id,
        user_id: member_id
      })
      .then(function(newMember) {
        $scope.card.members.push(newMember);
      })
    }

    $scope.removeMember = function(card_id, member) {
      Restangular.all("user_cards").remove({
        card_id: card_id,
        user_id: member.id
      })
      .then(function() {
        var index = $scope.card.members.indexOf(member);
        $scope.card.members.splice(index, 1);
      })
    }

}])