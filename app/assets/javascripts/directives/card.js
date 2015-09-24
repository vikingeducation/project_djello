app.directive("card", function(){
  var template = '<div ng-click="showModal()" class="col-xs-12 list-card well" ng>\
  {{ value.title}}\
  </div>'

  return {
    restrict: "E",
    replace: true,
    template: template,
    scope: {
      value: "=cardel",
      owner: "=",
    },
    controller: ['$scope', 'ModalService', function($scope, ModalService){

      $scope.showModal = function(){
        console.log($scope.value)
        ModalService.showModal({
          inputs: {
            modalCard: $scope.value,
            owner: $scope.owner,
          },
          templateUrl: "templates/cards/modal.html",
          controller: ['$scope','Cards', 'close', 'modalCard', 'Users', 'Session', 'owner',
           function($scope,Cards, close, modalCard, Users, Session, owner){
            if (Users.users.length == 0){
              Users.getUsers();
            }

            $scope.isOwner = function(){
              return Session.currentUser.user.id == owner
            }

            $scope.users = Users.users;

            $scope.modalCard = modalCard;

            $scope.addMember = function(target){
              Cards.addMember($scope.modalCard, target, function(result){
                $scope.modalCard.members.push(result.member);
                $scope.modalCard.activities.push(result.activity);
              });
            }

            $scope.removeMember = function(target){
              Cards.removeMember($scope.modalCard, target, function(response){
                var index = $scope.modalCard.members.reduce(function(result, el, index){
                  return el.id == response.member.user_id ? index : result
                }, -1)
                if (index >= 0) $scope.modalCard.members.splice(index, 1);

                $scope.modalCard.activities.push(response.activity);
              })
            }

            $scope.enableTitleEditor = function() {
              $scope.disableDescEditor();
              $scope.titleEditorEnabled = true;
              $scope.titleEditableValue = $scope.modalCard.title;
            };

            $scope.disableTitleEditor = function() {
              $scope.titleEditorEnabled = false;
            };

            $scope.saveTitle = function() {
              $scope.disableTitleEditor();
              var message = JSON.parse(JSON.stringify($scope.modalCard));
              message.title = $scope.titleEditableValue;
              Cards.editCard(message, function(result){
                $scope.modalCard.title = result.title;
              });
            };

            $scope.enableDescEditor = function() {
              $scope.disableTitleEditor();
              $scope.descEditorEnabled = true;
              $scope.descEditableValue = $scope.modalCard.description;
            };

            $scope.disableDescEditor = function() {
              $scope.descEditorEnabled = false;
            };

            $scope.saveDescription = function() {
              $scope.disableDescEditor();
              var message = JSON.parse(JSON.stringify($scope.modalCard));
              message.description = $scope.descEditableValue;
              Cards.editCard(message, function(result){
                $scope.modalCard.description = result.description;
              });
            };

            $scope.disableEditors = function(){
              $scope.disableDescEditor();
              $scope.disableTitleEditor();
            }

            $scope.complete = function(){
              var message = JSON.parse(JSON.stringify($scope.modalCard));
              message.completed = true;
              Cards.editCard(message, function(result){
                $scope.modalCard.completed = result.completed
                $scope.close('');
              })
            }

            $scope.close = function(result){
              close(result, 500);
            };

          }]
        }).then(function(modal) {

          //it's a bootstrap element, use 'modal' to show it
          modal.element.modal();
          modal.close.then(function(result) {
          });
        });
      }


    }]
  }
})
