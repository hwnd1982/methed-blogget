import style from './Post.module.css';
import PropTypes from 'prop-types';
import notphoto from './img/notphoto.jpg';
import Rating from './Rating';
import {Content} from './Content/Content';
import {Delete} from './Delete/Delete';
import {PostDate} from './PostDate/PostDate';

export const Post = ({postData}) => {
  const {title, author, ups, date} = postData;

  return (
    <li className={style.post}>
      <img className={style.img} src={notphoto} alt={title} />
      <Content title={title} author={author} />
      <Rating ups={ups}/>
      <PostDate date={date}/>
      <Delete />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
