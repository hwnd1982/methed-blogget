import style from './List.module.css';
import {Post} from './Post/Post';

export const List = () => {
  const postsData = [
    {
      thumbnail: '',
      title: 'Title I',
      author: 'Nickname I',
      ups: 24,
      date: '2022-02-25T09:40:00.000Z',
    },
    {
      thumbnail: '',
      title: 'Title II',
      author: 'Nickname II',
      ups: 34,
      date: '2022-02-26T09:40:00.000Z',
    },
    {
      thumbnail: '',
      title: 'Title III',
      author: 'Nickname II',
      ups: 51,
      date: '2022-02-27T09:40:00.000Z',
    },
    {
      thumbnail: '',
      title: 'Title IV',
      author: 'Nickname III',
      ups: 175,
      date: '2022-02-28T09:40:00.000Z',
    },
    {
      thumbnail: '',
      title: 'Title V',
      author: 'Nickname IV',
      ups: 11,
      date: '2022-02-29T09:40:00.000Z',
    }
  ];

  return (
    <ul className={style.list}>
      {postsData.map((postData, index) => (<Post key={index} postData={postData} />))}
    </ul>
  );
};
