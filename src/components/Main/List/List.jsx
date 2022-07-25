import {usePosts} from '../../../hooks/usePosts';
import {Spinner} from '../../../UI/Spinner';
import style from './List.module.css';
import {Post} from './Post/Post';

export const List = () => {
  const [postsData, loading] = usePosts();

  return loading ?
    (<div className={style.spinnerWrap}>
      <Spinner />
    </div>) :
    (<ul className={style.list}>
      {postsData.map(postData => (<Post key={postData.id} postData={postData} />))}
    </ul>);
};
