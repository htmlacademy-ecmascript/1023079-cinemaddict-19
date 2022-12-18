import { getRandomFilms } from '../utils.js';
import { mockFilms } from '../mocks/mock.js';

const FILM_COUNT = 5;

export default class FilmsModel {
  #films = getRandomFilms(mockFilms, FILM_COUNT);

  getFilms() {
    return this.#films;
  }
}
