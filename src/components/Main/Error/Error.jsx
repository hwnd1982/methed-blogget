import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Text} from '../../../UI/Text';
import style from './Error.module.css';

export const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => navigate('/'), 5000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={style.content}>
      <Text As='h1' size={18} tsize={26} dsize={32} color='orange' center>404</Text>
    </div>
  );
};
