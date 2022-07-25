import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postsRequestAsync} from '../store/posts/posts';

export const usePosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(store => store.posts.data);
  const token = useSelector(store => store.token.token);
  const loading = useSelector(store => store.posts.loading);

  useEffect(() => {
    if (!token) return;

    dispatch(postsRequestAsync());
  }, [token]);

  return [posts, loading];
};
