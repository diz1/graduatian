export default class Accordion {

	init(sectionSelector) {
		document.querySelector(sectionSelector).addEventListener('click', this.clickHandler);
	}

	clickHandler(e) {
		const target = e.target.closest('.panel-heading');
		const panels = this.querySelectorAll('.panel-heading');
		if (target) {
			e.preventDefault();
			panels.forEach(panel => {
				if (target === panel && panel.nextElementSibling.classList.contains('in')) {
					return;
				} else if (target === panel && !panel.nextElementSibling.classList.contains('in')) {
					panel.nextElementSibling.classList.add('animated');
					panel.nextElementSibling.classList.add('fadeIn');
					panel.nextElementSibling.classList.add('in');
					return;
				}
				panel.nextElementSibling.classList.remove('in');
				// (target === panel &&
				// 	panel.nextElementSibling.classList.contains('in')) ?
				// 	false :
				// 	(target === panel && !panel.nextElementSibling.classList.contains('in')) ?
				// 		panel.nextElementSibling.classList.add('in') :
				// 		panel.nextElementSibling.classList.remove('in');
			});
		}
	}
}
