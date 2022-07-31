/* eslint-disable max-len */
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {searchRequest} from '../../../store/search/search';
import {SVG} from '../../../UI/SVG';
import style from './Search.module.css';


export const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const handlerSubmit = event => {
    event.preventDefault();
    dispatch(searchRequest(search));
  };

  const handlerChange = ({target}) => setSearch(target.value);

  return (
    <form className={style.form} onSubmit={handlerSubmit}>
      <input
        className={style.search}
        type='search'
        onChange={handlerChange}
        value={search}
      />
      <button className={style.button} type='submit' aria-label='Кнопка Искать'>
        <SVG className={style.svg} itemName='Search' />
      </button>
    </form>
  );
};
