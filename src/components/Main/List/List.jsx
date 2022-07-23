import {useContext} from 'react';
import {postsContext} from '../../../context/postsContext';
import style from './List.module.css';
import {Post} from './Post/Post';

export const List = () => {
  const postsData = useContext(postsContext);

  return (
    <ul className={style.list}>
      {postsData.map(postData => (<Post key={postData.id} postData={postData} />))}
    </ul>
  );
};
