// animated text
var typed = new Typed("#texting", {
    strings: ['Stop dreaming', '&amp;...', 'start Doing!'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})
// animated text

// scroll down
$(function() {
    $('a[href*=#]').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
            
    });
  });
// scroll down

// slider

// slider
