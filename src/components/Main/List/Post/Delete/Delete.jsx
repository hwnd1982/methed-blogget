import {SVG} from '../../../../../UI/SVG';
import style from './Delete.module.css';

export const Delete = () => (
  <button className={style.delete}>
    <SVG itemName='Delete' />
  </button>
);
