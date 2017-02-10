Djello.controller('BoardShowCtrl', ['$scope', 'Auth', 'board', 'BoardService', 'ListService', 'CardService', 'ModalService',
  function($scope, Auth, board, BoardService, ListService, CardService, ModalService) {
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
            $scope.cardParams = {};
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

  $scope.show = function(card) {
    ModalService.showModal({
      templateUrl: 'templates/cardModal.html',
      controller: "CardModalCtrl",
      inputs: {
        cardParams: card
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(card) {
        if (card != undefined) {
          CardService.updateCard(card, card);
        }
      });
    });
  };

}]);
