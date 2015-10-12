djello.directive('draggableCard', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      // element.css({
      //  position: 'relative',
      //  border: '1px solid red',
      //  backgroundColor: 'lightgrey',
      //  cursor: 'pointer'
      // });
      var newElement;

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        newElement = element.clone();
        console.log("newElement", newElement);
        element.html("dragging");
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        newElement.css({
          position: 'relative',
          zIndex: 90,
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        newElement.css({
          color: '#000'
        })
        newElement.appendTo($("#drag"));
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);