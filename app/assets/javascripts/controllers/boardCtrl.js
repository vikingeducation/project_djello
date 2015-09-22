djelloApp.controller( 'boardCtrl',
  ['$scope', 'authService', '$location', 'listService', 'boards', 'Restangular', function($scope, authService, $location, listService, boards, Restangular){

    // $scope.lists = listService.getLists();

    $scope.boards = boards;
    $scope.newBoard = {};

    $scope.signOut = function(){
      console.log("delete called");
      authService.signOut();
    };

    var checkSignIn = authService.checkSignIn();
    if (!checkSignIn) { $location.path('/users/sign_in'); }

    // $scope.addList = function(){
    //   console.log("add a list called");
    //   listService.addList();
    // };

    // $scope.addCard = function(list){
    //   listService.addCard(list);
    // };

    $scope.createBoard = function(){
      Restangular.all('boards').post(
        { board: {
          title: $scope.newBoard.title
        }}).then(function(createdBoard){
        $scope.boards.push(createdBoard);
        $scope.newBoard = {};
      });
    };

    $scope.createBoard = function(){

    };

  }]);
