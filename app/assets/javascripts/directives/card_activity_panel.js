app.directive('cardActivityPanel', function () {

  return {
    restrict: 'E',
    templateUrl: 'templates/directives/card_activity_panel.html',
    scope: {
      activity: '='
    },
    link: function (scope) {
      scope.content = {
        data: ''
      };

      scope.setContent = function () {
        var cardTitle = scope.activity.parameters.title;
        var list = scope.activity.parameters.list;
        var owner = scope.activity.owner;
        var activity = scope.activity;
        var preposition;
        var timestamp = moment(scope.activity.created_at).format('MMMM Do YYYY, h:mm:ss a');
        var action;

        switch (scope.activity.key) {
          case 'card.create':
            action = " has added card '";
            preposition = 'to ';
            break;
          case 'card.update':
            action = " has editted card '";
            preposition = 'in ';
            break;
          case 'card.destroy':
            action = " has removed card '";
            preposition = 'from ';
            break;
        }

        scope.content.data = owner.username + action + cardTitle + "' " + preposition + list + " at " + timestamp;
      };

      scope.getContent = function () {
        scope.setContent();
        return scope.content.data;
      };
    }
  };

});
