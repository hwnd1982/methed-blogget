import {useDispatch} from 'react-redux';
import {Outlet, useParams} from 'react-router-dom';
import {usePosts} from '../../../hooks/usePosts';
import { postsSlice } from '../../../store/requests/postsSlice';
// import {postsRequestAsync} from '../../../store/posts/posts';
import {Spinner} from '../../../UI/Spinner';
import {End} from './End/End';
import style from './List.module.css';
import {Post} from './Post/Post';

export const List = () => {
  const {page} = useParams();
  const dispatch = useDispatch();
  const {posts, loading, isLast} = usePosts(page);

  return (
    <>
      <ul className={style.list}>
        {posts.map(postData => (<Post key={postData.id} postData={postData} />))}
        {loading &&
          <li className={style.end}>
            <Spinner />
          </li>
        }
        {!isLast && (
          posts.length < 50 ?
            <End /> :
            <li className={style.end}>
              <button className={style.btn} onClick={() => dispatch(postsSlice.actions.request())}>Загрузить еще...</button>
            </li>)
        }
      </ul>
      <Outlet />
    </>);
};
