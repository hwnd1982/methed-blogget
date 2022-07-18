import style from './PostDate.module.css';
import PropTypes from 'prop-types';
import formatDate from '../../../../../utils/formatDate';
import {Text} from '../../../../../UI/Text';

export const PostDate = ({date}) => (
  <Text As='time' className={style.date} dateTime={date} color='grey99'>{formatDate(date)}</Text>
);

PostDate.propTypes = {
  date: PropTypes.string,
};
