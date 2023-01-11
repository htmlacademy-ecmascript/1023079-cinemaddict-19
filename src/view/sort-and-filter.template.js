import { SortType } from '../framework/render';

export const createFilterTemplate = () => (
  `<div>
    <nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    </nav>

    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active data-sort-type-${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button data-sort-type-${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button data-sort-type-${SortType.RATING}">Sort by rating</a></li>
    </ul>
</div>`
);
