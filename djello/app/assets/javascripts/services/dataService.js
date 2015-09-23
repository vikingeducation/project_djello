djello.service('dataService',['Restangular', 'loginService',
  function(Restangular,loginService){

    var obj = {};

    obj.boards = {};


    Restangular.all('boards').getList().then(
      function(result){
        obj.boards.allBoards = result;
      }
      );

    obj.checkBoardOwner = function(boardId){
      for(var i=0; i<obj.boards.allBoards.length; i++){
        if(obj.boards.allBoards[i].id == boardId){return true}
      }
      return false;
    };

    obj.deleteBoard = function(board){
      var id = board.id;
      for(var i =0; i < obj.boards.allBoards.length; i++){
        if(obj.boards.allBoards[i].id == id){
          obj.boards.allBoards.splice(i,1);
        }
      }
    };

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
