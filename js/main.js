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

  $.fn.disableScroll = function() {
    window.oldScrollPos = $(window).scrollTop();

    $(window).on('scroll.scrolldisabler', function (event) {
       $(window).scrollTop( window.oldScrollPos );
       event.preventDefault();
    });
  };

  $.fn.enableScroll = function() {
      $(window).off('scroll.scrolldisabler');
  };

  // Event subscription
  var html = $("html");
  var body = $("body");
  var elements = document.querySelectorAll('.expandable-content');
  var elementsFixedPosition = document.querySelectorAll('.fixed-position');
  var backButtons = document.querySelectorAll('.project-menu-back');
  var expandedClass = 'expanded';
  var lastOffset;
  
  var _loop = function () {
    var element = elements[i];
    var back_button = backButtons[i];
    var flip = new FLIP({
      element: element,
      duration: 150
    });

    var isFixedOverlay = false;

    elementsFixedPosition.forEach(function(value){
      if(value === element)
        isFixedOverlay = true;
    });
    
    element.addEventListener('click', function () {
      if (!element.classList.contains(expandedClass)) {
        lastOffset = $(window).scrollTop();
        expand(flip, expandedClass);
        if(isFixedOverlay)
        {
          body.disableScroll();
        }
        else
        {
          $("html, body").animate({ scrollTop: $('.main-content').offset().top - 50 }, "slow");
        }
      }
    });

    back_button.addEventListener('click', function(event) {
      if (element.classList.contains(expandedClass)) {
        event.stopPropagation();
        contract(flip, expandedClass);
        if(isFixedOverlay)
        {
          body.enableScroll();
        }
        else
        {
          $("html, body").animate({ scrollTop: lastOffset }, "slow");
        }
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

  var $About = $('#about');
  var $Projects = $('#projects');
  var $CurrentSection = $About;
  $CurrentSection.addClass('active-section');

  /*$('.intro-button').click(function(){
      $('.intro').removeClass('intro');
      $CurrentSection.addClass('active-section');
  })*/

  $('button[value^="#"]').click(function () {
    $CurrentSection.removeClass('active-section');
    var target = this.value;
    $CurrentSection = $(target);
    $CurrentSection.addClass('active-section');
  });
});