import { remove, render, replace } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import {UserAction, UpdateType} from '../consts.js';
import { isEscapePush } from '../utils/utils.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPEN: 'OPEN',
};

export default class FilmPresenter {
  #filmListContainer;
  #filmCard;
  #film;
  #popup;
  #handleDataChange;
  #handleModeChange;
  #currentFilterType;
  #mode = Mode.DEFAULT;

  constructor(filmListContainer, onModeChange, onDataChange, currentFilterType) {
    this.#filmListContainer = filmListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#currentFilterType = currentFilterType;
  }

  init(film, comments) {
    this.#film = film;
    const prevFilmComponent = this.#filmCard;
    const prevPopupComponent = this.#popup;

    this.#filmCard = new FilmCardView(this.#film, this.#openPopupClickHandler(this.#film, comments), this.#handleControlsClick, this.#currentFilterType);

    if (prevFilmComponent === null) {
      render(this.#filmCard, this.#filmListContainer);
    } else {
      replace(this.#filmCard, prevFilmComponent);
    }

    if (this.#mode === Mode.OPEN) {
      this.#popup = new PopupView(comments, film, this.#closePopupClickHandler(film), this.#handleControlsClick, this.#handleDeleteClick, this.#handleAddComment);
      replace(this.#popup, prevPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this.#filmCard);
    remove(this.#popup);
  }

  reset() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closePopupClickHandler();
    }
  }

  #handleControlsClick = (updatedDetails, updateType = UpdateType.PATCH) => {
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      updateType,
      {...this.#film, userDetails: updatedDetails});
  };

  #openPopupClickHandler(film, comments) {
    this.#popup = new PopupView({
      film: film,
      comments,
      onCloseClick: () => this.#closePopupClickHandler(film),
      onControlsClick: this.#handleControlsClick,
      onDeleteClick: this.#handleDeleteClick,
      onAddComment: this.#handleAddComment
    });
    this.#appendPopup();
  }

  #appendPopup() {
    this.#handleModeChange();
    document.body.appendChild(this.#popup.element);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.OPEN;
  }

  #handleDeleteClick = (id) => {
    this.#handleDataChange(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      id
    );
  };

  #removePopup() {
    document.body.removeChild(this.#popup.element);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #closePopupClickHandler = () => {
    this.#removePopup();
  };

  #handleAddComment = (data) => {
    this.#handleDataChange(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      data
    );
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapePush(evt)) {
      evt.preventDefault();
      this.#closePopupClickHandler();
    }
  };
}
