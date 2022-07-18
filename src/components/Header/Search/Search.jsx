/* eslint-disable max-len */
import {SVG} from '../../../UI/SVG';
import style from './Search.module.css';

export const Search = () => (
  <form className={style.form}>
    <input className={style.search} type='search'/>
    <button className={style.button} type='submit' aria-label='Кнопка Искать'>
      <SVG className={style.svg} itemName='Search' />
    </button>
  </form>
);
