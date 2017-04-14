djello.factory('activityService',
  ['Restangular', '$rootScope',
  function(Restangular, $rootScope) {

    activityService = {};

    activityService.getActivities = function(id) {
      return Restangular.all('activities').getList( {card_id: id} );
    }

    activityService.createActivity = function(card_id, description) {
      return Restangular.all('activities')
                        .post( { activity: 
                          { card_id: card_id,
                            description: description 
                          } } );
    }

    activityService.sayHi = function() { console.log('saying hi') }

    return activityService;

  }])