import styles from './notif.module.scss';

const Notification = ({ text, classes }) => {
  return <div className={`${styles.notification} ${classes}`}>{text}</div>;
};

export default Notification;
