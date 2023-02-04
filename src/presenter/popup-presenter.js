import PopupView from '../view/popup-view.js';
import { isEscPressed } from '../utils.js';

let openedPopup = null;

export default class PopupPresenter {
  #filmPopupComponent = null;
  #film = null;

  constructor({ film, onControlBtnClick, onAddComment, onDeleteComment }) {
    this.#film = film;
    this.#filmPopupComponent = new PopupView({
      film: this.#film,
      onCloseClick: this.#handleCloseClick,
      onControlBtnClick,
      onAddComment,
      onDeleteComment
    });
  }

  showPopup() {
    if (openedPopup) {
      openedPopup.closePopup();
    }
    document.body.classList.add('hide-overflow');
    document.body.appendChild(this.#filmPopupComponent.element);
    document.addEventListener('keydown', this.#closePopupKeydownHandler);
    openedPopup = this;
  }

  closePopup() {
    this.#filmPopupComponent.reset(this.#film);
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(this.#filmPopupComponent.element);
    document.removeEventListener('keydown', this.#closePopupKeydownHandler);
    openedPopup = null;
  }

  #handleCloseClick = () => {
    this.closePopup();
  };

  #closePopupKeydownHandler = (evt) => {
    if (isEscPressed(evt)) {
      this.closePopup();
    }
  };

}
