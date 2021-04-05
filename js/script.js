 //////!!!!! УНИВЕРСАЛЬНАЯ Функция отправки события для разных сервисов
function goToEvent(eventName, arParam){
	console.log('EVENT_NAME: "' + eventName + '"');
    try{
    	if(eventName == 'Lead' || eventName == 'PageView'){
    		fbq('track', eventName);
    	}else{
    		fbq('trackCustom', eventName, arParam);
    	}
		
    }catch(e){
		console.log('EVENT_FACEBOOK_ERROR: "' + eventName + '"');
	}

    try{
        roistat.event.send(eventName);
    }catch(e){
        console.log('EVENT_ROISTAT_ERROR:"' + eventName + '"');
    }
    try{
        ga('send', 'event', 'leadform', eventName);
    }catch(e){
        console.log('EVENT_GOOGLE_ERROR:"' + eventName + '"');
    }
    try{
        yaCounter49360516.reachGoal(eventName);
    }catch(e){
        console.log('EVENT_YANDEX_ERROR: "' + eventName + '"');
    }
}

//calltouch send
/*jQuery(document).on('click', 'div.js-send-lead-form-button', function() {
    var m = jQuery(this).closest('.leadia_widget_body');
        var fio = m.find('input[data-form-field="first_last_name"]').val();
        var phone = m.find('input[data-form-field="phone"]').val();
        var ct_site_id = '31432';
        var sub = 'Заявка Venyoo';
        var ct_data = {           
        fio: fio,
        phoneNumber: phone,
        subject: sub,
        sessionId: window.call_value
        };
        if (!!phone){
        jQuery.ajax({
          url: 'https://api-node11.calltouch.ru/calls-service/RestAPI/requests/'+ct_site_id+'/register/',
          dataType: 'json', type: 'POST', data: ct_data, async: false
        });

    }
})*/

$(document).ready(function() {

  	$(":input").inputmask();
  	$('input[name=phone]').inputmask({"mask": "+7 (999) 999-99-99"})

	$('.slider').slick({
		autoplay: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
 		slidesToScroll: 1,
		dots: true,
		prevArrow:'<svg class="prev" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 21 41" enable-background="new 0 0 21 41"><polygon points="20.3,40.8 0,20.5 20.3,0.2 21,0.9 1.3,20.5 21,40.1 "></polygon></svg>',
		nextArrow:'<svg class="next" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 21 41" enable-background="new 0 0 21 41"><polygon points="20.3,40.8 0,20.5 20.3,0.2 21,0.9 1.3,20.5 21,40.1 "></polygon></svg>',
	});
//when the slick slide initializes we want to set all of our slides to the same height
$('.slick-slider').on('setPosition', function () {
	jbResizeSlider();
});

//we need to maintain a set height when a resize event occurs.
//Some events will through a resize trigger: $(window).trigger('resize');
$(window).on('resize', function(e) {
	jbResizeSlider();
});

//since multiple events can trigger a slider adjustment, we will control that adjustment here
function jbResizeSlider(){
	$slickSlider = $('.slick-slider');
	$slickSlider.find('.slick-slide').height('auto');

	var slickTrack = $slickSlider.find('.slick-track');
	var slickTrackHeight = $(slickTrack).height();

	$slickSlider.find('.slick-slide').css('height', slickTrackHeight + 'px');
}
	$('data-fancybox').fancybox({
		animationEffect: "fade",
	});
	
	$(".main-content .video-block .block").hover(
		function() {
			$(this).find("video").get(0).play();
			$(this).find('.image').animate({opacity: 0}, 1000);;
		}, function() {
			$(this).find('.image').animate({opacity: 1}, 1000);;
			$(this).find("video").get(0).pause();
			$(this).find("video").get(0).currentTime = 0;
		}
	);
	
	$('.hamburger').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		$("header .menu > ul").animate({width: "toggle"});
		$('body').toggleClass('index');
		$(this).toggleClass('is-active');
	});
	
	var mql = window.matchMedia('all and (max-width: 768px)');
	if (mql.matches) {
		$('a.scroll').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('.hamburger').click();
					$('html,body').animate({
					scrollTop: target.offset().top -0
				}, 1000);
					return false;
				}
			}
		});
	
	
		$('html, body').hide();

		if (window.location.hash) {
			setTimeout(function() {
				$('html, body').scrollTop(0).show();
				$('html, body').animate({
					scrollTop: $(window.location.hash).offset().top -0
					}, 1000)
			}, 0);
		}
		else {
			$('html, body').show();
		}
	} else {
		$('a.scroll').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('.hamburger').click();
					$('html,body').animate({
					scrollTop: target.offset().top -80
				}, 1000);
					return false;
				}
			}
		});
	
	
		$('html, body').hide();

		if (window.location.hash) {
			setTimeout(function() {
				$('html, body').scrollTop(0).show();
				$('html, body').animate({
					scrollTop: $(window.location.hash).offset().top -80
					}, 1000)
			}, 0);
		}
		else {
			$('html, body').show();
		}
	}
	
	$('form').submit(function(){
		sendForm($(this).attr('id'));
		var yatarget = $(this).data('yatarget');
		goToEvent(yatarget);
	})
	
	function sendForm(formId) {
		var form = $('form#' + formId);
		var msg  = form.serialize();
		var required = form.find('[required="true"]');
		var error = false;
		
		let urlRedirect;
		
		if ( window.location.href.includes('/en/') ) { urlRedirect = 'https://mishkafilms.ru/en/thanks.html'; }
		else { urlRedirect = 'https://mishkafilms.ru/thanks.html'; }
		
		for(var i = 0; i <= (required.length - 1);i++){
		    if(required[i].value == ''){required[i].style.borderColor = 'rgba(255, 0, 0, 1)';error = true;}
		}
		if (error){
		    return false;
		} else {
			$.ajax({
				type: 'POST',
				url: 'send.php',
				data: msg,
				success: function(data) {
					console.log('REQUEST_DATA: ');
					console.log(data);
					form.parents().find('.sending').addClass('active');
					setTimeout(function(){
						form.parents().find('.sending').removeClass('active');
					}, 5000)
					$(form).trigger("reset");
					$(form).hide();
					$('.alert1').hide();
					$('.alert2').show();
					$('.alert2').parent('.form-name').parent('.video').addClass('active');
					location.href = urlRedirect;
				},
				error: function(xhr, str){
				    form.html('Возникла ошибка: ' + xhr.responseCode);
				}
			});
		}
	}
});
 