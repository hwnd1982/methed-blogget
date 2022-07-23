import style from './Rating.module.css';
import PropTypes from 'prop-types';
import {SVG} from '../../../../../UI/SVG';
import {Text} from '../../../../../UI/Text';

export const Rating = ({ups, place}) => (
  <div className={style[`rating${place}`]}>
    <button className={style.up} aria-label='Повысить рейтинг'>
      <SVG itemName='Up' />
    </button>
    <Text As='p' size={12} tsize={16} bold className={style.ups} color='grey99'>{ups}</Text>
    <button className={style.down} aria-label='Понизить рейтинг'>
      <SVG itemName='Down' />
    </button>
  </div>
);

Rating.propTypes = {
  ups: PropTypes.number,
  place: PropTypes.string,
};
