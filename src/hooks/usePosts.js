import {useContext, useState} from 'react';
import {useEffect} from 'react';
import {URL_API} from '../api/const';
import {tokenContext} from '../context/tokenContext';


export const usePosts = () => {
  const {token} = useContext(tokenContext);
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${URL_API}/best`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const data = await response.json();
      const postData = data.data.children.map(({data: {title, thumbnail, author, ups, created}}) =>
        ({
          title,
          thumbnail: /^https:\/\//.test(thumbnail) ? thumbnail.replace(/\?.*$/, '') : '',
          author,
          ups,
          date: created
        }));
      // console.log(data.data.children);

      setPosts(postData);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchPosts();
  }, [token]);

  return [posts];
};
