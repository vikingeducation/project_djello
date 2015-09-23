djello.controller('listCtrl', ['$scope', 'lists', 'Restangular', '$stateParams',
 function($scope, lists, Restangular, $stateParams) {
  $scope.lists = lists;


  $scope.createList = function(newName){
    var post = Restangular.one('boards', $stateParams.id).all('lists').post({
      list: {
        name: newName,
        board_id: $stateParams.id
      }
    })

    post.then(function(response){
      $scope.lists.push(response)
    })
  }
}])