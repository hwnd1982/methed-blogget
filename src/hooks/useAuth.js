import {useState, useEffect} from 'react';
import {URL_API} from '../api/const';
import {useDispatch, useSelector} from 'react-redux';
import {deleteToken} from '../store';

export const useAuth = () => {
  const token = useSelector(store => store.token);
  const dispatch = useDispatch();
  const [auth, setAuth] = useState({});

  const clearAuth = () => {
    setAuth({});
    dispatch(deleteToken());
  };

  const fetchAuth = async () => {
    try {
      const response = await fetch(`${URL_API}/api/v1/me`, {
        headers: {
          Authorization: `bearer ${token}`
        },
      });

      if (response.status === 401) throw new Error(response.status);

      const data = await response.json();
      const {subreddit: {title: name}, 'icon_img': iconImg} = data;
      const img = iconImg.replace(/\?.*$/, '');

      setAuth({name, img});
    } catch (err) {
      console.warn(err);
      clearAuth();
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchAuth();
  }, [token]);

  return [auth, clearAuth];
};
