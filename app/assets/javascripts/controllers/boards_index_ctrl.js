app.controller('BoardsIndexCtrl',
['$scope', 'boardsData', 'usersData', 'BoardService', 'noticeData',
function($scope, boardsData, usersData, BoardService, noticeData) {

  $scope.boardsData = boardsData;
  $scope.usersData = usersData;
  $scope.noticeData = noticeData;

  $scope.shiftLeft = function (index) {
    for (var i = 0; i < index; i++) {
      $scope.boardsData.cache[i] = $scope.boardsData.cache[i+1];
    }
  };

  // Undo shift to the left
  $scope.reset = function (index) {
    for (var i = 0; i < index; i++) {
      $scope.boarsData.cache[i+1] = $scope.boardsData.cache[i];
    }
  };

  // Insert the board into the boards cache at this index.
  $scope.insert = function (board, index) {
    $scope.boardsData.cache[index] = board;
  };

}]);


// [1,2,3,4,5]

// drag 1.
// hover 1 over 3.
// hovering 1 over 3 should shift all elements by one offset to the left.
// .. for var i = 0; i < index; i++
//

// dropping 1 on the gap should persist 1 into that index.
