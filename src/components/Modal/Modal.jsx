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
import {Spiner} from '../../UI/Spiner';
import {useState} from 'react';

export const Modal = ({id, closeModal}) => {
  const [post, comments] = usePostData(id);
  const [myCommentForm, setMyCommentForm] = useState(false);
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const textariaRef = useRef(null);
  const handelClick = ({target}) =>
    (target === overlayRef.current || closeRef.current.contains(target)) && closeModal();
  const handelKey = ({key}) => (key === 'Escape' && closeModal());
  const handleCommentForm = () => {
    if (myCommentForm) return textariaRef.current.focus();

    setMyCommentForm(true);
  };

  useEffect(() => {
    document.addEventListener('keydown', handelKey);
    return () => {
      document.removeEventListener('keydown', handelKey);
    };
  }, []);

  useEffect(() => {
    if (!myCommentForm) return;
    textariaRef.current.focus();
  }, [myCommentForm]);

  return ReactDOM.createPortal((
    <div className={style.overlay} ref={overlayRef} onClick={handelClick}>
      { post ?
        <div className={style.modal}>
          <Text As='h2' className={style.title}>{post.title}</Text>

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
              {post.selftext}
            </Markdown>
          </div>

          <Text As='p' color='orange' className={style.author}>{post.author}</Text>

          <button className={style.btn} onClick={handleCommentForm}>Добавить комментарий</button>

          <div className={style.closeWrap}>
            <button className={style.close} ref={closeRef}>
              <SVG itemName='Close'/>
            </button>
          </div>

          <Comments comments={comments} />
          {myCommentForm && <FormComment textariaRef={textariaRef} />}
        </div> :
        <Spiner />
      }
    </div>
  ), document.getElementById('modal-root'));
};

Modal.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  selftext: PropTypes.string,
  closeModal: PropTypes.func,
};
