/* eslint-disable max-len */
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {postsSlice} from '../../../store/posts/postsSlice';
import {SVG} from '../../../UI/SVG';
import style from './Search.module.css';


export const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handlerSubmit = event => {
    event.preventDefault();
    dispatch(postsSlice.actions.request({query}));
    navigate(`/category/search`);
    setQuery('');
  };

  const handlerChange = ({target}) => setQuery(target.value);

  return (
    <form className={style.form} onSubmit={handlerSubmit}>
      <input
        className={style.search}
        type='search'
        onChange={handlerChange}
        value={query}
      />
      <button className={style.button} type='submit' aria-label='Кнопка Искать'>
        <SVG className={style.svg} itemName='Search' />
      </button>
    </form>
  );
};
