import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import style from './Notifications.module.css';
import {useEffect} from 'react';

export const Notifications = ({children, closeModal}) => {
  const classes = classNames(
    style['bottom-right'],
    style['notify'],
    style['do-show']
  );

  useEffect(() => {
    const id = setTimeout(closeModal, 3000);

    return () => clearTimeout(id);
  }, []);

  return (ReactDOM.createPortal(
    <div
      onClick={closeModal}
      className={classes}
      data-notification-status='error'
    >
      {children}
    </div>, document.getElementById('notifications-root')
  ));
};

Notifications.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};
