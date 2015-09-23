djelloApp.controller('boardCtrl',
  ['$scope', 'authService', '$location', 'boards', '$state',
  function($scope, authService, $location, boards, $state){

    $scope.boards = boards;
    $scope.newBoard = {};
    $scope.newBoard.title = "add a title";

   


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

  }]);