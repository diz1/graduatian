export default class Discount {

	init() {
		document.querySelector('.sentence').addEventListener('click', this.clickHandler);
	}

	clickHandler(e) {
		const target = e.target;
		const cards = [...this.querySelector('.row').children];
		if (target.matches('.add-sentence-btn')) {
			e.preventDefault();
			cards.filter(card => card.classList.contains('hidden'))
				.forEach(card => {
					if (card.classList.contains('visible-sm-block')) { card.classList.remove('visible-sm-block'); }
					card.classList.remove('hidden');
					target.classList.add('hidden');
					document.documentElement.scrollTop+= 1;
					document.documentElement.scrollTop-= 1;
				});
		}
	}

}
