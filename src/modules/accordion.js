export default class Accordion {

	init(sectionSelector) {
		this.block = document.querySelector(sectionSelector);
		this.block.addEventListener('click', this.clickHandler.bind(this));
	}

	clickHandler(e) {
		const target = e.target;
		const targetPanel = target.closest('.panel-heading');
		const panelsHeading = this.block.querySelectorAll('.panel-heading');
		if (targetPanel) {
			this.headersHandle(e, targetPanel, panelsHeading);
		}
	}

	headersHandle(e, targetPanel, panelsHeading) {
		e.preventDefault();
		panelsHeading.forEach(panel => {
			if (targetPanel === panel && panel.nextElementSibling.classList.contains('in')) {
				return;
			} else if (targetPanel === panel && !panel.nextElementSibling.classList.contains('in')) {
				panel.nextElementSibling.classList.add('animated');
				panel.nextElementSibling.classList.add('fadeIn');
				panel.nextElementSibling.classList.add('in');
				return;
			}
			panel.nextElementSibling.classList.remove('in');
		});
	}
}
