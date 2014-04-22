$(document).ready(function(){
	$('.project').click(activateModal);
	$('.next').click(nextImage);
	$('.prev').click(prevImage);

	var modalDivs = $('.modal-box')
	modalDivs.hide();
	modalDivs.children().hide()
	modalDivs.children().children().hide();

	$('.sticky-topbar').find('ul>li>a').bind('click',scrollToSection);
	$('.next-page').find('a').click(scrollToSection);

	$('.project-filter').click(filterProjects);

	// do fading 5 times
	  for(i=0;i<5;i++) {
	    $(".next-page").fadeTo('slow', 0.2).fadeTo('slow', 1.0);
	  }
});

function filterProjects(){
	var clicked = $(this);
	if (!clicked.hasClass('active')){
		$('.active').removeClass('active');
		clicked.addClass('active');

		// figure out which ones to toggle
		var categoryType = clicked.data('type');
		if (categoryType != 'all'){
			var category = '.' + categoryType.toString();
			$(category).fadeTo(400, 1);
			$('.project').not(category).fadeTo(400, 0.2);
		}
		else{
			$('.project').fadeTo(400, 1);
		}
	}
}

function scrollToSection(){
	var $anchor = $(this);

    $('html, body').stop().animate({
        scrollLeft: $($anchor.attr('href')).offset().left
    }, 1000);
    event.preventDefault();
}

function scrollToProjects(){
	var offset = $('#projects').position().left * -1 + 'px';
	var projects = $('#projects');
	var	about = $('#about');
	projects.animate({'left': offset}, 'slow');
	about.animate({'left': section}, 'slow');
}

function nextImage(){
	var clicked = $(this);
	var parent = clicked.parent().parent();
	var current = parent.find('.current');
	
	var slides = parent.find('.slide');
	var index = 1;
	for(var i=0; i< slides.length; i++){
		var slide = slides[i];
		if($(slide).hasClass('current')) break;
		index += 1;
	}

	if (current.next().length > 0){
		goToImageIndex(index, current, current.next());
	} else {
		goToImageIndex(0, current, slides.first());
	}

}

function prevImage(){
	var clicked = $(this);
	var parent = clicked.parent().parent();
	var current = parent.find('.current');
	
	var slides = parent.find('.slide');
	var index = -1;
	for(var i=0; i< slides.length; i++){
		var slide = slides[i];
		if($(slide).hasClass('current')) break;
		index += 1;
	}

	if (current.prev().length > 0){
		goToImageIndex(index, current, current.prev());
	} else {
		goToImageIndex(slides.length -1, current, slides.last());
	}
}

function goToImageIndex(index, current, upcoming){
	current.removeClass('current');
	upcoming.addClass('current');

	var left_offset = 100 * -1 * index + '%';
	current.fadeTo('fast', 0);
	current.parent().parent().find('.project-carousel').animate({'left': left_offset}, 'slow');
	upcoming.fadeTo('fast', 1);
}


function activateModal(){
	var KEYCODE_ESC = 27;
	var RIGHT_ARROW = 39; // DOESN'T WORK YET
	var LEFT_ARROW = 37;

	var clicked = $(this).find('a');
	var modalDiv = document.getElementById(clicked.attr('class'));

  	$(modalDiv).fadeIn(400);
  	$(modalDiv).children().fadeIn(100);
  	$(modalDiv).children().children().fadeIn(400);

  	$('body').css('overflow', 'hidden');

  	$(modalDiv).find('.close').click(closeModal);
  	$(modalDiv).click(closeModal);
	$(modalDiv).find('div').click(function(e) {
	    e.stopPropagation();
	});

  	$(document).keyup(function(e) {
	    if (e.keyCode == KEYCODE_ESC) { 
	        closeModal();
	    } 
	});

  	function closeModal(){
  		var carousel = $(modalDiv).children().find('.project-carousel');
  		var upcoming = carousel.find('.slide').first();
  		var current = carousel.find('.current');
  		goToImageIndex(0, current, upcoming);
  		$('body').css('overflow', 'auto');
  		$(modalDiv).hide();
  		$(modalDiv).children().hide();
  		$(modalDiv).children().children().hide();
  	}
}


