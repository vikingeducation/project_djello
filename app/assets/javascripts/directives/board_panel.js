app.directive('boardPanel',
['BoardService', 'ListService', 'MemberService', 'UserService',
function(BoardService, ListService, MemberService, UserService) {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/board_panel.html',
    scope: {
      board: '=',
      usersCache: '='
    },
    link: function(scope) {
      scope.searchDependencies = {
        parent: scope.board,
        parentType: 'board',
        collection: scope.usersCache,
        searchKey: 'username'
      };

      // Cache members.
      MemberService.all(scope.board.id, scope.searchDependencies.parentType)
        .then(function(data) {
          scope.membersCache = data;
        });

      //  Cache board lists.
      scope.storeBoardLists = function(data) {
        scope.boardListsCache = data;
      };

      ListService.all(scope.board.id)
        .then(scope.storeBoardLists);

      // Board removal.
      scope.removeBoard = function() {
        BoardService.destroy(scope.board);
      };

      scope.addMember = function () {
        MemberService.create({
          parent_id: scope.board.id,
          parent_type: 'board',
          username: UserService.getSuggestion()
        });
      };
    }
  };

}]);
