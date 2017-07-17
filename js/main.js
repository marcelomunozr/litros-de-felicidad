
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar.navbar-custom").addClass("top-nav-collapse");
    } else {
        $(".navbar.navbar-custom").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);


$(function() {
    'use strict';
    /*Page scroll*/
    $('a.page-scroll, .menu-item a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });


    /*Sticky footer*/
    var footer = $('footer');
    var pos = footer.position();
    var height = $(window).height();
    height = height - pos.top;
    height = height - footer.height()  ;
    if (height > 0) {
        footer.css({
            'margin-top': height + 'px'
        });
    }

    /*Carrusel Como Participar*/
    $('.participate-loop').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    dots: true,
                    swipe: true,
                    slidesToShow: 1
                }
            }
        ]
    });
    /*Carrusel Catálogo*/
    $('.loop').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 5,
        focusOnSelect: true,
        prevArrow: $('.preview'),
        nextArrow: $('.nextview'),
        autoplay: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '10px',
                    dots: true,
                    swipe: true,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '10px',
                    dots: true,
                    swipe: true,
                    slidesToShow: 1
                }
            }
        ]
    });
    /*Carrusel Promotions*/
    $('.promotions-loop').slick({
        centerMode: true,
        centerPadding: '1px',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '10px',
                    dots: true,
                    swipe: true,
                    slidesToShow: 1
                }
            }
        ]
    });
    /*Carrusel Noticias*/
    $('.notices-loop').slick({
        centerMode: true,
        centerPadding: '1px',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '10px',
                    dots: true,
                    swipe: true,
                    slidesToShow: 1
                }
            }
        ]
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});


$(window).load(function(){
    'use strict';
    /*IGUALAR ALTOS*/
    var H = 0;
    $(".cols-catalog").each(function(i){
        var h = $(".cols-catalog").eq(i).height();
        if(h > H) H = h;
    });
    $(".cols-catalog").height(H);

    /*IGUALAR ALTOS 2*/
    var H2 = 0;
    $(".item-catalogo").each(function(i){
        var h2 = $(".item-catalogo").eq(i).height();
        if(h2 > H2) H2 = h2;
    });
    $(".item-catalogo").height(H2);
});

$(document).ready(function(){
	$('body').on('click', '.btn-canje', function(e){
		var boton = $(this);
		var original = boton.text();
		boton.attr("disabled", true);
		boton.text("Procesando su canje...");
		setTimeout(function(){
			boton.attr("disabled", false);
			boton.text(original);
		}, 7000);
	});
	
	$('body').on('click', '.btn-confirma', function(e){
		var boton = $(this);
		var original = boton.text();
		boton.attr("disabled", true);
		boton.text("Procesando su canje...");
		boton.parents('form').submit();
		setTimeout(function(){
			boton.attr("disabled", false);
			boton.text(original);
		}, 7000);
		return true;
	});
	
	$('body').on('submit', '#CustomCanjeForm', function(e){
		var form = $(this);
		var litros = $(this).find('input[name="ValorCanje"]').val();
		var boton = $(this).find('button');
		if(litros != ''){
			var original = boton.text();
			boton.attr("disabled", true);
			boton.text("Procesando su canje...");
			setTimeout(function(){
				boton.attr("disabled", false);
				boton.text(original);
			}, 7000);
			return true;
		}else{
			return false;
		}
		e.preventDefault();
	});
	
	$('body').on('click', '.img-selector', function(e){
		e.preventDefault();
		$(this).parents('form').find('input[name="image_file"]').click();
	});
	
	$('body').on('change', 'input[name="image_file"]', function(e){
		e.preventDefault();
		var cambio = $(this).val();
		console.log("Cambio la imagen", cambio);
		if(cambio != ''){
			$(".btn-upload").show();
			if (typeof (FileReader) != "undefined") {
				var image_holder = $(".img-flow.img-selector");
				image_holder.empty();
				var reader = new FileReader();
				reader.onload = function (e) {
					$("<img />", {
						"src": e.target.result,
						"class": "img-responsive"
					}).appendTo(image_holder);
				}
            	image_holder.show();
				reader.readAsDataURL($(this)[0].files[0]);
	        } else {
				alert("Se ha cargado su imagen correctamente, debe guardar el cambio.");
			}
		}
	});
	
	$('body').on('click', '#SubirImagen', function(e){
		$('.img-form input[name="image_file"]').click();
	});
	
	$('body').on('submit', '.img-form', function(e){
		var archivo = $('.img-form input[name="image_file"]').val();
		if(archivo == ''){
			$('.img-form input[name="image_file"]').click();
			$('.img-form .alert')
				.html('<p>Debe subir una imágen para actualizar</p>')
				.show(200, function(){
					setTimeout(function(){
						$('.img-form .alert').hide();
					}, 10000)
				});
			return false;
		}
		
	});
	
	$('body').on('change', '.filters-zone .lista-filtros', function(e){
		e.preventDefault();
		var slug = $(this).data('slug');
		if($(this).is(':checked')){
			$('.item-catalogo').each(function(){
				var categoria = $(this).data('catslug');
				var categorias = categoria.split(" ");
				var esto = $(this);
				if(categorias.indexOf(slug) > -1){
					esto.fadeIn(200);
				}
			});	
		}else{
			$('.item-catalogo').each(function(){
				var categoria = $(this).data('catslug');
				var categorias = categoria.split(" ");
				var esto = $(this);
				if(categorias.indexOf(slug) > -1){
					esto.fadeOut(200);
				}
			});
		}
	});
});
