import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {SVG} from '../../UI/SVG/SVG';
import {Text} from '../../UI/Text';
import style from './Modal.module.css';
import Markdown from 'markdown-to-jsx';
import {useEffect, useRef} from 'react';
import {usePostData} from '../../hooks/usePostData';
import {Comments} from './Comments/Comments';
import {FormComment} from './FormComment/FormComment';
import {Spinner} from '../../UI/Spinner';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {notificationError} from '../../store/notification/notification';

export const Modal = () => {
  const dispatch = useDispatch();
  const {id, page} = useParams();
  const navigate = useNavigate();

  const [post, comments, loading, token] = usePostData(id);
  const [myCommentForm, setMyCommentForm] = useState(false);

  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const textariaRef = useRef(null);

  const handelClick = ({target}) =>
    (target === overlayRef.current || closeRef.current.contains(target)) && navigate(`/category/${page}`);
  const handelKey = ({key}) => (key === 'Escape' && navigate(`/category/${page}`));
  const handleCommentForm = () => {
    if (myCommentForm) return textariaRef.current.focus();

    setMyCommentForm(true);
  };

  useEffect(() => {
    if (!token) {
      navigate(`/category/${page}`);
      dispatch(notificationError('Необходимо авторизоваться на странице.'));
      return;
    }

    document.addEventListener('keydown', handelKey);
    return () => {
      document.removeEventListener('keydown', handelKey);
    };
  }, []);

  useEffect(() => {
    if (!myCommentForm) return;
    textariaRef.current.focus();
  }, [myCommentForm]);

  return ReactDOM.createPortal(
    token &&
      (<div className={style.overlay} ref={overlayRef} onClick={handelClick}>
        {loading ?

          (<div className={style.spinnerWrap}>
            <Spinner width={150} height={150} rmin={3} scalemin={0.3}/>
          </div>) :

          (<div className={style.modal}>
            <Text As='h2' className={style.title}>{post?.title}</Text>
            {post?.selftext && (
              <div className={style.content}>
                <Markdown options={{
                  overrides: {
                    a: {
                      props: {
                        target: '_blank',
                      },
                    },
                  },
                }}>
                  {post?.selftext}
                </Markdown>
              </div>
            )}

            <Text As='p' color='orange' className={style.author}>{post.author}</Text>
            <button className={style.btn} onClick={handleCommentForm}>Добавить комментарий</button>
            <div className={style.closeWrap}>
              <button className={style.close} ref={closeRef} onClick={handelClick}>
                <SVG itemName='Close'/>
              </button>
            </div>
            <Comments comments={comments} />
            {myCommentForm && <FormComment textariaRef={textariaRef} />}
          </div>)
        }
      </div>
      ), document.getElementById('modal-root'));
};

Modal.propTypes = {
  id: PropTypes.string,
  closeModal: PropTypes.func,
};
