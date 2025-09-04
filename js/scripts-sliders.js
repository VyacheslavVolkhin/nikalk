document.querySelectorAll('.slider-inner-wrap.slider-tabs').forEach(function(wrap){
	//slider tabs
    const swiperEl = wrap.querySelector('.swiper');
    const nextEl = wrap.querySelector('.button-slider-tabs-next');
    const prevEl = wrap.querySelector('.button-slider-tabs-prev');

    const swiper = new Swiper(swiperEl, {
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 0,
        autoHeight: true,
        speed: 400,
        pagination: false,
        autoplay: false,
        navigation: {
            nextEl: nextEl,
            prevEl: prevEl,
        },
    });

});
