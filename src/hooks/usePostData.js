import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {postRequestAsync} from '../store/post/post';

export const usePostData = id => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(store => store.token.token);
  const post = useSelector(store => store.post.data);
  const comments = useSelector(store => store.post.comments);
  const loading = useSelector(store => store.post.loading);
  const {error} = useSelector(store => store.post.error);

  useEffect(() => {
    if (!token) return;

    dispatch(postRequestAsync(id));
  }, [token]);

  useEffect(() => {
    console.log(error);
    if (error === 400 || error === 404) {
      navigate('/error');
    }
  }, [error]);

  return [post, comments, loading, token];
};
