import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useParams} from 'react-router-dom';
import {notificationError} from '../../../store/notification/notification';
import {postsRequestAsync} from '../../../store/posts/posts';
import {Spinner} from '../../../UI/Spinner';
import {End} from './End/End';
import style from './List.module.css';
import {Post} from './Post/Post';

export const List = () => {
  const token = useSelector(store => store.token.token);
  const postsData = useSelector(store => store.posts.data);
  const loading = useSelector(store => store.posts.loading);
  const isLast = useSelector(store => store.posts.isLast);

  const dispatch = useDispatch();
  const {page} = useParams();

  useEffect(() => {
    if (!token) {
      dispatch(notificationError('Необходимо авторизоваться на странице.'));
      return;
    }

    dispatch(postsRequestAsync(page));
  }, [page]);

  return (
    <>
      <ul className={style.list}>
        {postsData.map(postData => (<Post key={postData.id} postData={postData} />))}
        {loading &&
          <li className={style.end}>
            <Spinner />
          </li>
        }
        {!isLast && (
          postsData.length < 50 ?
            <End /> :
            <li className={style.end}>
              <button className={style.btn} onClick={() => dispatch(postsRequestAsync())}>Загрузить еще...</button>
            </li>)
        }
      </ul>
      <Outlet />
    </>);
};
