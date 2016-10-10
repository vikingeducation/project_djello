app.directive('notification', function () {

  return {
    restrict: 'A',
    scope: {
      boardsData: '='
    },
    link: function(scope, element) {
      switch (scope.boardsData.status) {
        case 'success':
          element.text('Success!!');
          break;
        case 'failure':
          element.text('Failed..');
          break;
        case 'timeout':
          element.text('Timed out.');
          break;
      }
    }
  };

});
