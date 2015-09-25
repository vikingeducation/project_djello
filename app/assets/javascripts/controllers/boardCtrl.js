djelloApp.controller('boardCtrl',
  ['$scope', 'authService', '$location', 'boards', '$state', 'Restangular',
  function($scope, authService, $location, boards, $state, Restangular){

    $scope.boards = boards;
    $scope.newBoard = {};
    $scope.newBoard.title = null;
    $scope.boardSelected = null;

    // To display board title if board selected
    $scope.selectedBoard = false;
    // To display create new board input fields if selected
    $scope.createNewBoard = false;

    state = $state;

    // Redirect if not signed in
    var checkSignIn = authService.checkSignIn();
    if (!checkSignIn) { $location.path('/users/sign_in'); }

    $scope.createNewBoardForm = function(){
      $scope.createNewBoard = $scope.createNewBoard ? false : true;
    };

    $scope.createBoard = function(){
      Restangular.all('boards').post(
        { board: {
          title: $scope.newBoard.title,
        }}).then(function(createdBoard){
          $scope.boards.push(createdBoard);
          $scope.newBoard = {};
          $scope.createNewBoard = false;
      });
    };

    $scope.changeBoard = function(){
      $scope.selectedBoard = true;
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