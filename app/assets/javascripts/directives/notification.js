app.directive('notification', ['$timeout', function ($timeout) {

  return {
    restrict: 'A',
    scope: {
      noticeData: '='
    },
    link: function(scope, element) {
      element.hide();

      switch (scope.noticeData.status) {
        case 'success':
          element.text('Success!! (' + scope.noticeData.type + ")");
          element.addClass('alert alert-success');
          break;
        case 'failure':
          element.text('Failed.. (' + scope.noticeData.type + ")");
          element.addClass('alert alert-danger');
          break;
        case 'timeout':
          element.text('Timed out. (' + scope.noticeData.type + ")");
          element.addClass('alert alert-warning');
          break;
      }

      element.fadeIn('slow');

      $timeout(function() {
        element.fadeOut('slow');
      }, 2000);
    }
  };

}]);
