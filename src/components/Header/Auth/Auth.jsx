import style from './Auth.module.css';
import PropTypes from 'prop-types';
import {SVG} from '../../../UI/SVG';

export const Auth = ({auth}) => (
  <button className={style.button} aria-label='Авторизация'>
    {auth ? auth : <SVG className={style.svg} itemName='Auth' />}
  </button>
);

Auth.propTypes = {
  auth: PropTypes.bool
};
