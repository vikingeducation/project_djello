djello.factory('cardMembershipService',
  ['Restangular',
  function(Restangular) {

    cardMembershipService = {};

    cardMembershipService.getMembers = function(card) {
      return Restangular.all('card_memberships')
                        .getList( { card_id: card.id } );
    }

    cardMembershipService.createMembership = function(card, user) {
      var user_id = user ? user.id : undefined
      return Restangular.all('card_memberships')
                        .post( { card_membership: { 
                                          user_id: user_id,
                                          card_id: card.id 
                                                  } } );
    };

    cardMembershipService.removeMember = function(user_id, card) {
      return Restangular.one('cards', card.id).customDELETE( 'destroy_member', { user_id: user_id } )
    };


    return cardMembershipService;

  }])