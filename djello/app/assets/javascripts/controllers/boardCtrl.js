djello.controller('boardCtrl',
  ['$scope', '$location', 'loginService', 'boards', 'Restangular', 'dataService',
   function($scope, $location, loginService, boards, Restangular, dataService){

  $scope.user = loginService.signedInUser.user;

  // redirect back to root if not signed in
  // if(!$scope.user.user) $location.path('/');

  $scope.boards = boards.allBoards;
  console.log("boards in ctrl", $scope.boards);

  // creates default board w/o title

  $scope.createBoard = function(){
    console.log('board create');
    Restangular.all('boards').post(
          { board: {  title: 'Default Board Title' ,
                      user_id: $scope.user.id }})
              .then(function(createdBoard){
                    $scope.boards.push(createdBoard);
                    dataService.boards.allBoards.push(createdBoard);
                  });
  };


  // $scope.cards = ["task1", "task2"];
  // $scope.lists = ["list1", "list2"];


}]);
