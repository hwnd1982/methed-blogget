import PropTypes from 'prop-types';
import style from './Thumbnail.module.css';
import notphoto from './img/notphoto.jpg';

export const Thumbnail = ({thumbnail, title}) => (
  <img className={style.img} src={thumbnail ? thumbnail : notphoto} alt={title} />
);

Thumbnail.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
};
