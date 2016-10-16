app.controller("CardsCtrl", ['$scope', '$state', 'cardService', 'ModalService', 'Restangular', function($scope, $state, cardService, ModalService, Restangular){

  
  $scope.cards = $scope.list.cards;
  
  //GET CARDS THAT ARENT COMPLETE
  $scope.getWorkingCards = function(){
    $scope.workingCards = cardService.workingCards($scope.cards);
  };

  $scope.getWorkingCards();

  $scope.sorting = true;

  
  //Wait till handleSort signals so I can work w updated DOM
  $scope.$watch(function(){
    return $scope.sorting;
  }, function(sorted){
    if(sorted === false){
      $scope.updateSort();
    }
  })

  // branch sv has one step back
  $scope.triggerSort = function(card, newList, newIndex){
    //can't just do sorting activities here bc DOM isn't updated yet
    //bc of bug w sv-on-sort/sv-on-stop
    $scope.movedCard = card;
    $scope.newList = newList;
    $scope.newIndex = newIndex;
    $scope.sorting = false;

  };

  $scope.updateSort = function(){
    
    var card = $scope.movedCard;
    var newList = $scope.newList;
    var newIndex = $scope.newIndex;

    var $card = $("#card-" + card.id);
    foose = $card;
    var $container = $card.parent();
    //it's getting the old parent
    coose = $container;
    var newListId = $container.data("list-id");


    //restangularize card
    Restangular.restangularizeElement(null, card, 'cards');
    card.list_id = parseInt(newListId);
    
    //assign position
    var lastIndex = newList.length - 1;
    //the one above but with a lower position # is nI - 1
    var above = newList[newIndex - 1];
    var below = newList[newIndex + 1]
    
    if(below && above ){
      var newPos = above.position + ((below.position - above.position) / 2);
      card.position = newPos;

    } else if(below){
      card.position = below.position - 25;

    } else if(above){
      card.position = above.position + 25;
    } else {
      //assign no new position since the list was empty
    }
    
    card.patch();

    //flip the switch to listen for a sorted card
    $scope.sorting = true;
  }

  $scope.buildCardId = function(id){
    return "card-" + id;
  };

  $scope.buildListId = function(id){
    return "list-container-" + id;
  };

  $scope.cardForm = {};
  $scope.cardForm.list_id = $scope.list.id;



  $scope.creatingCard = false;

  $scope.createCard = function(){
    $scope.cardForm.list_id = $scope.list.id;
    cardService.createCard($scope.cardForm).then(function(response){
      $scope.cards.push(response);
      $scope.getWorkingCards();

      $scope.creatingCard = false;
      $scope.cardForm = {};
    }, function(){
      console.log("could not create card");

      $scope.creatingCard = false;
      $scope.cardForm = {};
      $scope.cardForm.list_id = $scope.list.id;
    })
  };

  $scope.showCard = function(card) {
    Restangular.restangularizeElement(null, card, 'cards');
    
    ModalService.showModal({
      templateUrl: "/templates/cards/card.html",
      controller: "CardCtrl",
      inputs: {
        card: card
      }
    }).then(function(modal) {
    
      modal.element.modal();
      modal.close.then(function(result) {
        console.log("modal closed");
      });
    });

  };




}]);