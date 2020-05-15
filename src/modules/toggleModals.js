import { Modal, Popups } from './modals';

const modal = new Modal();

export default class Modals {
	init() {
		document.addEventListener('click', this.modalsHandler);
	}
	modalsHandler(e) {
		const target = e.target;
		const popups = {...Popups};
		for(let i in popups) {
			let k = new popups[i]();
			target.classList.forEach(className => {
				if (className.startsWith(k.popupInfo.className.slice(7))) {
					modal.create(k);
					k.isCreated = true;
				}
			})
		}
	}
}


