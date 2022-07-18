import PropTypes from 'prop-types';
import {useState} from 'react';
import {assignId} from '../../../utils/generateRandomId';
import style from './Tabs.module.css';
import {useEffect} from 'react';
import {debounceRaf} from '../../../utils/debounce';
import {SVG} from '../../../UI/SVG';

const LIST = [
  {value: 'Главные', Icon: 'Home'},
  {value: 'Топ', Icon: 'Top'},
  {value: 'Лучшие', Icon: 'Best'},
  {value: 'Горячие', Icon: 'Hot'},
].map(assignId);

export const Tabs = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [list] = useState(LIST);
  const [menuItem, setMenuItem] = useState(list[0].value);

  const handlerResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsDropdown(true);
    } else {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    const debounceResize = debounceRaf(handlerResize);
    handlerResize();
    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  return (
    <div className={style.container}>
      {isDropdown && <div className={style.wrapperBtn}>
        <button className={style.btn} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {menuItem}
          <SVG width={15} height={15} itemName='Arrow' />
        </button>
      </div>}

      {(isDropdownOpen || !isDropdown) && (<ul className={style.list}>
        {list.map(({id, value, Icon}) => (
          <li className={style.item} key={id} onClick={() => {
            setIsDropdownOpen(false);
          }}>
            <button
              className={style.btn}
              onClick={() => setMenuItem(value)}
            >
              {value}
              {Icon && <SVG itemName={Icon} width={25} height={25} />}
            </button>
          </li>
        ))}
      </ul>)}
    </div>
  );
};

Tabs.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
};
