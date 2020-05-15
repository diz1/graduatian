import Modal from './modal';

export class PopupCall extends Modal {
	constructor() {
		super();
		this.isCreated = false;
	}
	get popupInfo() { return Object.freeze({
			btnText: 'Получить расчет и скидку',
			className: '.popup-call'
		}) }
}

export class PopupDiscount extends Modal {
	constructor() {
		super();
		this.isCreated = false;
	}
	get popupInfo() { return Object.freeze({
			btnText: 'Заказать со скидкой',
			className: '.popup-discount'
		}) }
}

export class PopupCheck extends Modal {
	constructor() {
		super();
		this.isCreated = false;
	}
	get popupInfo() { return Object.freeze({
			btnText: 'Получить чек-лист и скидку',
			className: '.popup-check'
		}) }
}

export class PopupConsultation extends Modal {
	constructor() {
		super();
		this.isCreated = false;
	}
	get popupInfo() { return Object.freeze({
			btnText: 'Получить консультацию',
			className: '.popup-consultation'
		}) }
}
