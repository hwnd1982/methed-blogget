import {Text} from '../../../UI/Text';
import style from './Home.module.css';

export const Home = () => {
  console.log(style);
  return (
    <div className={style.content}>
      <Text As='h1' size={18} tsize={26} center>Стартовая страница</Text>
      <Text As='p' center>Добро пожаловать!</Text>
      <Text As='p' center>Выберите категорию</Text>
    </div>
  );
};
