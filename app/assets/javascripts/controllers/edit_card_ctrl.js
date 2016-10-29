Djello.controller('EditCardCtrl', [
  '$scope',
  'close',
  'card',
  'CardService',
  'UserService',
  '$rootScope',
  function($scope, close, card, CardService, UserService, $rootScope) {

    $scope.card = card

    $scope.close = function(response) {
    	close(response, 200);
    };

    $scope.changeCard = function(data){
      CardService.changeCard($scope.card.id, data)
    }

    $scope.deleteCard = function() {
      CardService.deleteCard($scope.card.id).then(function(){
        close(undefined, 200);
        $rootScope.$broadcast('card.deleted')
      })
    }

    $scope.addCardMember = function(user) {
      console.log("adding member")
      CardService.addCardMember($scope.card.id, user.id)
        .then(function(response){
          $scope.card.users.push(response)
        })
    }

    $scope.removeCardMember = function(user) {
      CardService.removeCardMember($scope.card.id, user.id)
        .then(function(response){
          debugger
          var index = $scope.card.users.indexOf(user)
          $scope.card.users.splice(index, 1)
        })
    }

    UserService.getUsers()
      .then(function(response) {
        $scope.users = response
      });

  }])
