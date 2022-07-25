import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useAuth} from '../../../hooks/useAuth';
import {updateComment} from '../../../store/comment/comment';

import {Text} from '../../../UI/Text';
import style from './FormComment.module.css';

export const FormComment = ({textariaRef}) => {
  const value = useSelector(store => store.comment.comment);
  const dispatch = useDispatch();
  const [auth] = useAuth();
  const handelSubmit = event => {
    event.preventDefault();
    console.log(value);
  };

  const handelChange = ({target}) => dispatch(updateComment(target.value));

  return (
    <form className={style.form} onSubmit={handelSubmit}>
      <Text As='h3' size={14} tsize={18}>{auth.name}</Text>
      <textarea ref={textariaRef} onChange={handelChange} value={value} className={style.textarea}></textarea>
      <button className={style.btn}>Отправить</button>
    </form>
  );
};

FormComment.propTypes = {
  textariaRef: PropTypes.object,
};
