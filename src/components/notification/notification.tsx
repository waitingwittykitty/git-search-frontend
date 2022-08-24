import clsx from 'clsx';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../button/button';
import {
  dismiss,
  selectNotificationDescription,
  selectNotificationDuration,
  selectNotificationOpened,
  selectNotificationTitle,
} from './notification-reducer';

import './notification.scss';

function NotificationContainer() {
  const title = useAppSelector(selectNotificationTitle);
  const description = useAppSelector(selectNotificationDescription);
  const opened = useAppSelector(selectNotificationOpened);
  const duration = useAppSelector(selectNotificationDuration);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        dispatch(dismiss());
      }, duration);
    }
  }, [dispatch, opened, duration]);

  const handleDismiss = () => {
    dispatch(dismiss());
  };

  return (
    <div className={clsx('notification-container', { opened })}>
      <div className="notification-content">
        <Button className="close" onClick={handleDismiss}>
          X
        </Button>

        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default NotificationContainer;
