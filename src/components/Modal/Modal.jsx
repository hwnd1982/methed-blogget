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

export const Modal = ({id, closeModal}) => {
  const [post, comments] = usePostData(id);
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const handelClick = ({target}) =>
    (target === overlayRef.current || closeRef.current.contains(target)) && closeModal();
  const handelKey = ({key}) => (key === 'Escape' && closeModal());

  useEffect(() => {
    document.addEventListener('keydown', handelKey);
    return () => {
      document.removeEventListener('keydown', handelKey);
    };
  }, []);

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
          <div className={style.closeWrap}>
            <button className={style.close} ref={closeRef}>
              <SVG itemName='Close'/>
            </button>
          </div>

          <Comments comments={comments} />
          <FormComment />
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
