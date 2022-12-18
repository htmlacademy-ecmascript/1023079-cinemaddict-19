import { render } from '../render.js';
import FilterView from '../view/sort-and-filter-view.js';
import FilmContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import UserProfileView from '../view/user-profile-view.js';
import PopupView from '../view/popup-view.js';


export default class FilmPresenter {
  #container;
  #header;
  #body;
  #filmsModel;
  #commentModel;
  #films;
  #comments;

  constructor(mainContainer, headerContainer, bodyContainer, filmsModel, commentsModel) {
    this.#container = mainContainer;
    this.#header = headerContainer;
    this.#body = bodyContainer;
    this.#filmsModel = filmsModel;
    this.#commentModel = commentsModel;
  }

  init() {
    const filmContainer = new FilmContainerView();
    this.#films = this.#filmsModel.films;
    this.#comments = this.#commentModel.comments;

    render(new UserProfileView(), this.#header);
    render(new FilterView(), this.#container);
    render(filmContainer, this.#container);
    const filmListContainer = filmContainer.filmListContainer;

    this.#films.forEach((film) => {
      const filmCard = new FilmCardView(film);
      film.commentsCount = this.#comments.filter((comment) => (comment.id === film.id)).length;
      const commentsForPopup = this.#comments.slice(0, 5);
      const popup = new PopupView(commentsForPopup);

      const filmCardLink = filmCard.element.querySelector('.film-card__link');
      const popupCloseButton = popup.element.querySelector('.film-details__close');

      const showPopup = () => {
        render(popup, this.#body);
      };

      const hidePopup = () => {
        popup.element.remove();
        //Почему наш встроенные метод removeElement() не работает?
      };

      const escKeyDownHandler = (evt) => {
        if(evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          hidePopup();
          document.removeEventListener('keydown', escKeyDownHandler);
        }
      };

      filmCardLink.addEventListener('click', () => {
        showPopup();
        this.#body.classList.add('.hide-overflow');
        document.addEventListener('keydown', escKeyDownHandler);
      });

      popupCloseButton.addEventListener('click', () => {
        hidePopup();
        this.#body.classList.remove('.hide-overflow');
        document.removeEventListener('keydown', escKeyDownHandler);
      });

      render(filmCard, filmListContainer);
    });

    render(new ShowMoreButtonView(), this.#container);


  }
}
