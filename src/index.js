// Styles
import './assets/animate.min.css';
import './assets/ajax.scss';

// Polyfills
import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'mdn-polyfills/Node.prototype.append';
elementClosest(window);

// Vendors
import WOW from 'wow.js';

// Modules
import Modals from './modules/toggleModals';
import Form from './modules/forms';
import Accordion from './modules/accordion';
import Discount from './modules/discount';
import Calc from './modules/calc';

document.addEventListener('DOMContentLoaded', () => {

	// Инициализация WOW.js
	new WOW().init();
	try {
		// Инициализация и обработка модальных окон
		new Modals().init();
	} catch (e) {
		console.log(e);
	}

	try {
		// Обработка форм
		new Form(3).init();
	} catch (e) {
		console.log(e);
	}

	try {
		// Конструктор-калькулятор
		new Calc().init();
	} catch (e) {
		console.log(e);
	}

	try {
		// Кнопка "больше" в блоке с акциями
		new Discount().init();
	} catch (e) {
		console.log(e);
	}

	try {
		// Аккордион
		new Accordion().init('.constructor');
		new Accordion().init('.questions');
	} catch (e) {
		console.log(e);
	}
});
