import { useSelector } from 'react-redux';
import { getCurrentuserData } from '../../../store/users';

import styles from './event-badge.module.scss';

const EventBadge = ({ isPassed, title, onClick, participants, owner }) => {
  const currentUser = useSelector(getCurrentuserData);
  const amIOwner = owner.id === currentUser?.id;
  const amIMember = participants.some((u) => u.id === currentUser?.id);
  console.log(participants, owner, amIOwner, amIMember);

  return (
    <button onClick={onClick} className={isPassed ? styles.event : `${styles.event} ${styles.event__passed}`}>
      <div className={styles.event__wrapper}>
        {amIMember && !amIOwner && <div className={styles.event__dot}></div>}
        {amIOwner && <div className={styles.event__star}></div>}
        <div className={styles.event__title}>{title}</div>
      </div>
    </button>
  );
};

export default EventBadge;
