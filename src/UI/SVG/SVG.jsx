import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as Logo} from './svg/logo.svg';
import {ReactComponent as Auth} from './svg/auth.svg';
import {ReactComponent as Search} from './svg/search.svg';
import {ReactComponent as Top} from './svg/top.svg';
import {ReactComponent as Home} from './svg/home.svg';
import {ReactComponent as Hot} from './svg/hot.svg';
import {ReactComponent as Best} from './svg/best.svg';
import {ReactComponent as Arrow} from './svg/arrow.svg';
import {ReactComponent as Delete} from './svg/delete.svg';
import {ReactComponent as Up} from './svg/up.svg';
import {ReactComponent as Down} from './svg/down.svg';

const SVGCollection = {
  Logo,
  Auth,
  Search,
  Top,
  Home,
  Hot,
  Best,
  Arrow,
  Delete,
  Up,
  Down,
};

export const SVG = ({itemName, className, width, height}) => {
  const Item = SVGCollection[itemName];
  return <Item className={className} width={width} height={height} />;
};

SVG.propTypes = {
  itemName: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
