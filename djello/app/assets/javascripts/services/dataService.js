djello.service('dataService',['Restangular',
  function(Restangular){

    var obj = {};

    obj.boards = {};
    Restangular.all('boards').getList().then(
      function(result){
        obj.boards.allBoards = result;
      }
      );

    obj.updateBoard = function(updatedB){
      var id = updatedB.id;
      for(var i =0; i < obj.boards.allBoards.length; i++){
        if(obj.boards.allBoards[i].id == id){
          obj.boards.allBoards[i] = updatedB;
        }
      }
      // obj.boards.allBoards = Restangular.all('boards').getList();
    };

    return obj;

  }
  ]);
