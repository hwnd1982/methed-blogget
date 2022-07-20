import {useState, useEffect, useContext} from 'react';
import {URL_API} from '../api/const';
import {tokenContext} from '../context/tokenContext';

export const useAuth = () => {
  const {token, delToken} = useContext(tokenContext);
  const [auth, setAuth] = useState({});

  const clearAuth = () => {
    setAuth({});
    delToken();
  };

  const fetchAuth = async () => {
    try {
      const response = await fetch(`${URL_API}/api/v1/me`, {
        headers: {
          Authorization: `bearer ${token}`
        },
      });

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
