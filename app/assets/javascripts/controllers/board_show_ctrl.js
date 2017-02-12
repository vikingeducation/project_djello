Djello.controller('BoardShowCtrl', ['$scope', 'Auth', 'board', 'BoardService', 'ListService', 'CardService', 'ModalService', '$stateParams', 'users',
  function($scope, Auth, board, BoardService, ListService, CardService, ModalService, $stateParams, users) {
    Auth.currentUser().then(function(user) {
        $scope.currentUser = user;
      }, function(response) {
        console.log(response);
      });

  $scope.board = board;
  $scope.lists = board.lists;
  _.each($scope.lists, function(list) {
    list.cardParams = {};
    list.showForm = false;
  })
  $scope.listParams = { title: "new list", board_id: board.id };

  $scope.createList = function(board) {
    board.createList($scope.listParams)
          .then(function(response) {
            console.log(response);
          }, function(response) {
            console.error(response);
          });
  }

  $scope.createCard = function(list) {
    list.createCard(list.cardParams)
          .then(function(response) {
            console.log(response);
          }, function(response) {
            console.error(response);
          });
  }

  $scope.changeList = function(list, title) {
    params = {title: title};
    ListService.updateList(list, params);
  }

  $scope.changeCard = function(card, title) {
    params = {title: title};
    CardService.updateCard(card, params);
  }

  $scope.deleteList = function(list) {
    list.remove().then( function(list) {
      new_lists = _.reject(board.lists , function(l) { return l.id === list.id });
      angular.copy(new_lists, $scope.lists);
    })
  }

  $scope.show = function(card) {
    ModalService.showModal({
      templateUrl: 'templates/cardModal.html',
      controller: "CardModalCtrl",
      inputs: {
        cardParams: card,
        users: users,
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(card) {
        if (card != undefined && card.delete === true) {
          card.remove().then( function(card) {
            list = _.find($scope.lists, function(list) { return list.id === card.list_id });
            new_cards = _.reject(list.cards, function(c) { return c.id === card.id });
            angular.copy(new_cards, list.cards);
            console.log(list.cards);
          })
        } else if (card != undefined) {
          CardService.updateCard(card, card);
        }
      });
    });
  };

}]);
