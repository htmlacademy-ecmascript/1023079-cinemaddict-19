import dayjs from 'dayjs';
import { UserRank, UserRankLimit } from './consts.js';

export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';

export const isEscPressed = (evt) => evt.code === 'Escape';

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isCtrlPlusEnterPressed = (evt) => evt.ctrlKey && evt.code === 'Enter';

export const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins - hours * 60;
  return `${hours }h ${ minutes }m`;
};

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

