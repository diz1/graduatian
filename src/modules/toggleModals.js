import { Modal, Popups } from './modals';
import Calc from './calc';

const modal = new Modal();

export default class Modals {
	init() {
		document.addEventListener('click', this.modalsHandler);
	}
	modalsHandler(e) {
		const target = e.target;
		const popups = { ...Popups };
		let consultQuestion = '';
		const calcData = new Calc().data;
		for(let i in popups) {
			const popup = new popups[i]();
			target.classList.forEach(className => {
				if (className.startsWith(popup.popupInfo.className.slice(7))) {

					if (popup.constructor.name === 'PopupConsultation') {
						target.parentElement.addEventListener('submit', e => {
							e.preventDefault();
							consultQuestion = target.parentElement.children.user_quest;
						});
					}

					modal.create(popup);
					popup.isCreated ? popup.form.addEventListener('submit', (e) => {
						popup.modalFormHandler(e, consultQuestion, calcData);
					}) : false;
				}
			});
		}
	}
}


