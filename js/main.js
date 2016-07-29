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
        lastoffset = $(window).scrollTop();
        expand(flip, expandedClass);
        $("html, body").animate({ scrollTop: $('.main-content').offset().top - 50 }, "slow");
      }
    });

    back_button.addEventListener('click', function(event) {
      if (element.classList.contains(expandedClass)) {
        event.stopPropagation();
        contract(flip, expandedClass);
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

  var $About = $('#about');
  var $Projects = $('#projects');
  var $CV = $('#cv');
  var $Contact = $('#contact');
  var $CurrentSection = $About;

  $('.intro-button').click(function(){
    $('.intro').removeClass('intro');
    $CurrentSection.addClass('active-section');
  })

  $('button[value^="#"]').click(function () {
    $CurrentSection.removeClass('active-section');
    var target = this.value;
    $CurrentSection = $(target);
    $CurrentSection.addClass('active-section');
  });
});