import ReactDOM from 'react-dom';
import classNames from 'classnames';
import style from './Notifications.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {notificationClose} from '../../store/notification/notification';

export const Notifications = () => {
  const dispatch = useDispatch();
  const errors = useSelector(store => store.notification.errors);
  const successes = useSelector(store => store.notification.successes);
  const errorClasses = classNames(
    style['bottom-right'],
    style['notify'],
    style['do-show']
  );
  const successClasses = classNames(
    style['bottom-left'],
    style['notify'],
    style['do-show']
  );

  return (ReactDOM.createPortal(
    <>
      <div className={style.error}>
        {errors.map(({id, message}) => (
          <div
            key={id}
            onClick={() => {
              dispatch(notificationClose(id));
            }}
            className={errorClasses}
            data-notification-status='error'
          >
            {`${message}`}
          </div>
        ))}
      </div>
      <div className={style.success}>
        {successes.map(({id, message}) => (
          <div
            key={id}
            onClick={() => {
              dispatch(notificationClose(id));
            }}
            className={successClasses}
            data-notification-status='success'
          >
            {`${message}`}
          </div>
        ))}
      </div>
    </>, document.getElementById('notifications-root')
  ));
};
