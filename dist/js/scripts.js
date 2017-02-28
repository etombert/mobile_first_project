//SCROLL TO
$(document).ready(function() {
	$('.scrollTo').click( function() { // Au clic sur un élément
		var page = $(this).attr('href'); // Page cible
		var speed = 1000; // Durée de l'animation (en ms) (750 à la base)
		$('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
		return false;
	});
});

// MENU
$(document).ready(function(){
	$('.tag--menu, .cross').click(function(e){
		e.preventDefault();
		$('.nav__left').animate({width:'toggle'},350);
		$('header').toggleClass('bg-white');
		$('body').toggleClass('no-scroll');
	})
})