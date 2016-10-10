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

    $scope.addCardMember = function(user_id) {
      console.log("adding member")
      CardService.addCardMember($scope.card.id, user_id)
        .then(function(){
          $rootScope.$broadcast('memeber.changed')
        })
    }

    $scope.removeCardMember = function(user_id) {
      CardService.removeCardMember($scope.card.id, user_id)
      .then(function(){
        $rootScope.$broadcast('member.changed')
      })
    }

    UserService.getUsers()
      .then(function(response) {
        $scope.users = response
      });

  }])
