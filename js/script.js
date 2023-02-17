document.addEventListener('DOMContentLoaded', function () {
	// бургер меню
	var burgerMenu = document.getElementById('burger-menu');
	var overlay = document.getElementById('menu-burger-hidden');
	burgerMenu.addEventListener('click', function () {
		this.classList.toggle('close');
		overlay.classList.toggle('overlay');
	});
	//клик в не бургера
	document.getElementById('menu-burger-hidden').onclick = function () {
		document.getElementById('menu-burger-hidden').classList.toggle('overlay');
		document.getElementById('burger-menu').classList.toggle('close');
	};
	//отключаем скролл при открытие бургера
	function onClick(event) {
		document.body.classList.toggle('over');
	}
	burgerMenu.addEventListener('click', onClick);
	overlay.addEventListener('click', onClick);


});
// маска номер телефона форм
window.addEventListener('DOMContentLoaded', function () {
	[].forEach.call(document.querySelectorAll('.phone-form'), function (input) {
		var keyCode;
		function mask(event) {
			event.keyCode && (keyCode = event.keyCode);
			var pos = this.selectionStart;
			if (pos < 3) event.preventDefault();
			var matrix = '+7 (___) ___ ____',
				i = 0,
				def = matrix.replace(/\D/g, ''),
				val = this.value.replace(/\D/g, ''),
				new_value = matrix.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
				});
			i = new_value.indexOf('_');
			if (i != -1) {
				i < 5 && (i = 3);
				new_value = new_value.slice(0, i);
			}
			var reg = matrix
				.substr(0, this.value.length)
				.replace(/_+/g, function (a) {
					return '\\d{1,' + a.length + '}';
				})
				.replace(/[+()]/g, '\\$&');
			reg = new RegExp('^' + reg + '$');
			if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) this.value = new_value;
			if (event.type == 'blur' && this.value.length < 5) this.value = '';
		}

		input.addEventListener('input', mask, false);
		input.addEventListener('focus', mask, false);
		input.addEventListener('blur', mask, false);
		input.addEventListener('keydown', mask, false);
	});
	// слайдер наши работы
	const swiper = new Swiper('.portfolio-block', {
		direction: 'horizontal',
		loop: true,
		slidesPerView: 4,
		spaceBetween: 40,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
		},
		breakpoints: {
			1590: {
				slidesPerView: 4,
				spaceBetween: 40,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			991: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			767: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			571: {
				slidesPerView: 1.5,
				spaceBetween: 10,
			},
			400: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
			0: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
		},
	});
	//слайдер отзывы
	const swiperReviews = new Swiper('.reviews-block', {
		direction: 'horizontal',
		loop: true,
		slidesPerView: 2.73,
		spaceBetween: 60,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			1591: {
				slidesPerView: 2.73,
				spaceBetween: 60,
			},
			1301: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			991: {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			0: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
		},
	});

	//форма обратного звонка
	let open_modal = document.querySelectorAll('.btn-modal-callback');
	let close_modal = document.getElementById('close_modal');
	let modal = document.getElementById('modal');
	let body = document.getElementsByTagName('body')[0];
	for (let i = 0; i < open_modal.length; i++) {
		open_modal[i].onclick = function () {
			// клик на открытие
			modal.classList.add('show-modal-callback'); // добавляем видимость окна
			body.classList.add('body_block'); // убираем прокрутку
		};
	}
	function windowOnClick(event) {
		if (event.target === modal) {
			toggleModal();
		}
	}
	function toggleModal() {
		modal.classList.toggle('show-modal-callback');
	}
	close_modal.onclick = function () {
		// клик на закрытие
		window.setTimeout(function () {
			// удаляем окно через полсекунды (чтобы увидеть эффект закрытия).
			modal.classList.remove('show-modal-callback');
			body.classList.remove('body_block'); // возвращаем прокрутку
		}, 0);
	};
	close_modal.addEventListener('click', toggleModal);
	window.addEventListener('click', windowOnClick);
});
//анимация при скролле
function reveal() {
	var reveals = document.querySelectorAll('._anim-items'); //класс который анимирует объект

	for (var i = 0; i < reveals.length; i++) {
		var windowHeight = window.innerHeight;
		var elementTop = reveals[i].getBoundingClientRect().top;
		var elementVisible = 10; //высота при которой срабатывает анимация

		if (elementTop < windowHeight - elementVisible) {
			reveals[i].classList.add('_active');
		} else {
			reveals[i].classList.remove('_active');
		}
	}
	return false;
}

window.addEventListener('scroll', reveal);

//плавный скрол до якоря по общему классу
const anchors = document.querySelectorAll('a.scroll-to');

for (let anchor of anchors) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		const blockID = anchor.getAttribute('href');

		document.querySelector(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	});
}
//обработчик формы
(function (d) {
	d.addEventListener('DOMContentLoaded', function() {
		let jsForms = d.querySelectorAll('.js-send-form');
		if (jsForms.length > 0) {
			jsForms.forEach(form => {
				form.addEventListener('submit', function(e) {
					e.preventDefault();
					let resp = d.querySelector('.form-callback-group.response');
					resp.classList.remove('success', 'error', 'info');
					resp.innerHTML = '';
					fetch('ajax/sendmail.php', {
						method: 'POST',
						body: new FormData(this)
					})
					.then(response => {return response.json()})
					.then(data => {
						if (data.status == 'success') {
							this.reset();
						}
						resp.classList.add(data.status);
						resp.innerHTML = data.text;
						ym(90273740,'reachGoal','promo-form-submit');
					});
					
				});
			});
		}
	});
}(document));