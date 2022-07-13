import style from './PostDate.module.css';
import PropTypes from 'prop-types';
import formatDate from '../../../../../utils/formatDate';

export const PostDate = ({date}) => {
  console.log(style);
  return (
    <time className={style.date} dateTime={date}>{formatDate(date)}</time>
  );
};

PostDate.propTypes = {
  date: PropTypes.date,
};
