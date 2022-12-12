import { getRandomArrayElement } from '../render';
import { COMMENTS } from '../mocks/mock';
import { getRandomInt } from '../render';

const COMMENTS_AMOUNT = 40;

export default class CommentsModel {
  getRandomComment = () => getRandomArrayElement(COMMENTS);

  commentsList = Array.from({length: COMMENTS_AMOUNT}, this.getRandomComment);

  getComments() {
    this.commentsList.forEach((comment) => {
      comment.id = getRandomInt(1, 5);
    });

    return this.commentsList;
  }
}
