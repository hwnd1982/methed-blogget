import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postRequestAsync} from '../store/post/post';

export const usePostData = id => {
  const dispatch = useDispatch();
  const token = useSelector(store => store.token.token);
  const post = useSelector(store => store.post.data);
  const comments = useSelector(store => store.post.comments);
  const loading = useSelector(store => store.post.loading);

  useEffect(() => {
    if (!token) return;

    dispatch(postRequestAsync(id));
  }, [token]);

  return [post, comments, loading];
};
