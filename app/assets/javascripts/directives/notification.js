app.directive('notification',
['$timeout', 'NotificationService',
function ($timeout, NotificationService) {

  return {
    restrict: 'A',
    scope: {
      noticeData: '='
    },
    link: function(scope, element) {
      // have your flash always there at the top of the screen
      // attach an ng-if (it'll be removed based on a boolean)
      // you want an object where each key is the notification type
      // object will have an array of notifications of that type

      scope.raiseNotice = function (data) {
        element.hide();

        switch (data.status) {
          case 'success':
            element.text('Success!! (' + data.type + ")");
            element.addClass('alert alert-success');
            break;
          case 'failure':
            element.text('Failed.. (' + data.type + ")");
            element.addClass('alert alert-danger');
            break;
          case 'timeout':
            element.text('Timed out. (' + data.type + ")");
            element.addClass('alert alert-warning');
            break;
        }

        element.fadeIn('slow');

        $timeout(function() {
          element.fadeOut('slow');
        }, 2000);

      };

    }
  };

}]);
