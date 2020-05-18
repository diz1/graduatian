export default class Calc {

	constructor() {
		this.calcSection = document.querySelector('.constructor');
		this.result = this.calcSection.querySelector('#calc-result');
	}

	init() {
		this.calcSection.addEventListener('click', this.clickHandler.bind(this));
		this.calcSection.addEventListener('change', this.changeHandler.bind(this));
		this.secondWell = this.calcSection.querySelector('.second__well');
		this.isSingle = !!this.calcSection.querySelector('#myonoffswitch').checked;
		this.result.value = 11000;
		this.checkSecondWell();
	}

	clickHandler(e) {
		const target = e.target;
		const panels = this.calcSection.querySelectorAll('.panel');
		if (target.closest('a.construct-btn')) {
			e.preventDefault();
			panels.forEach((panel, index) => {
				if (target.closest('.panel') === panel) {
					panels[index].children[1].classList.remove('in');
					panels[index + 1].children[1].classList.add('animated');
					panels[index + 1].children[1].classList.add('fadeIn');
					panels[index + 1].children[1].classList.add('in');
				}
			});
		}
	}

	changeHandler() {
		this.checkSecondWell();
		this.calculateResult();
	}

	get data() {
		this.isSingle = !!this.calcSection.querySelector('#myonoffswitch').checked;
		this.firstWellDiameter = +this.calcSection.querySelector('#firstWellDiameter').value || 0;
		this.firstWellRings = +this.calcSection.querySelector('#firstWellRings').value || 0;
		this.secondWellRings = !this.isSingle ?
			+this.calcSection.querySelector('#secondWellRings').value : 0;
		this.secondWellDiameter = !this.isSingle ?
			+this.calcSection.querySelector('#secondWellDiameter').value : 0;
		this.bottom = !!this.calcSection.querySelector('#myonoffswitch-two').checked;
		this.distanceToHome = this.calcSection.querySelector('#distanceToHome').value || 0;
		this.calcResult = this.result.value || 0;

		return {
			isSingle: this.isSingle,
			firstWell: {
				diameter: +this.firstWellDiameter,
				ringsCount: +this.firstWellRings,
			},
			secondWell: {
				diameter: this.secondWellDiameter,
				ringsCount: this.secondWellRings,
			},
			bottom : this.bottom,
			distanceToHome: +this.distanceToHome,
			calcResult: +this.calcResult,
		};
	}

	checkSecondWell() {
		if (this.data.isSingle) {
			this.secondWell.style.display = 'none';
			return;
		}
		this.secondWell.removeAttribute('style');
	}

	calculateResult() {
		let cost = 10000;
		switch (this.data.isSingle) {
			case true:
				cost = 10000;
				break;
			case false:
				cost = 15000;
				break;
		}

		switch (this.data.firstWell.diameter) {
			case 1.4:
				cost += 0;
				break;
			case 2:
				cost += cost * 0.2;
				break;
		}

		switch (+this.data.firstWell.ringsCount) {
			case 1:
				cost += 0;
				break;
			case 2:
				cost += cost * 0.3;
				break;
			case 3:
				cost += cost * 0.5;
				break;
		}

		switch (this.data.secondWell.diameter) {
			case 1.4:
				cost += 0;
				break;
			case 2:
				cost += cost * 0.2;
				break;
		}

		switch (this.data.secondWell.ringsCount) {
			case 1:
				cost += 0;
				break;
			case 2:
				cost += cost * 0.3;
				break;
			case 3:
				cost += cost * 0.5;
				break;
		}

		if (this.data.bottom) {
			if (this.data.isSingle) {
				cost += 1000;
			} else if (!this.data.isSingle) {
				cost += 2000;
			}
		} else if (!this.data.bottom) {
			cost += 0;
		}

		//
		// if (!this.data.isSingle) {
		// 	cost += 5000;
		// }

		// if (this.data.firstWell.diameter === 2) {
		// 	cost += cost * 0.2;
		// }
		//
		// if (this.data.firstWell.ringsCount === 2) {
		// 	cost += cost * 0.3;
		// } else if (this.data.firstWell.ringsCount === 3) {
		// 	cost += cost * 0.5;
		// }

		// if (this.data.bottom) {
		// 	if (this.data.isSingle) {
		// 		cost += 1000;
		// 	} else if (!this.data.isSingle) {
		// 		cost += 2000;
		// 	}
		// }


		// console.log(cost);
		// cost += (cost * this.data.firstWell.diameter === 2 ?
		// 	0.2 :
		// 	1);
		// cost += (cost * this.data.firstWell.ringsCount === 2 ?
		// 	0.3 :
		// 	this.data.firstWell.ringsCount === 3 ?
		// 		cost * 0.5 :
		// 		1);
		//
		// console.log(cost);
		// cost += !this.data.isSingle ? 5000 : 0;
		//
		// cost+= (this.data.isSingle && this.data.bottom ?
		// 	1000 :
		// 	!this.data.isSingle && this.data.bottom ?
		// 		2000 :
		// 		0);

		this.result.value = cost;
	}
}
