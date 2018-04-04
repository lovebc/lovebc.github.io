$(document).ready(function() {

  // Variables
  var $codeSnippets = $('.code-example-body'),
    $nav = $('.navbar'),
    $body = $('body'),
    $window = $(window),
    $popoverLink = $('[data-popover]'),
    navOffsetTop = $nav.offset().top,
    $document = $(document),
    entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;'
    }

  function init() {
    $window.on('scroll', onScroll)
    $window.on('resize load', resize)
    $popoverLink.on('click', openPopover)
    $document.on('click', closePopover)


  }

  function openPopover(e) {
    e.preventDefault()
    closePopover();
    var popover = $($(this).data('popover'));
    popover.toggleClass('open');
    popover.css('left', "-" + String(Math.abs(popover.width() - popover.parent().width()) / 2) + "px");
    e.stopImmediatePropagation();
  }

  function closePopover(e) {
    if ($('.popover.open').length > 0) {
      $('.popover').removeClass('open')
    }
  }

  function resize() {
    $body.removeClass('has-docked-nav')
    navOffsetTop = $nav.offset().top
    onScroll()
  }

  function onScroll() {
    if (navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
      $body.addClass('has-docked-nav')

    }
    if (navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
      $body.removeClass('has-docked-nav')
    }
  }

  init();

});


$(document).on('click', 'a[href^="#"]', function(event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
  window.location.hash = $.attr(this, 'href')

});
