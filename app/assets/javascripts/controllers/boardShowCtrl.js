app.controller('BoardShowCtrl',['$scope', '$location', 'Restangular', 'Boards', 'board', 'Session',
  function($scope, $location, Restangular, Boards, board, Session){
  $scope.board = board
  $scope.title = ""

  $scope.isOwner = function(){
    return Session.currentUser.user.id == $scope.board.user_id
  }

  $scope.addList = function(){
     Restangular.all('lists').post({list: {title: $scope.title,description: "" ,board_id: $scope.board.id}}).then(function(newList){
      $scope.board.lists.push(newList);
     });
  }

  $scope.editList = function(listid, result){
    Restangular.one('lists', listid).patch(result).then(function(res){
      console.log(res)
    }, function(fail){
      console.log(fail);
    })
  }

  $scope.addCard = function(card){
    Restangular.all('cards').post({card: card}).then(function(result){
      console.log(result);
    }, function(fail){
      console.log(fail);
    })
  }

  $scope.deleteBoard = function(id){
    Restangular.one('boards', id).remove().then(function(success){
      console.log(success);
      Boards.deleteBoard(success);
      $location.path('/board/index');
    },function(failure){
      console.log(failure)
    })
  };
    // $scope.$on('devise:unauthorized', function(){
    //   console.log("Caught unauthorized!");
    //   $location.path('/board');
    // })
}]);
