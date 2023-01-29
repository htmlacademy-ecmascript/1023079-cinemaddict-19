import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable{
  #comments = null;

  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get comments() {
    return this.#comments;
  }

  addComment(updateType, update) {
    this.#comments = [
      update.comment,
      ...this.#comments,
    ];
    this._notify(updateType, update.film);
  }

  deleteComment(updateType, update) {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = this.#comments.filter((comment) => comment.id !== update.id);
    this._notify(updateType, update.film);
  }
}
