app.controller("NewCardCtrl", ["$scope", "cardService", "listsService", "close", "list", "team", function($scope, cardService, listsService, close, list, team) {

  $scope.list = list
  $scope.newCard = {}
  $scope.newCard.members = []
  $scope.teamMembers = []

  angular.copy(team.users, $scope.teamMembers)

  $scope.handleNewCardForm = function() {
    cardService.create(list, $scope.newCard, $scope.teamMembers).then(function(response) {
    })
    $scope.close(true, 200);
  }

  $scope.close = function(result) {
    close(result, 200); 
  };
}]
)