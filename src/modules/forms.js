export default class Form {

	constructor(cooldown = 3) {
		this.lastClick = 0;
		this._cooldown = cooldown;
	}

	init() {
		[...document.forms].forEach(item => {
			item.addEventListener('submit', this.formHandler.bind(this));
			item.addEventListener('input', this.inputHandler);
			[...item.children].forEach(i => {
				if (i.classList.contains('phone-user')) {
					this.maskPhone('.phone-user');
				}
			});
		});
		document.getElementById('distanceToHome').addEventListener('input', e => {
			const target = e.target;
			target.value = target.value.replace( /[^1-9]/gi,'');
		});
	}

	inputHandler(e) {
		const target = e.target;
		const regExp = /[^А-Яа-яЁ-ё\s\-]/gi;

		if (target.classList.contains('name-user')) {
			target.value = target.value.replace(regExp, '').replace(/[\s][\-]/gi, ' ');
		}
	}

	formHandler (e) {
		e.preventDefault();
		if (this.isDblClick(e)) {
			return;
		}
		if (!e.target.classList.contains('director-form')) {
			const formData = new FormData(e.srcElement);
			const data = {};
			formData.forEach((item, index) => data[index] = item);
			this.postForm(e, data);
		}
	}

	maskPhone(selector, masked = '+7 (___) ___-__-__') {
		const elms = document.querySelectorAll(selector);

		function mask(event) {
			const keyCode = event.keyCode;
			const template = masked,
				def = template.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, "");
			let i = 0,
				newValue = template.replace(/[_\d]/g, a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
			i = newValue.indexOf("_");
			if (i != -1) {
				newValue = newValue.slice(0, i);
			}
			let reg = template.substr(0, this.value.length).replace(/_+/g,
				a => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
				this.value = newValue;
			}
			if (event.type == "blur" && this.value.length < 5) {
				this.value = "";
			}
		}
		elms.forEach(elem => {
			elem.addEventListener("input", mask);
			elem.addEventListener("focus", mask);
			elem.addEventListener("blur", mask);
		});
	}

	isDblClick (e) {
		if (e.timeStamp - this.lastClick < this.cooldown + 1000) {
			return true;
		}
		this.lastClick = e.timeStamp;
		return false;
	}

	async postForm (e, formData) {
		try {
			const loader = this.loader();
			const button = e.submitter;
			const buttonText = button.textContent;
			let timeout = null;
			button.textContent = null;
			loader.insert(button);

			const status = (await fetch('/server.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})).status;

			if (button.textContent !== buttonText) {
				loader.remove(button);
				timeout = setTimeout(() => {
					button.textContent = buttonText;
				}, this.cooldown);
			}

			if (status !== 200) {
				button.textContent = 'Ошибка запроса';
				return false;
			}
			button.textContent = 'Мы скоро с вами свяжемся! Ожидайте!';
			return true;
		} catch (e) {
			throw new Error(e);
		}
	}

	loader () {
		const template = `
			<div class="sk-three-bounce">
				<div class="sk-bounce-1 sk-child"></div>
				<div class="sk-bounce-2 sk-child"></div>
				<div class="sk-bounce-3 sk-child"></div>
			</div>`;

		return {
			insert: (el) => {
				el.insertAdjacentHTML('beforeend', template);
			},
			remove: (el) => {
				el.querySelector('.sk-three-bounce').remove();
			}
		};
	}

	get cooldown () {
		return this._cooldown * 1000;
	}
}
