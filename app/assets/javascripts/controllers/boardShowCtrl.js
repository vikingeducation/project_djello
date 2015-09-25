djelloApp.controller('boardShowCtrl',
  ['$scope', 'Restangular', 'board',
  function($scope, Restangular, board ){
    // board;
    $scope.board = board;
    $scope.newList = {};
    $scope.addNewList = false;
    $scope.editTitle = false;
    $scope.editListAttr = "hey";
    $scope.editDescription = false;
    listAttr = $scope.editListAttr;


    $scope.addList = function(){
      $scope.addNewList = true;
    };

    $scope.createList = function(){

      Restangular.all('lists').post(
        { list: {
                  board_id: $scope.board.id,
                  title: $scope.newList.title,
                  description: $scope.newList.description
                }
        }).then(function(createdList){
          console.log(board);
          $scope.board.lists.push(createdList);
          $scope.addNewList = false;
      });
    };

    $scope.updateList = function(list){

      Restangular.one('lists', list.id).put().then(function(editList){
        editList.title = list.title;
        editList.description = list.description;

        editList.put();
        console.log(list);
        console.log("success");
      }, function(fail){
        console.log(fail);
      });
    };

    $scope.addCard = function(list){
      // console.log(list);
      Restangular.all('cards').post(
        { card: {
                  list_id: list.id,
                  title: "Add Info",
                  description: ""
                }
        }).then(function(createdCard){
          // console.log(board);
          list.cards.push(createdCard);
          // $scope.addNewList = false;
      });
    };

    $scope.saveTitle = function(){
      console.log("saved title in view!");
    };

    // LIST

    $scope.editListTitle = function(){
      console.log("edit list yo");
      $scope.editTitle = true;
    };

    $scope.editListDescription = function(){
      
      $scope.editDescription = true;
    };

    $scope.saveListTitle = function(list){
      $scope.editTitle = true;
      console.log(list.title);
    };

    $scope.saveListDescription = function(list) {
      $scope.editDescription = true;
      console.log(list.description);
    };

}]);