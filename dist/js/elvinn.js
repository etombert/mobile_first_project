
/* init test */

//$(function() {
// 	alert("hello world");
//});

/* sizes */

function cardGame() {

 	//var h = $(window).height() - $('.page-header').height();
 	//$("#bobags-list").css({"maxHeight": h + "px"});

    var clss = ["six", "five", "four", "three", "two", "one"];
    for(var i in clss) {
        $("main .cards").removeClass(clss[i]);
    }
    if($(window).width()>=1200)
    {
        $("main .cards").addClass("six");
    }
    else if($(window).width()>=1024)
    {
        $("main .cards").addClass("five");
    }else if($(window).width()>=900)
    {
        $("main .cards").addClass("four");
    }else if($(window).width()>=769)
    {
        $("main .cards").addClass("three");
    }else if($(window).width()>=415)
    {
        $("main .cards").addClass("two");
    }else if($(window).width()<414)
    {
        $("main .cards").addClass("one");
    }

}


function resetAllSizes() {
	cardGame();
	var bodyHeight = $('body').outerHeight();
	//var bodyWidth = $('body').outerWidth();
	var headerHeight = $('.page-header').outerHeight();
	var listHeight = bodyHeight - headerHeight - 50;
	$('#bobags-list ul').css('max-height',listHeight);
}


// trigger on window resize

window.onresize = resetAllSizes;

// trigger on load

$(function() { 
	resetAllSizes();
});



/* flipper V3 */

$(function() { 
	$('body').on('click','.flip-it', function() {
			$('.flipper-zone').addClass('flip');
			// $('.panel').addClass('de-flip');
	});
});

$(function() { 
	$('body').on('click','.de-flip', function() {
        $('.flipper-zone').removeClass('flip');
			// $('.panel').removeClass('de-flip');
	});
});

/* extension flipper */

$(function() { 
	if ($("body").hasClass("extension")) {
		$('.flipper-zone').addClass('flip');
	}
});

/* modale ajout produit */

$(function() {
	$('body').on('click','.card.add-card .add-card-link, .card.add-card .header, .card.add-card .description', function() {
			$('#mod-ajout-produit').modal('show');
	});
});

/* modale partage bobag */


$(function() {
	
		$('body').on('click', '.publish', function () {
			$('#mod-partage-bobag').modal('show');
		});
		$('body').on('mouseup', '.menu-share', function () {
			$('#mod-partage-bobag').modal('show');
		});


	/* signal de publication */

	$('body').on('mouseup','#unpublish', function() {
			$('.publish').removeClass('published');
	});
	$('body').on('mouseup','#confirm-publish', function() {
			$('.publish').addClass('published');
	});


});


/* modale abonnement */


$(function() {
	$('body').on('click','.comment, #account-check-cancel', function() {
			$('#mod-subscribe').modal('show');
	});
	$('.public').on('click','.card.add-card, .profile-link, #account-check-cancel', function() {
			$('#mod-subscribe').modal('show');
	});
});




/* name-editor demo */

$(function() {
	$('body:not(.extension)').on('focus','.bobag-name', function() {
			$(this).siblings('.submit').find('.icon').addClass('checkmark');
	});
	$('body:not(.extension)').on('blur','.bobag-name', function() {
			$(this).siblings('.submit').find('.icon').removeClass('checkmark');
	});
});

/* bobags-list popup demo */
$(function() {
	$('.bobag-group')
	  .popup({
	    popup: '#bobags-list',
	    inline     : true,
	    hoverable  : true,
	    position   : 'bottom left',
	    delay: {
	      show: 0,
	      hide: 300
	    }
	  });
});


/* sortable cards */

$(function() {
    if($('.cards').sortable)
    {
	$('main .cards').sortable({
		items: ".card:not(.add-card)",
		placeholder: "ui-state-highlight",
		containment: ".bobag",
		handle: ".image",
		tolerance: "pointer",
		sort: function() {
			var largeur = $('main .cards .ui-sortable-helper').outerWidth();
			$('.ui-sortable-placeholder').outerWidth(largeur);
		},
	});
        $('.card .image').disableSelection();
    }
	
});

/* trash a card */

$(function() {
	/* first click highlights the card */

	$('body').on('click','.trash', function() {
			$(this).parents('.card').addClass('trashable');
			/* auto-abort */
			var timeoutId = setTimeout(function(){
			$('.trashable').removeClass('trashable');
		}, 3000);
	});
	/* second click confirms trash */
	$('body').on('click','.card.trashable .trash', function() {
			$(this).parents('.card').hide('fade','slow', function(){
			$(this).parents('.card').remove();
			/* call API */
		});
	});
	/* abort */
	$('body').on('mouseleave','.card.trashable', function() {
		$(this).removeClass('trashable');
	});
});

/* accept a card */
$(function() {
	$('body').on('click','.accept-button', function() {
		$(this).parents('.card').removeClass('suggested');
		$(this).parents('.accept-buttons').fadeOut('slow', function(){
			$(this).parents('.accept-buttons').remove();
		});
	});
});

/* decline a card */
$(function() {
	/* first click highlights the card */
	$('.bobag').on('click','.decline-button', function() {
			$(this).parents('.card').addClass('trashable');
			/* auto-abort */
			var timeoutId = setTimeout(function(){
			$('.trashable').removeClass('trashable');
		}, 3000);
	});
	/* second click confirms trash */
	$('.bobag').on('click','.card.trashable .decline-button', function() {
			$(this).parents('.card').hide('fade','slow', function(){
			$(this).parents('.card').remove();
			/* call API */
		});
	});
	/* abort */
	$('.bobag').on('mouseleave','.card.trashable', function() {
		$(this).removeClass('trashable');
	});
});
/* love a card */

