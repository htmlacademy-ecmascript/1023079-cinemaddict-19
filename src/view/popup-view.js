import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { createPopupTemplate } from './popup-view.template.js';
import { COMMENTS_EMOTIONS } from '../consts.js';
import { isEnterPush } from '../utils/utils';

const DEFAULT_COMMENT_EMOJI = COMMENTS_EMOTIONS[0];

export default class PopupView extends AbstractStatefulView {

  #film;
  #comments;
  #handleAddComment;
  #handleDeleteClick;
  #handleCloseClick;
  #handleControlsClick;

  constructor (comments, film, onCloseButtonClick, onControlsClick, onDeleteClick, onAddComment) {
    super();
    this.#film = film;
    this.#comments = comments;
    this._setState ({
      emotion: null,
      comment: '',
      scrollTop: 0
    });

    this.#handleCloseClick = onCloseButtonClick;
    this.#handleControlsClick = onControlsClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleAddComment = onAddComment;

    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#handleCloseClick);
    this.element.querySelector('.film-details__controls').addEventListener('click', this.#controlsClickHandler);
    this.element.querySelectorAll('.film-details__comment-delete').forEach((button) => button.addEventListener('click', this.#commentDeleteClickHandler));

    this.#putHandlers();
  }

  _restoreHandlers() {
    this.#putHandlers();
  }

  get template() {
    return createPopupTemplate(this.#film, this.#comments, this._state);
  }

  get filmComments() {
    const commentsSet = new Set(this.#film.comments);
    return this.#comments.filter((comment) => commentsSet.has(comment.id));
  }

  #controlsClickHandler = (evt) => {
    let updatedDetails = this.#film;

    switch (evt.target.id) {
      case 'watchlist':
        updatedDetails = { ...updatedDetails, watchlist: !this.#film.isAdded };
        break;
      case 'watched':
        updatedDetails = { ...updatedDetails, alreadyWatched: !this.#film.isWatched };
        break;
      case 'favorite':
        updatedDetails = { ...updatedDetails, favorite: !this.#film.isFavorite };
        break;
      default:
        throw new Error('Unknown state!');
    }

    this.#handleControlsClick(updatedDetails);
  };

  #putHandlers = () => {
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#handleCloseClick);

    this.element.querySelector('.film-details__controls')
      .addEventListener('click', this.#controlsClickHandler);

    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('change', this.#emotionChangeHandler);

    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputHandler);

    this.element.querySelectorAll('.film-details__comment-delete')
      .forEach((button) => button.addEventListener('click', this.#commentDeleteClickHandler));

    this.element.addEventListener('scroll', this.#scrollHandler);

    document.addEventListener('keydown', this.#commentAddHandler);
  };

  static parseFilmToState(film) {
    return {
      ...film,
      commentEmoji: DEFAULT_COMMENT_EMOJI,
      scrollPosition: null
    };
  }

  static parseStateToFilm(state) {
    const film = {...state};

    delete film.scrollPosition;
    delete film.commentEmoji;

    return film;
  }

  reset(film) {
    this.updateElement(
      PopupView.parseFilmToState(film),
    );
  }

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      comment: evt.target.value
    });
  };

  #scrollHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      scrollTop: evt.target.scrollTop,
    });
  };

  #emotionChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      emotion: evt.target.value,
    });
    this.element.scrollTop = this._state.scrollTop;
  };

  #commentAddHandler = (evt) => {
    if (isEnterPush(evt)) {
      evt.preventDefault();
      const comment = this._state.comment;
      const emotion = this._state.emotion;

      const userComment = {
        comment,
        emotion,
      };

      this.#handleAddComment({comment: userComment, film: this.#film});
      document.removeEventListener('keydown', this.#commentAddHandler);
    }
  };

  #commentDeleteClickHandler = (evt) =>{
    evt.preventDefault();
    this.#handleDeleteClick({id: evt.target.dataset.id, film: this.#film});
  };
}

