import {useEffect} from 'react';
import {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postsRequestAsync} from '../../../store/posts/posts';
import {Spinner} from '../../../UI/Spinner';
import style from './List.module.css';
import {Post} from './Post/Post';

export const List = () => {
  const postsData = useSelector(store => store.posts.data);
  const loading = useSelector(store => store.posts.loading);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!endList?.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(postsRequestAsync());
      }
    }, {
      rootMargin: '50px'
    });

    observer.observe(endList?.current);
  }, [endList.current]);

  return (<ul className={style.list}>
    {postsData.map(postData => (<Post key={postData.id} postData={postData} />))}
    {loading ?
      (<li className={style.end}>
        <Spinner />
      </li>) :
      (<li ref={endList} className={style.end} />)}
  </ul>);
};
