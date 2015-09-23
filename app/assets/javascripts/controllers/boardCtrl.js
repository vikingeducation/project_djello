djelloApp.controller( 'boardCtrl',
  ['$scope', 'authService', '$location', 'boards', 'Restangular', function($scope, authService, $location, boards, Restangular){

    $scope.boards = boards;
    $scope.newBoard = {};
    $scope.newBoard.title = "add a title";

    $scope.signOut = function(){
      console.log("delete called");
      authService.signOut();
    };

    var checkSignIn = authService.checkSignIn();
    if (!checkSignIn) { $location.path('/users/sign_in'); }

    $scope.createBoard = function(){

      Restangular.all('boards').post(
        { board: {
          title: $scope.newBoard.title,
          // user_id: authService.getCurrentUser().id
        }}).then(function(createdBoard){
        console.log("board created.");
        $scope.boards.push(createdBoard);
         console.log(createdBoard);
        $scope.newBoard = {};
      });
    };

  }]);

    // $scope.lists = listService.getLists();

    // $scope.addList = function(){
    //   console.log("add a list called");
    //   listService.addList();
    // };

    // $scope.addCard = function(list){
    //   listService.addCard(list);
    // };