import {useContext, useState} from 'react';
import {useEffect} from 'react';
import {URL_API} from '../api/const';
import {tokenContext} from '../context/tokenContext';


export const usePostData = id => {
  const {token} = useContext(tokenContext);
  const [post, setPost] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${URL_API}/comments/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (response.status === 401) throw new Error(response.status);

      const [{data: {children: [{data: post}]}}, {data: {children: comments}}] = await response.json();
      const postData = {
        id: post.id,
        title: post.title,
        selftext: post.selftext,
        thumbnail: /^https:\/\//.test(post.thumbnail) ? post.thumbnail.replace(/\?.*$/, '') : '',
        author: post.author,
        ups: post.ups,
        date: post.created
      };
      const commentsData = comments
        .map(({data: {id, author, body, created, ups}}) => ({id, author, body, date: created, ups}))
        .filter(comment => comment.author && comment.author !== '[deleted]' && comment.body !== '[removed]');

      // console.log(postData, commentsData);
      setPost([postData, commentsData]);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchPosts();
  }, [token]);

  return post;
};
