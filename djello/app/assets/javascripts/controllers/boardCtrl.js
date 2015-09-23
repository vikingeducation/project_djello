djello.controller('boardCtrl',
  ['$scope', '$location', 'loginService', 'boards',
   function($scope, $location, loginService, boards){

  $scope.user = loginService.signedInUser.user;

  // redirect back to root if not signed in
  // if(!$scope.user.user) $location.path('/');

  $scope.boards = boards;
  console.log("boards in ctrl", $scope.boards);

  // creates default board w/o title

  $scope.createBoard = function(){
    Restangular.all('boards').post(
          { board: {  title: 'Default Board Title'} })
                  .then(function(createdBoard){
                        $scope.boards.push(createdBoard);
                  });
  };


  // $scope.cards = ["task1", "task2"];
  // $scope.lists = ["list1", "list2"];


}]);
