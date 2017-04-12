djello.factory('membershipService',
  ['Restangular',
  function(Restangular) {

    membershipService = {};

    membershipService.createMembership = function(card, user) {
      var user_id = user ? user.id : card.user_id
      console.log('creating membership')
      return Restangular.all('card_memberships')
                        .post( { card_membership: { 
                                          user_id: user_id,
                                          card_id: card.id 
                                                  } } );
    };


    return membershipService;

  }])