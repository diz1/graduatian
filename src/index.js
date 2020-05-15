'use strict';

// Polyfills
import "@babel/polyfill";
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
// import Calc from './modules/calc';

document.addEventListener('DOMContentLoaded', () => {

	// Инициализация WOW.js
	new WOW().init();

	// Инициализация и обработка модальных окон
	new Modals().init();

	// Обработка форм
	new Form().init();

	// Конструктор-калькулятор
	// new Calc().init();

	// Кнопка "больше" в блоке с акциями
	new Discount().init();

	// Аккордион
	new Accordion().init('#accordion');
	new Accordion().init('#accordion-two');
});
