export default class Calc {

	init() {
		const calcSection = document.querySelector('#accordion');
		calcSection.addEventListener('click', this.clickHandler);
		calcSection.addEventListener('change', this.changeHandler);
	}

	clickHandler(e) {
		const target = e.target;
	}

	changeHandler(e) {
		const target = e.target;
	}
}
