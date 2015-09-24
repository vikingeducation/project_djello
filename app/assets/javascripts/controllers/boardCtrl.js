djelloApp.controller('boardCtrl',
  ['$scope', 'authService', '$location', 'boards', '$state', 'Restangular',
  function($scope, authService, $location, boards, $state, Restangular){

    $scope.boards = boards;
    console.log("boards");
    console.log(boards);
    $scope.newBoard = {};
    $scope.newBoard.title = "add a title";
    $scope.boardSelected = null;

    state = $state;

    // Redirect if not signed in
    var checkSignIn = authService.checkSignIn();
    if (!checkSignIn) { $location.path('/users/sign_in'); }

    $scope.createBoard = function(){

      Restangular.all('boards').post(
        { board: {
          title: $scope.newBoard.title,
        }}).then(function(createdBoard){
        console.log("board created.");
        $scope.boards.push(createdBoard);
         console.log(createdBoard);
        $scope.newBoard = {};
      });
    };

    $scope.changeBoard = function(){
      $state.go('boards.index.show', {id: $scope.boardSelected.id});
    };

    $scope.deleteBoard = function(){
      var idx = boards.indexOf($scope.boardSelected);
      $scope.boardSelected.remove().then(function(){
        $scope.boards.splice(idx, 1);
        $scope.boardSelected = $scope.boards.first;
        $location.path('/boards/');
      });
    };

  }]);