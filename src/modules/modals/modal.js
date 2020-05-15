export default class Modal {

	create(modal) {
		document.body.insertAdjacentHTML('beforeend', modal.template);
		modal.node.style.display = 'block';
		document.body.style.overflowY = 'hidden';
		modal.node.addEventListener('click', this.clickHandler.bind(modal));
	}

	destroy(modal) {
		if (modal.node) {
			modal.isCreated = false;
			modal.node.removeEventListener('click', this.clickHandler);
			modal.node.style.display = 'none';
			document.body.removeChild(modal.node);
		}
		document.body.removeAttribute('style');
	}

	clickHandler(e)  {
		const target = e.target;

		// TODO Сделать валидацию форм в модальных окнах

		if (target.matches(Modal.prototype.closeBtn.className) || target.matches(this.popupInfo.className)) {
			this.destroy(this);
		}
	}

	get template() { return `
		<div class="${this.popupInfo.className.slice(1)} popup">
			<div class="popup-dialog">
			    <div class="popup-content">
			        <!-- <div class="popup-form"> -->
			        <form class="capture-form text-center">
			            <span class="circle"><button class="popup-close" type="button">&times;</button></span>
			            <label for="name_1">Как к вам обращаться</label>
			            <input type="text" id="name_1" name="user_name" placeholder="Ваше имя" required>
			            <label for="phone_1">Ваш телефон для получения скидки</label>
			            <input class="phone-user" type="text" id="phone_1" name="user_phone" placeholder="+7(___)___-__-__"
			                   required>
			            <button class="button capture-form-btn" name="submit" type="submit">${this.popupInfo.btnText}</button>
			            <p class="small">Вы получите расчет стоимости с учетом выбора <br>подходящего объема септика. типа
			                грунта, <br> расположения объектов на участке, уровня грунтовых <br> вод, типа фундамента дома и еще
			                7 параметров</p>
			        </form>
			        <!-- </div> -->
			    </div>
			</div>
		</div>
	`}

	get closeBtn() {
		return Object.freeze({
			tagName: 'button',
			className: '.popup-close',
		})
	}

	get node() { return document.querySelector(this.popupInfo.className) }


}
