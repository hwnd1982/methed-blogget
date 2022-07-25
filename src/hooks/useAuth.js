import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteToken} from '../store/token/token';
import {authLogout, authRequestAsync} from '../store/auth/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth.data);
  const token = useSelector(store => store.token.token);
  const loading = useSelector(store => store.auth.loading);

  const logout = () => {
    dispatch(deleteToken());
    dispatch(authLogout());
  };

  useEffect(() => {
    if (!token) return;

    dispatch(authRequestAsync());
  }, [token]);


  return [auth, loading, logout];
};
