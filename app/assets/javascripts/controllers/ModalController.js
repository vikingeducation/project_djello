app.controller('ModalController', ["$scope", "close", function($scope, close) {
  
  console.log("modal controller")

   $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
   };

 }]);