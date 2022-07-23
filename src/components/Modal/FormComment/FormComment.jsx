import PropTypes from 'prop-types';
import {useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authContext} from '../../../context/authContext';
import {updateComment} from '../../../store';
import {Text} from '../../../UI/Text';
import style from './FormComment.module.css';

export const FormComment = ({textariaRef}) => {
  const value = useSelector(store => store.comment);
  const dispatch = useDispatch();
  const {auth} = useContext(authContext);
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
