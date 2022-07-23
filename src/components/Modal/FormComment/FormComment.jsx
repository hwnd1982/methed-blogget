import {useContext, useRef} from 'react';
import {authContext} from '../../../context/authContext';
import {Text} from '../../../UI/Text';
import style from './FormComment.module.css';

export const FormComment = () => {
  const {auth} = useContext(authContext);
  const textareaRef = useRef(null);
  const handelForm = event => {
    event.preventDefault();
    console.log(textareaRef.current.value);
    textareaRef.current.value = '';
  };

  return (
    <form className={style.form} onSubmit={handelForm}>
      <Text As='h3' size={14} tsize={18}>{auth.name}</Text>
      <textarea ref={textareaRef} className={style.textarea}></textarea>
      <button className={style.btn}>Отправить</button>
    </form>
  );
};
