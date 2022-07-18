import style from './Logo.module.css';
import {SVG} from '../../../UI/SVG/SVG';

export const Logo = () => (
  <a className={style.link} href='#'>
    <SVG itemName='Logo'/>
  </a>
);
