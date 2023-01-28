import { getRandomFilms } from '../utils.js';
import { mockFilms } from '../mocks/mock.js';
import Observable from '../framework/observable.js';

const FILM_COUNT = 17;

export default class FilmsModel extends Observable {
  #films = getRandomFilms(mockFilms, FILM_COUNT);

  get films() {
    return this.#films;
  }
}
