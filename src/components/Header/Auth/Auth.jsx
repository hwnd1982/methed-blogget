import style from './Auth.module.css';
import {SVG} from '../../../UI/SVG';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useState, useContext} from 'react';
import {authContext} from '../../../context/authContext';


export const Auth = () => {
  const {auth, clearAuth} = useContext(authContext);
  const [logout, setLogout] = useState(false);

  return (
    <div className={style.container}>
      {auth.name ?
        <div>
          <button className={style.btn} onClick={() => setLogout(!logout)}>
            <img className={style.img} src={auth.img} title={auth.name} alt={`Аватар: ${auth.name}`}/>
          </button>
          {logout ?
            <button className={style.logout} onClick={() => {
              clearAuth();
            }}>Выйти</button> :
            <Text className={style.logout}>{auth.name}</Text>
          }
        </div> :
      <Text As='a' className={style.authLink} href={urlAuth}>
        <SVG className={style.svg} itemName='Auth' />
      </Text>
      }
    </div>
  );
};
