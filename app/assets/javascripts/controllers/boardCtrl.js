djelloApp.controller( 'boardCtrl',
  ['$scope', 'authService', '$location', 'listService', 'boards', 'Restangular', function($scope, authService, $location, listService, boards, Restangular){

    // $scope.lists = listService.getLists();

    $scope.boards = boards;
    $scope.newBoard = {};
    $scope.newBoard.title = "add a title";

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
      console.log("board created.");

      Restangular.all('boards').post(
        { board: {
          title: $scope.newBoard.title,
          user_id: authService.getCurrentUser().id
        }}).then(function(createdBoard){
        $scope.boards.push(createdBoard);
         console.log(createdBoard);
        $scope.newBoard = {};
      });
    };

  }]);
