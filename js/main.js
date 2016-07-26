'use strict';
$(document).ready(function () {

  // Standard FLIP
  // https://aerotwist.com/blog/flip-your-animations/#the-general-approach
  function expand(flip, newclass) {
    flip.first();
    flip.last(newclass);
    flip.invert();
    flip.play();
  }

  // Reverse/close
  // In this round we remove the expanded class to calculate the 'inversion'
  // The grid might have scrolled at this point, this will ensure the transforms are correct.
  function contract(flip, removedclass) {
    flip.first();
    flip.removeClass(removedclass);
    flip.last();
    flip.invert();
    flip.play();
  }

  // Event subscription

  var elements = document.querySelectorAll('.expandable-content');
  var back_buttons = document.querySelectorAll('.project-menu-back');
  var expandedClass = 'expanded';
  var lastoffset;
  
  var _loop = function () {
    var element = elements[i];
    var back_button = back_buttons[i];
    var flip = new FLIP({
      element: element,
      duration: 150
    });
    
    element.addEventListener('click', function () {
      if (!element.classList.contains(expandedClass)) {
        lastoffset = $(window).scrollTop();//$(this).offset().top - ($(this).height() * 0.5);

        expand(flip, expandedClass);

        $("html, body").animate({ scrollTop: $('.main-content').offset().top - 50 }, "slow");

      }
    });

    back_button.addEventListener('click', function() {
      if (element.classList.contains(expandedClass)) {
        contract(flip, expandedClass);
        event.stopPropagation();

        
        $("html, body").animate({ scrollTop: lastoffset }, "slow");
        
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

  $('.intro-button').click(function(){
    $('.intro').removeClass('intro');
    $('html, body').stop().animate({
          'scrollTop': $('html').offset().top
      }, 500, 'swing', function () {
          window.location.hash = "about";
      });
  })

  $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 300, 'swing', function () {
        window.location.hash = target;
      });
  });
});