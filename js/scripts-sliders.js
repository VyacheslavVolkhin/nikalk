document.addEventListener("DOMContentLoaded", function() {

	//slider tabs
	const swiperSliderTabs = new Swiper('.slider-tabs .swiper', {
		loop: false,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.button-slider-tabs-next',
			prevEl: '.button-slider-tabs-prev',
		},
	
	});

})