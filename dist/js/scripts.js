$(document).ready(function(){
	$('.tag--menu, .cross').click(function(e){
		e.preventDefault();
		$('.nav__left').animate({width:'toggle'},350);
		$('header').toggleClass('bg-white');
		$('body').toggleClass('no-scroll');
	})
})