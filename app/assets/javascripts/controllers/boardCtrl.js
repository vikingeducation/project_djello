djelloApp.controller( 'boardCtrl',
  ['$scope', 'authService', '$location', 'listService',
  function($scope, authService, $location, listService){

    $scope.lists = listService.getLists();

    $scope.signOut = function(){
      console.log("delete called");
      authService.signOut();
    };
   
    var checkSignIn = authService.checkSignIn();
    if (!checkSignIn) { $location.path('/users/sign_in'); }

    $scope.addList = function(){
      console.log("add a list called");
      listService.addList();
    };

    $scope.addCard = function(list){
      listService.addCard(list);
    };

  }]);
