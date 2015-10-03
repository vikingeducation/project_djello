djello.controller('createCardModalCtrl', 
  ['$scope', 
   'board', 
   'list',
   'cardService', 
   'sessionService', 
  function($scope, board, list, cardService, sessionService) {
    $scope.currentUser = sessionService.currentUser

    $scope.createCard = function(){
      cardService.createCard(board, list, $scope.cardForm, $scope.currentUser);
    }
    
}])