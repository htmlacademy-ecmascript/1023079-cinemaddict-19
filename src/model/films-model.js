import { getRandomFilms } from '../utils/utils.js';
import { mockFilms } from '../mocks/mock.js';
import Observable from '../framework/observable.js';
import { FILM_COUNT } from '../consts.js';


export default class FilmsModel extends Observable {
  #films = getRandomFilms(mockFilms, FILM_COUNT);

  get films() {
    return this.#films;
  }

  updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === film.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
