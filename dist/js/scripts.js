$(document).ready(function(){
	$('.tag--menu').click(function(e){
		e.preventDefault();
		$('.nav__left').animate({width:'toggle'},350);
		$('body').toggleClass('hidden');
	})
})