/*
 * Dina - Restaurant, Bar, Cafe, Food HTML Template
 *
 * Author: https://matchthemes.com
 *
 */
 
(function($) {
    "use strict";
	
	//home slider
	
	// home slider
	$('.home-slider').owlCarousel({
    items:1,
    loop:true,
	autoplay:true,
	autoplayTimeout:4000,
	animateOut: 'fadeOut',
	dots:false,
	nav:true,
	navText:''
});
	
	//end home slider
	
	//home 10 carousel
	
	$('.home-carousel').owlCarousel({
    items:1,
    loop:true,
	autoplay:true,
	autoplayTimeout:4000,
	autoplayHoverPause:true,
	dots:false,
	nav:false,
	navText:'',
	responsiveClass:true,
	 responsive:{
		  0:{
            items:2
        },
		
		 1024:{
            items:4
        },
		
        1300:{
            items:5
        }
    }
});
	
	
	//hamburger menu
	$('.nav-button-holder').on('click', function(e){
			
			e.preventDefault();
			
			if($(this).is('.inactive')) {
				
				$(this).toggleClass('inactive active');
				$('body').addClass('has-active-menu');
				$('.nav-button').addClass('active');
				$('.mask-nav-2, #header-2').addClass('is-active');
				
				}
			
			else if($(this).is('.active')) {
				
				$(this).toggleClass('inactive active');
				$('body').removeClass('has-active-menu');
				$('.nav-button').removeClass('active');
     			$('.mask-nav-2, #header-2').removeClass('is-active');
				
			}
																	  
			});
	
	$('.menu-nav-2 > li.menu-item-has-children > a').on('click', function(e){
			
			e.preventDefault();
			e.stopPropagation();
			
			if ( $(this).parent().hasClass('menu-open') )
			
			$(this).parent().removeClass('menu-open');
			
			else {
			
			$('.menu-nav-2').find('.menu-item-has-children').removeClass('menu-open');
			
			$(this).parent().addClass('menu-open');
			
			}
																  
			});
	
	// end hamburger menu
	
	//sticky menu
	$(window).on('scroll',function(){
  if ($(document).scrollTop() > 50) {
    $('.navbar-1, #header-2, #header-3, #header-4, .header6').addClass('nav-bkg1');
	$('.headerWrap-5').addClass('navbar-fixed-top nav-bkg1');
  } else {
    $('.navbar-1, #header-2, #header-3, #header-4, .header6').removeClass('nav-bkg1');
	$('.headerWrap-5').removeClass('navbar-fixed-top nav-bkg1');
  }
  
  });
	
// end accordion menu

//fluid width videos

  $(".single-post-content, .custom-page-template, .post-video").fitVids({customSelector: "iframe[src^='https://w.soundcloud.com']"});
 
 //gallery
 
 $('.menu-post-img a, .menu-post-img-v2 a').magnificPopup({
	  type: 'image',
	});
   
  $('.gallery-post a').magnificPopup({
  type: 'image',
  gallery:{
    enabled:true
  }
});
 
 //scroll up button
 
  $(".scrollup").hide();
     $(window).on('scroll', function() {
         if ($(this).scrollTop() > 400) {
             $('.scrollup').fadeIn();
         } else {
             $('.scrollup').fadeOut();
         }
     });

$("a.scrolltop[href^='#']").on('click', function(e) {
   e.preventDefault();
   var hash = this.hash;
   $('html, body').stop().animate({scrollTop:0}, 1000, 'easeOutExpo');

});

// Smooth scrolling for all anchor links
$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 1000, 'easeOutExpo');
      return false;
    }
  }
});

 
})(jQuery);