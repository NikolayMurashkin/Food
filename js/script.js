window.addEventListener('DOMContentLoaded', function () {

	// Tabs

	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {

		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', function (event) {
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});


	// Timer (teacher version)

	/*
	const deadline = '2022-03-13';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date());
		const days = Math.floor(t / (1000 * 60 * 60 * 24));
		const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((t / 1000 / 60) % 60);
		const seconds = Math.floor((t / 1000) % 60);
		return {
			'total': t,
			days,
			hours,
			minutes,
			seconds,
		};
	};

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');
		const timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadline)
	*/

	// Timer (my version)

	const deadline = '2022-06-23';
	function getEstimatedTime(endtime) {
		const t = Math.floor(Date.parse(endtime)) - Date.parse(new Date());
		return t;
	}
	function getZero(num) {
		if (num >= 0 && num < 10) {
			num = `0${num}`;
			return num;
		} else {
			return num
		};
	}
	function timer(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');
		const interval = setInterval(setClock, 1000);
		const t = getEstimatedTime(endtime);
		setClock();
		function setClock() {
			days.innerHTML = getZero(Math.floor(getEstimatedTime(endtime) / 1000 / 60 / 60 / 24));
			hours.innerHTML = getZero(Math.floor((getEstimatedTime(endtime) / 1000 / 60 / 60) % 24));
			minutes.innerHTML = getZero(Math.floor((getEstimatedTime(endtime) / 1000 / 60) % 60));
			seconds.innerHTML = getZero(Math.floor((getEstimatedTime(endtime) / 1000) % 60));
		}
		if (t <= 0) {
			clearInterval(interval)
		}
	}
	timer('.timer', deadline);

	// Modal

	/*const modal = document.querySelector('.modal');
		function modalFunc() {
			document.addEventListener('click', (e) => {
				if (e.target && e.target.closest('[data-modal]')) {
					openModal();
				}
			})
		}
		function openModal() {
			modal.classList.add('_active');
			document.body.style.overflow = 'hidden';
			clearInterval(modalTimerId);
		}
		function closeModal() {
			document.addEventListener('click', (e) => {
				if ((e.target && e.target.closest('[data-close]')) || e.target == modal) {
					modal.classList.remove('_active');
					document.body.style.overflow = '';
				}
			});
			document.addEventListener('keydown', (e) => {
				if (e.key === 'Escape' && modal.classList.contains('_active')) {
					modal.classList.remove('_active');
					document.body.style.overflow = '';
				}
			});
		}
		modalFunc();
		closeModal();
	
		const modalTimerId = setTimeout(openModal, 30000);
	
		function showModalByScroll() {
			if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
				openModal();
				window.removeEventListener('scroll', showModalByScroll);
			}
		}
		window.addEventListener('scroll', showModalByScroll);
	*/
	const modalItem = document.querySelector('.modal');
	function modal() {
		window.addEventListener('click', (e) => {
			if (e.target && e.target.closest('[data-modal]')) {
				openModal();
			}
			if ((e.target && e.target.classList.contains('modal__close')) || e.target == modalItem) {
				closeModal();
			}
		})
		window.addEventListener('keydown', (e) => {
			if (e.key == 'Escape' && modalItem.classList.contains('_active')) {
				closeModal()
			}
		})
	};
	function openModal() {
		modalItem.classList.add('_active');
		document.body.style.overflow = 'hidden';
		clearTimeout(openModalByTimer);
	};
	function closeModal() {
		modalItem.classList.remove('_active');
		document.body.style.overflow = '';
		clearTimeout(openModalByTimer);
	}
	modal();
	const openModalByTimer = setTimeout(openModal, 30000);
	function openModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', openModalByScroll);
		}
	}
	window.addEventListener('scroll', openModalByScroll);

	// Class for cards -  my version

	/*
	class MenuCard {
		constructor(image, title, text, price) {
			this.image = image;
			this.title = title;
			this.text = text;
			this.price = price;
		}

		createMenuItem() {
			const menuContainer = document.querySelector('.menu__field .container');
			const menuItem = document.createElement('div');
			const itemImg = document.createElement('img');
			const itemTitle = document.createElement('h3');
			const itemText = document.createElement('p');
			const itemDivider = document.createElement('div');
			const itemPriceBox = document.createElement('div')
			const itemPriceText = document.createElement('div');
			const itemPrice = document.createElement('div');

			menuItem.classList.add('menu__item');
			itemImg.src = this.image;
			itemTitle.classList.add('menu__item-subtitle');
			itemTitle.innerHTML = this.title;
			itemText.classList.add('menu__item-descr');
			itemText.innerHTML = this.text;
			itemDivider.classList.add('menu__item-divider');
			itemPriceBox.classList.add('menu__item-price');
			itemPriceText.classList.add('menu__item-cost');
			itemPriceText.innerHTML = 'Цена:';
			itemPrice.classList.add('menu__item-total');
			itemPrice.innerHTML = `<span>${this.price}</span> грн/день</div>`;

			menuContainer.append(menuItem);
			menuItem.append(itemImg);
			menuItem.append(itemTitle);
			menuItem.append(itemText);
			menuItem.append(itemDivider);
			menuItem.append(itemPriceBox);
			itemPriceBox.append(itemPriceText);
			itemPriceBox.append(itemPrice);

			menuContainer.append(menuItem);
		}
	}
	const menuFitnes = new MenuCard('img/tabs/vegy.jpg',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		'229');
	menuFitnes.createMenuItem();

	const menuElite = new MenuCard('img/tabs/elite.jpg',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		'550');
	menuElite.createMenuItem();

	const menuPost = new MenuCard('img/tabs/post.jpg',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		'430');
	menuPost.createMenuItem();
	*/

	// Class for cards -  teacher version

	class MenuCard {
		constructor(src, alt, title, descr, price, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.priceRub = price * 80;

		}

		createCard() {
			const menuContainer = document.querySelector('.menu__field .container');
			const menuItem = document.createElement('div');

			if (this.classes.length > 0) {
				this.classes.forEach(className => menuItem.classList.add(className))
			} else {
				menuItem.classList.add('menu__item')
			}
			menuItem.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.priceRub}</span> руб/день</div>
				</div>
			`;
			menuContainer.append(menuItem);
		}
	}

	new MenuCard('img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		10).createCard();

	new MenuCard('img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		12, 'menu__item').createCard();

	new MenuCard('img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		7, 'menu__item').createCard();

	// Forms

	/*const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с Вами свяжемся',
		failure: 'Что-то пошло не так...'
	}

	forms.forEach(item => {
		postData(item);
	})

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);
			const object = {};
			formData.forEach((value, key) => {
				object[key] = value;
			})

			fetch('server.php', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(object),

			})
				.then(data => data.text())
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => showThanksModal(message.failure))
				.finally(() => form.reset())
		})
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close" data-close>&times;</div>
			<div class="modal__title">
				${message}
			</div>
		</div>`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 3000)

	}*/

	const forms = document.querySelectorAll('form');
	forms.forEach(item => {
		postData(item);
	})
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо, мы скоро с вами свяжемся!',
		failure: 'Что-то пошло не так :('
	}
	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const responseMessage = document.createElement('img');
			responseMessage.setAttribute('src', message.loading);
			responseMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', responseMessage);

			const formData = new FormData(form);

			const object = {};
			formData.forEach((value, key) => {
				object[key] = value;
			})

			fetch('server.php', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(object)
			})
				.then(data => data.text())
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					responseMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => form.reset())
		})
	}
	function showThanksModal(message) {
		openModal();
		const modalDialog = document.querySelector('.modal__dialog');
		modalDialog.classList.add('hide');

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>
				<div class="modal__title">${message}</div>
			</div>`;
		modalItem.append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			modalDialog.classList.add('show');
			modalDialog.classList.remove('hide');
			closeModal();
		}, 3000);

	}

});