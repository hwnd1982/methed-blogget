import style from './Rating.module.css';
import PropTypes from 'prop-types';

export const Rating = ({ups}) => {
  console.log(style);
  return (
    <div className={style.rating}>
      <button className={style.up} aria-label='Повысить рейтинг'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 16.5L12 8.5L20 16.5"
            stroke="#8F8F8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <p className={style.ups}>{ups}</p>
      <button className={style.down} aria-label='Понизить рейтинг'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8L12 16L20 8" stroke="#8F8F8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

Rating.propTypes = {
  ups: PropTypes.number,
};
