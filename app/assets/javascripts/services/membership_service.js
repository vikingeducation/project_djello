djello.factory('membershipService',
  ['Restangular',
  function(Restangular) {

    membershipService = {};

    membershipService.getMembers = function(card) {
      return Restangular.all('card_memberships')
                        .getList( { card_id: card.id } );
    }

    membershipService.createMembership = function(card, user) {
      var user_id = user ? user.id : undefined
      return Restangular.all('card_memberships')
                        .post( { card_membership: { 
                                          user_id: user_id,
                                          card_id: card.id 
                                                  } } );
    };

    membershipService.removeMember = function(user_id, card) {
      return Restangular.one('cards', card.id).customDELETE( 'destroy_member', { user_id: user_id } )
    };


    return membershipService;

  }])