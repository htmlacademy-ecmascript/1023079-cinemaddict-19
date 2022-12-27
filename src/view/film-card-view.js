import AbsractView from '../framework/view/abstract-view.js';
import { createNewFilmCardTemplate } from './film-card-view.template.js';


export default class FilmCardView extends AbsractView{
  #film;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createNewFilmCardTemplate(this.#film);
  }
}