$(function() {
	$('body').on('click','.heart.outline', function() {
			$(this).removeClass('outline');
			$(this).addClass('loved');
	});
});
$(function() {
	$('body').on('click','.heart.loved', function() {
			$(this).removeClass('loved');
			$(this).addClass('outline');
	});
});

/* suggest a product */


$(function() {
	$('body').on('mouseup','#account-check-trigger', function() {
			$('#mod-account-check').modal({
	    closable: true,
	    scrolling : 'scrolling'
	  }).modal('show');
	});
});

/* upload trigger */

$(function() {
	$('#upload-submit').hide();
	$('.uploader-trigger').click(function(){
    $('#file-input').click();
    return false;
	});
	 $('#file-input').change(function() {
	 		$('#upload-submit').show();
      $('#uploader-form').ajaxSubmit({
             target: '#output'
      });
  });
});




/* modale details */


$(function() {
	$('body').on('mouseup','.details-trigger, .card:not(.add-card) .price, .card:not(.add-card) .header', function() {
			$('#mod-details-produit').modal({
	    closable: true,
	    scrolling : 'scrolling'
	  }).modal('show');
	});
});

/* extension details */


$(function() {
	$('#extension-cancel')
	  .popup({
	    popup: '#bobags-list',
	    inline     : true,
	    hoverable  : true,
	    position   : 'top center',
	    delay: {
	      show: 0,
	      hide: 300
	    }
	});
	$('.extension').on('mouseup','#extension-approve', function() {
		$('#ajout-produit').fadeOut('fast', function(){
			$('#added').fadeIn('fast');
		});
	});

	$('.extension').on('mouseup','#create-bobag', function() {
		$('#extension-cancel').popup('hide');
		$('#mod-create').modal({
	    closable: true,
	    scrolling : 'scrolling'
	  }).modal('show');
	});

});



/* comment details */


$(function() {
	$('body').on('mouseup','.comment.icon', function() {
		$('#mod-details-produit').modal({
	    closable: true,
	    scrolling : 'scrolling'
	  }).modal('show');
	});
});

/* toggle notes in bobag */

$(function() {
	$(".menu-items a:not('.notes-visibles')").mouseup(function(){
		$('.notes-drawer').slideDown(300, function(){
			$('.toggle-notes').addClass("notes-visibles");
			$('.toggle-notes').text("Hide notes");
		});
	});
});

$(function() {
	$('.menu-items').on('mouseup','.notes-visibles', function(){
		$('.notes-drawer').slideUp(300, function(){
			$('.toggle-notes').removeClass("notes-visibles");
			$('.toggle-notes').text("Show notes");
		});
	});
});

/* notes call for save */
$(function() {

	$('.q-note textarea').focus(function(){
		$(this).siblings('.note-updater').addClass('call-update');
	});

	/* remove on save */

	$('.bobag').on('mouseup','.call-update', function() {
		$(this).removeClass('call-update');
	});

});
/* trash a bag */

$(function() {
	/* first click highlights the card */

	$('.bobags').on('click','.trash', function() {
			$(this).parents('li').addClass('trashable');
			/* auto-abort */
			var timeoutId = setTimeout(function(){
			$('.trashable').removeClass('trashable');
		}, 3000);
	});

	/* second click confirms trash */
	$('.bobags').on('click','li.trashable .trash', function() {
			$(this).parents('li').hide('fade','slow', function(){
				$(this).parents('li').remove();
				/* call API */
		});
	});
	/* abort */
	$('.bobags').on('mouseleave','li.trashable', function() {
		$(this).removeClass('trashable');
	});
});



/* modale de changement de mot de passe */


$(function() {
	$('body').on('click','.pass-change', function() {
			$('#mod-password').modal('show');
	});
});


/* botest-help popup  */
$(function() {
	$('#mystery-test-btn')
	  .popup({
	    popup: '#botest-help',
	    inline     : true,
	    hoverable  : true,
	    position   : 'bottom center',
	    delay: {
	      show: 0,
	      hide: 300
	    }
	  });
});

/* botest simulation  */
$(function() {
	$('body').on('click','.mystery-test.sleeping', function() {
			$(this).removeClass('sleeping');
			$(this).addClass('loading');
			$(this).children('.label').html('Testing…');
			$('#mystery-test-btn').popup('reposition');
			$('#botest-help').children('.content').html('<h2>Is this website fair with me?</h2><h3>We are testing it now!</h3><div class="text-center"><div class="ui active inverted inline loader"></div></div><p>We are sending mysterious shoppers to inspect this page for you… we will notify you when we’re over.</p>');
			/* changements pour un site unfair */
			var timeoutId = setTimeout(function(){
				$('.mystery-test.loading').addClass('unfair');
				$('.mystery-test.loading').removeClass('loading');
				$('.mystery-test.unfair').children('.label').html('Unfair!');
				$('#mystery-test-btn').popup('reposition');
				$('#botest-help').addClass('unfair');
				$('#botest-help').children('.content').html('<h2>This website seems deceptive</h2><h3>This reseller displayed different prices to our mystery shoppers</h3><p>You should avoid buying this item on this website: don’t risk being showed an artificially inflated price.<p>');
			}, 2000);
	});
});


/* modale feedback beta */

$(function() {
	$('body').on('click','.beta', function() {
			$('#mod-feedback').modal('show');
	});
});


$(function() {
	$('body').on('click','.close-text', function(e) {
		$('.welcome').modal('hide');
		e.preventDefault();
	});
});
