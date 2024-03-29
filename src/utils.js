import dayjs from 'dayjs';
import { UserRank, UserRankLimit } from './consts.js';

export const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';

export const isEscPressed = (evt) => evt.code === 'Escape';

export const isCtrlPlusEnterPressed = (evt) => evt.ctrlKey && evt.code === 'Enter';

export const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins - hours * 60;
  return `${hours }h ${ minutes }m`;
};

export const getCommentTime = (date) => dayjs(date).format('YYYY/M/D H:m');

export const makeUserRank = (watchedFilmsCount) => {
  if (!watchedFilmsCount) {
    return null;
  }

  if (watchedFilmsCount <= UserRankLimit.NOVICE) {
    return UserRank.NOVICE;
  }

  if (watchedFilmsCount <= UserRankLimit.FAN) {
    return UserRank.FAN;
  }

  return UserRank.MOVIE_BUFF;
};

