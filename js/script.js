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

	const modal = document.querySelector('.modal');
	function openModal() {
		document.addEventListener('click', (e) => {
			if (e.target && e.target.closest('[data-modal]')) {
				modal.classList.add('_active');
				document.body.style.overflow = 'hidden';
			}
		})
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
	openModal();
	closeModal();
});