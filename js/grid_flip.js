// We animate the content of the tiles/cells, not the tiles themselves. They are not absolutely positioned and so animating them would cause layout changes, this would look strange and hurt performance.
'use strict';

var elements = document.querySelectorAll('.expandable-content');
var back_buttons = document.querySelectorAll('.project-menu-back');
var expandedClass = 'expanded';

// Scroll disabling script
var $body = $('body'),
    scrollDisabled = false,
    scrollTop;

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
  var back_button = back_buttons[i];
  var flip = new FLIP({
    element: element,
    duration: 150
  });
  
  element.addEventListener('click', function () {
    if (!element.classList.contains(expandedClass)) {
      expand(flip);

      $("html, body").animate({ scrollTop: $('.main-content').offset().top - 50 }, "slow");

      // Scroll disabling script
      /*if (scrollDisabled)
      {
        return;
      }
      scrollTop = $(window).scrollTop();

      $body.addClass('noscroll')
      .css({
      top: -1 * scrollTop
      });

      scrollDisabled = true;*/
    }
  });

  back_button.addEventListener('click', function() {
    if (element.classList.contains(expandedClass)) {
      contract(flip);
      event.stopPropagation();

      // Scroll disabling script
      /*if (!scrollDisabled)
      {
        return;
      }

      $body.removeClass('noscroll');
      $(window).scrollTop(scrollTop);

      scrollDisabled = false;*/
    }
  });
    
};

for (var i = 0; i < elements.length; i++) {
  _loop();
}

// Stops links on unopened project-menu from opening the grid when clicked
$('.project-menu a').click(function(e) {
  e.stopPropagation();
});

$('html').click(function(){
  $(this).removeClass('start');
})

$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 0, 'swing', function () {
	        window.location.hash = target;
	    });
	});