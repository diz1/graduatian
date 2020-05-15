export default class Form {

	init() {
		[...document.forms].forEach(item => item.addEventListener('submit', this.formHandler.bind(this)));
	}

	formHandler(e) {
		e.preventDefault();
		if (!e.target.classList.contains('director-form')) {
			const formData = new FormData(e.srcElement);
			const data = {};
			formData.forEach((item, index) => data[index] = item);
			this.sendForm(data);
		}
	}

	async sendForm(formData) {
		try {
			const a = await fetch('/server.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
		} catch (e) {
			console.log(e);
		}
	}
}
