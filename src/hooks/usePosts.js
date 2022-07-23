import {useState} from 'react';
import {useEffect} from 'react';
import {URL_API} from '../api/const';
import {useSelector} from 'react-redux';

export const usePosts = () => {
  const token = useSelector(store => store.token);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${URL_API}/best`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (response.status === 401) throw new Error(response.status);

      const {data: {children: data}} = await response.json();
      const postsData = data.map(({data: {id, title, selftext, thumbnail, author, ups, created}}) =>
        ({
          id,
          title,
          selftext,
          thumbnail: /^https:\/\//.test(thumbnail) ? thumbnail.replace(/\?.*$/, '') : '',
          author,
          ups,
          date: created
        }));

      // console.log(postsData);
      setPosts(postsData);
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
