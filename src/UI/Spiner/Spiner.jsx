import style from './Spiner.module.css';
import classNames from 'classnames';

export const Spiner = () => (
  <div className={classNames(style['sk-circle-bounce'])}>
    <div className={classNames(style['sk-child'], style['sk-circle-1'])}></div>
    <div className={classNames(style['sk-child'], style['sk-circle-2'])}></div>
    <div className={classNames(style['sk-child'], style['sk-circle-3'])}></div>
    <div className={classNames(style['sk-child'], style['sk-circle-4'])}></div>
    <div className={classNames(style['sk-child'], style['sk-circle-5'])}></div>
    <div className={classNames(style['sk-child'], style['sk-circle-6'])}></div>
    <div className={classNames(style['sk-child'], style['sk-circle-7'])}></div>
    <div className={classNames(style['sk-child'], style['sk-circle-8'])}></div>
    <div className={classNames(style['sk-child'], style['sk-circle-9'])}></div>
    <div className={classNames(style['sk-child'], style['sk-circle-10'])}></div>
    <div className={classNames(style['sk-child'], style['sk-circle-11'])}></div>
    <div className={classNames(style['sk-child'], style['sk-circle-12'])}></div>
  </div>
);


