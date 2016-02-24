djello.factory('flashService', function() {

  var flashService = {};

  flashService.buildMessage = function(object, actionType, bool) {
    if (bool) {
      success = 'successfully ';
    } else {
      success = 'failed to be ';
    };

    switch (actionType) {
      case 'create':
        action = 'created';
        break;
      case 'destroy':
        action = 'deleted';
        break;
      case 'add':
        action = 'added';
        break;
      case 'remove':
        action = 'removed';
        break;
      case 'update':
        action = 'updated';
        break;
    };

    var message = object + ' ' + success + action + '!';

    if (!bool) {
      var message = 'Unauthorized! ' + message;
    };

    return message;
  };

  flashService.updateFlash = function(object, actionType, bool) {
    var message = flashService.buildMessage(object, actionType, bool);

    if (bool) {
      bootstrapClass = 'success';
    } else {
      bootstrapClass = 'danger';
    };

    return ([bootstrapClass, message]);
  };

  return flashService;

});