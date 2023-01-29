import { getRandomFilms } from '../utils/utils.js';
import { mockFilms } from '../mocks/mock.js';
import Observable from '../framework/observable.js';

const FILM_COUNT = 17;

export default class FilmsModel extends Observable {
  #films = getRandomFilms(mockFilms, FILM_COUNT);

  get films() {
    return this.#films;
  }

  updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === film.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addFilm(updateType, update) {
    this.#films = [
      update,
      ...this.#films,
    ];

    this._notify(updateType, update);
  }

  deleteFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
