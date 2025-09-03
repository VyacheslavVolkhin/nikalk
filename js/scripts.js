document.addEventListener("DOMContentLoaded", function() {


	//table popups
	document.addEventListener('click', function (e) {
  // Открыть
  const openBtn = e.target.closest('.td-btn-action');
  if (openBtn) {
    const cell = openBtn.closest('td');
    const popup = cell && cell.querySelector('.popup-inner-box');
    if (popup) {
      // Закрыть остальные
      document.querySelectorAll('.popup-inner-box.active').forEach(p => {
        if (p !== popup) p.classList.remove('active');
      });

      popup.classList.add('active');
      document.body.classList.add('popup-open');
      popup.removeAttribute('hidden');

      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  // Закрыть по кнопке
  const closeBtn = e.target.closest('.td-btn-action-close');
  if (closeBtn) {
    const popup = closeBtn.closest('.popup-inner-box');
    if (popup) {
      popup.classList.remove('active');
      document.body.classList.remove('popup-open');
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  // Закрыть по клику вне .popup-box, но внутри .popup-inner-box
  const popup = e.target.closest('.popup-inner-box');
  if (popup && popup.classList.contains('active')) {
    const insideBox = e.target.closest('.popup-box');
    if (!insideBox) {
      popup.classList.remove('active');
      document.body.classList.remove('popup-open');
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  // Клик вообще вне попапов и кнопок — закрыть
  const isClickInsidePopup = e.target.closest('.popup-inner-box');
  const isClickOnOpenBtn = e.target.closest('.td-btn-action');
  if (document.body.classList.contains('popup-open') && !isClickInsidePopup && !isClickOnOpenBtn) {
    document.querySelectorAll('.popup-inner-box.active').forEach(p => p.classList.remove('active'));
    document.body.classList.remove('popup-open');
  }
});

// Esc — закрыть
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const opened = document.querySelectorAll('.popup-inner-box.active');
    if (opened.length) {
      opened.forEach(p => p.classList.remove('active'));
      document.body.classList.remove('popup-open');
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }
});


	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
	});


	//menu toggle
	const menuToggleButton = document.querySelector('.js-btn-popup-menu');
	menuToggleButton.addEventListener('click', function(e) {
		document.body.classList.toggle('menu-active');
		e.preventDefault()
	})

	//menu toggle width
	const menuToggleButtonWidth = document.querySelector('.js-btn-menu-toggle-width');
	menuToggleButtonWidth.addEventListener('click', function(e) {
		document.body.classList.toggle('menu-hide');
		e.preventDefault()
	})


	//tr action toggle
	let trActions = document.querySelectorAll('.js-tr-action .td-title-button')
	trActions.forEach(function(trAction) {
		trAction.addEventListener('click', function() {
			this.closest('.js-tr-action').classList.toggle('open')
		})
	})


	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')
	const wrapWidth = document.querySelector('.wrap').offsetWidth
	const bodyElem = document.querySelector('body')
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('filter-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (window.innerWidth < 1024) {
				if (!element.closest('.no-close-mobile') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}

			} else {
				if (!element.closest('.no-close')) {
					element.classList.remove('active')
				}
			}
			
		})
	}
	function popupElementsContentPositionClass() {
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box')

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
	element.addEventListener("click", function (e) {
		document.querySelector(".popup-outer-box").classList.remove("active");
		document.body.classList.add("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}

		popupCurrent = this.getAttribute("data-popup");
		document
		.querySelector(
			`.popup-outer-box[id="${popupCurrent}"
			]`
		)
		.classList.add("active");

		e.preventDefault();
		e.stopPropagation();
		return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
	element.addEventListener("click", function (event) {
		document.body.classList.remove("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}
		event.preventDefault();
		event.stopPropagation();
		});
	});
	document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	element.addEventListener("click", function (event) {
		if (!event.target.closest(".popup-box")) {
		document.body.classList.remove("popup-open");
		document.body.classList.remove("popup-open-scroll");
		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
			e.classList.remove("active");
				});
		return false;
			}
		});
	});

	//field-select checkboxes
	const buttonSelects = document.querySelectorAll('.js-field-button-select');
	
	function updateButtonTitle(button) {
		const checkboxes = button.closest('.js-field-select').querySelectorAll('.frm-select input[type="radio"]');
		const selectedTexts = Array.from(checkboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.nextElementSibling.textContent);
		
		const buttonTitle = button.querySelector('.button-title');
		buttonTitle.textContent = selectedTexts.length > 0 ? selectedTexts.join(', ') : buttonTitle.dataset.placeholder;
	
		if (selectedTexts.length > 0) {
			button.setAttribute('data-count', selectedTexts.length);
		} else {
			button.removeAttribute('data-count');
		}
	}
	
	buttonSelects.forEach(button => {
		updateButtonTitle(button);
		button.addEventListener('click', function (e) {
			e.preventDefault();
			buttonSelects.forEach(otherButton => {
				if (otherButton !== button) {
					otherButton.classList.remove('active');
				}
			});
			if (this.classList.contains('active')) {
				button.classList.remove('active');
			} else {
				button.classList.add('active');
			}
			updateButtonTitle(this);
		});
		
		const checkboxes = button.closest('.js-field-select').querySelectorAll('.frm-select input[type="radio"]');
		checkboxes.forEach(checkbox => {
			checkbox.addEventListener('change', function () {
				updateButtonTitle(button);
			});
		});
	});
	
	document.addEventListener('click', function (e) {
		if (!e.target.closest('.js-field-select')) {
			buttonSelects.forEach(button => {
				if (button.classList.contains('active')) {
					button.classList.remove('active');
				}
			});
		}
	});
	
	document.addEventListener('click', function (e) {
		if (!e.target.closest('.js-field-select')) {
			buttonSelects.forEach(button => {
				button.classList.remove('active');
			});
		}
	});


})