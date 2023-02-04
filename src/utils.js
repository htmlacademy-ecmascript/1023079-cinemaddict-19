import dayjs from 'dayjs';

export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';

export const isEscPressed = (evt) => evt.code === 'Escape';

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isCtrlPlusEnterPressed = (evt) => evt.ctrlKey && evt.code === 'Enter';
