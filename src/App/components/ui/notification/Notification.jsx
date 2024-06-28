import styles from './notif.module.scss';

import NotifIcon from '../../../../assets/note.svg';

const Notification = ({ text, classes, hasError }) => {
  return (
    <div className={`${styles.notification} ${classes} `}>
      <NotifIcon className={styles.notification__icon} fill={hasError ? 'red' : '#0D0C0C'} />
      <span>{text}</span>
    </div>
  );
};

export default Notification;
