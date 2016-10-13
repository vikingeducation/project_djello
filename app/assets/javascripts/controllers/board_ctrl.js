app.controller("BoardCtrl", ['$scope', 'boardService', '$stateParams', 'listService', function($scope, boardService, $stateParams, listService){


  

  boardService.getBoard($stateParams.id).then(function(response){
    $scope.board = response;

    $scope.lists = $scope.board.lists;
  }, function(){
    console.log("couldn't get all boards");
  })
  
  
  $scope.listForm = {};

  $scope.creatingList = false;

  $scope.toggleCreatingList = function(){
    $scope.creatingList = !$scope.creatingList;
  };

  $scope.createList = function(){
    var listParams = $scope.listForm;
    listParams.board_id = $scope.board.id;

    listService.createList(listParams).then(function(response){
      $scope.lists.push(response);
    }, function(){
      console.log("there was an error creating list");
    });

    $scope.listForm = {};
    $scope.toggleCreatingList();
  };

  $scope.deleteList = function(list, index){
    listService.deleteList(list.id).then(function(){
      $scope.lists.splice(index, 1);
    }, function(){
      console.log("couldn't delete list");
    });


  };



  $scope.inplaceForm = {};

  $scope.listFormClass = function(id){
    return "list-edit-" + id;
  };


  //this enables/disables listeners for inplace editing and toggles editing attribute
  $scope.toggleEditList = function(list, event){
    // its not selecting because using ng-if makes it not available yet
    event.stopPropagation();
    console.log(list.id);
    var query = ".list-edit-" + list.id;
    console.log(query);
    var $ignore = $(query);
    rocketbooster = $ignore;

    if(list.editing){
      list.editing = false;
      console.log("listeners off");
      $ignore.off('click');
      $(document).off('click');

    } else {
      list.editing = true;
      console.log("set listeners");
      
      $(document).on('click', function(event) {
        boot = $scope.inplaceForm;
        listService.updateList($scope.inplaceForm, list.id).then(function(response){

          var editListIndex;
          $scope.lists.forEach(function(l, index){
            fooy = l;
            loy = index;
            if($scope.lists[index].id === list.id){
              editListIndex = index;
            }
          });
          $scope.inplaceForm = {};
          //make the state of list not editing
          list.editing = false;

          //disable the listeners 
          $ignore.off('click');
          $(document).off('click');

         //set the state of the new list editing to false
         //update the list
          response.editing = false;
          $scope.lists.splice(editListIndex, 1, response);

          console.log("successfully updated list");


        }, function(){
          $scope.inplaceForm = {};
          //make the state of list not editing
          list.editing = false;

          //disable the listeners 
          $ignore.off('click');
          $(document).off('click');
          console.log('could not update list');
        });
      });

      //don't let the event bubble to the document
      $ignore.on('click', function(event) {
        event.stopPropagation();
      });

    }
    
  }//end toggle list


  //When to submit form

}]);