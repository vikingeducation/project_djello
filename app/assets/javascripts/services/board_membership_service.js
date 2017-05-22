djello.factory('boardMembershipService',
  ['Restangular',
  function(Restangular) {

    boardMembershipService = {};

    boardMembershipService.getMembers = function(board) {
      return Restangular.all('board_memberships')
                        .getList( { board_id: board.id } );
    }

    boardMembershipService.createMembership = function(board, user) {
      var user_id = user ? user.id : undefined;
      return Restangular.all('board_memberships')
                        .post( { board_membership: { 
                                          user_id: user_id,
                                          board_id: board.id 
                                                  } } );
    };

    boardMembershipService.removeMember = function(user_id, board) {
      return Restangular.one('boards', board.id).customDELETE( 'destroy_member', { user_id: user_id } )
    };


    return boardMembershipService;

  }])