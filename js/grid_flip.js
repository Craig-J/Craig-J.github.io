// We animate the content of the tiles/cells, not the tiles themselves. They are not absolutelty positioned and so animating them would cause layout changes, this would look strange and hurt performance.
'use strict';

var elements = document.querySelectorAll('.content');
var expandedClass = 'expanded';

// Standard FLIP
// https://aerotwist.com/blog/flip-your-animations/#the-general-approach
function expand(flip) {
  flip.first();
  flip.last(expandedClass);
  flip.invert();
  flip.play();
}

// Reverse/close
// In this round we remove the expanded class to calculate the 'inversion'
// The grid might have scrolled at this point, this will ensure the transforms are correct.
function contract(flip) {
  flip.first();
  flip.removeClass(expandedClass);
  flip.last();
  flip.invert();
  flip.play();
}

// Event subscription

var _loop = function () {
  var element = elements[i];
  var flip = new FLIP({
    element: element,
    duration: 200
  });

  element.addEventListener('click', function () {
    if (!element.classList.contains(expandedClass)) {
      expand(flip);
    } else {
      contract(flip);
    }
  });
};

for (var i = 0; i < elements.length; i++) {
  _loop();
}