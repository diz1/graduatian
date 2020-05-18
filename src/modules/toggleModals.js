import { Modal, Popups } from './modals';
import Calc from './calc';
import Form from "./forms";

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
					let form = null;
					if (popup.isCreated) {
						form = new Form(3);

						form.maskPhone('.phone-user');
						popup.node.addEventListener('input', e => {
							form.inputHandler(e, popup);
						});
					} else {
						popup.removeEventListener('input', () => {});
						form = null;
					}
					popup.isCreated ? popup.form.addEventListener('submit', (e) => {
						if (popup.modalFormHandler(e, consultQuestion, calcData, form)) {
							let timeout = setTimeout(() => {
								modal.destroy(popup);
								clearTimeout(timeout);
								timeout = null;
							}, 4000);
						}
					}) : false;
				}
			});
		}
	}
}


