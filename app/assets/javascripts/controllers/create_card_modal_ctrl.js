djello.controller('createCardModalCtrl', 
  ['$scope', 
   'board', 
   'list',
   'cardService', 
  function($scope, board, list, cardService) {

    $scope.createCard = function(){
      cardService.createCard(board, list, $scope.cardForm);
    }
    
}])