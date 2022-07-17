import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Text.module.css';

export const Text = props => {
  const {
    As = 'span',
    color = 'black',
    center,
    size,
    tsize,
    dsize,
    className,
    children,
    href,
  } = props;

  const classes = classNames(
    className,
    style[color],
    {[style.center]: center},
    {[style[`fs${size}`]]: size},
    {[style[`fst${tsize}`]]: tsize},
    {[style[`fsd${dsize}`]]: dsize},
  );

  return <As className={classes} href={href}>{children}</As>;
};

Text.propTypes = {
  As: PropTypes.string,
  color: PropTypes.string,
  center: PropTypes.bool,
  href: PropTypes.string,
  size: PropTypes.number,
  tsize: PropTypes.number,
  dsize: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};
