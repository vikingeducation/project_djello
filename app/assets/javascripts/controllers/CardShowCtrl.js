app.controller("CardShowCtrl", ["$scope", "cardService", "listsService", "membersService", "close", "card", "list", "team", function($scope, cardService, listsService, membersService, close, card, list, team) {

  $scope.teamMembers = []
  angular.copy(team.users, $scope.teamMembers)

  membersService.getMembersByCard(card).then(function(response) {
    var _selectedMembers = response
          // iterate through teammembers
          $scope.selectedMembers = []
          // for (var i = 0; i < $scope.teamMembers.length; i++) {
          //   var thisTeamMember = $scope.teamMembers[i]
          //   for (var j = 0; j < _selectedMembers; j++) {
          //     var thisSelectedMember = _selectedMembers[j]
          //     if (thisTeamMember.email === thisSelectedMember.email) {
          //       $scope.selectedMembers.push(thisSelectedMember)
          //     }
          //   }
          // }
        })

  $scope.list = list
  $scope.editingText = false
  $scope.editingTitle = false
  $scope.card = card
  $scope.cardTitle = card.title
  $scope.cardText = card.text

  $scope.editText = function() {
    $scope.editingText = true
  }
  $scope.editTitle = function() {
    $scope.editingTitle = true
  }

  $scope.submitTextEdits = function() {
    cardService.editText(card, $scope.cardText, list).then(function(response) {
      console.log(response)
      $scope.cardText = response.text
            // $scope.card.text = response.text
            angular.copy(response, $scope.card)
            $scope.editingText = false
          })
  }
  $scope.submitTitleEdits = function() {
    cardService.editTitle(card, $scope.cardTitle, list).then(function(response) {
      console.log(response)
      $scope.cardTitle = response.title
            // $scope.card.title = response.title
            angular.copy(response, $scope.card)
            $scope.editingTitle = false
          })
  }

  $scope.cancelEditText = function() {
    $scope.editingText = false
    $scope.cardText = card.text
  }
  $scope.cancelEditTitle = function() {
    $scope.editingTitle = false
    $scope.cardTitle = card.title
  }

  $scope.close = function(result) {
    close(result, 200)
  }

  $scope.completeCard = function() {
    cardService.completeCard(card, list).then(function(response) {
      console.log(response)
      angular.copy(response, $scope.card)
    })
  }
  $scope.uncompleteCard = function() {
    cardService.uncompleteCard(card, list).then(function(response) {
      console.log(response)
      angular.copy(response, $scope.card)
    })
  }
}]);
