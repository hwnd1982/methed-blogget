import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import {Text} from '../../../UI/Text';
import {PostDate} from '../../Main/List/Post/PostDate/PostDate';
import Rating from '../../Main/List/Post/Rating';
import style from './Comments.module.css';

export const Comments = ({comments}) => (
    comments.length ?
      <ul className={style.list}>
        { comments.map(({id, author, body, date, ups}) => (
          <li key={id} className={style.item}>
            <Text As='h3' className={style.author} size={18} tsize={22}>{author}</Text>
            <Markdown className={style.comment}>
              {body}
            </Markdown>

            <div className={style.state}>
              <Rating ups={ups} place='Comment'/>
              <PostDate date={date} />
            </div>
          </li>
        ))
        }
      </ul> :
      <Text As='h3' className={style.author} size={18} tsize={22}>Нет комментариев</Text>
);

Comments.propTypes = {
  comments: PropTypes.array,
};
