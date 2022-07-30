import style from './Content.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text';
import {Link, useParams} from 'react-router-dom';

export const Content = ({id, title, author}) => {
  const {page} = useParams();

  return (
    <div className={style.content}>
      <Text As='h2' className={style.title}>
        <Link to={`/category/${page}/post/${id}`} >
          <Text
            className={style.linkPost}
            size={18}
            tsize={26}
            dsize={32}
            bold
          >
            {title}
          </Text>
        </Link>
      </Text>
      <Text As="a" size={12} tsize={14} color='orange' className={style.linkAuthor} href={`#${author}`}>{author}</Text>
    </div>);
};

Content.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  selftext: PropTypes.string,
};
