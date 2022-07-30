import style from './Logo.module.css';
import {SVG} from '../../../UI/SVG/SVG';
import {Link} from 'react-router-dom';

export const Logo = () => (
  <Link to={`/`} className={style.link} href='/'>
    <SVG itemName='Logo'/>
  </Link>
);
