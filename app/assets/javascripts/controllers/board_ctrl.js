app.controller("BoardCtrl", ['$scope', 'boardService', '$stateParams', 'listService', '_', 'Restangular', function($scope, boardService, $stateParams, listService, _, Restangular){


  //put a loading sign
  //get the board and its lists to start things off
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


  //this is the form for an inplace list
  $scope.inplaceForm = {};

  $scope.listFormClass = function(id){
    return "list-edit-" + id;
  };


  //this enables/disables listeners for inplace editing and toggles editing attribute
  $scope.toggleEditList = function(list, event){
    //only do this if the count of lists with editing === true is 0
    if(_.findIndex($scope.lists, { editing: true }) === -1){
      event.stopPropagation();
      var query = ".list-edit-" + list.id;
      var $ignore = $(query);
      

      if(list.editing){
        list.editing = false;
        //turn listeners off
        $ignore.off('click');
        $(document).off('click');

      } else {
        list.editing = true;
        console.log("set listeners");
        
        $(document).on('click', function(event) {
          
          listService.updateList($scope.inplaceForm, list.id).then(function(response){

            var editListIndex;
            $scope.lists.forEach(function(l, index){
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
    }
    
    
  }//end toggle list





  //When to submit form

}]);