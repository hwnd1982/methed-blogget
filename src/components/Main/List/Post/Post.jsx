import style from './Post.module.css';
import PropTypes from 'prop-types';
import Rating from './Rating';
import {Content} from './Content/Content';
import {Delete} from './Delete/Delete';
import {PostDate} from './PostDate/PostDate';
import {Thumbnail} from './Thumbnail/Thumbnail';

export const Post = ({postData}) => {
  const {id, title, ups, date, thumbnail, author, selftext} = postData;

  return (
    <li className={style.post}>
      <Thumbnail title={title} thumbnail={thumbnail} />
      <Content id={id} title={title} author={author} selftext={selftext} />
      <Rating ups={ups} place='Post'/>
      <PostDate date={date}/>
      <Delete />
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
