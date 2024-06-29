import { moveToFirst } from '../../utils/moveToFirst';
import { GallerySwiper } from '../Swiper/Swiper';
import styles from './event.module.scss';
import common from '../../../styles/_common.module.scss';
import moment from 'moment';
import Notification from '../ui/Notification/Notification';
import notifications from '../../utils/notificationsList';

const EventInfo = ({ eventData, onClose }) => {
  const { title, description, location, dateStart, owner, participants, photos } = eventData;
  const ownerFirst = moveToFirst(participants, owner);
  const day = moment.utc(dateStart).format('dddd');
  const date = moment.utc(dateStart).format('D MMMM');
  const time = moment.utc(dateStart).format('HH:mm');

  const isPassed = moment().isAfter(dateStart);

  const setPassed = () => {
    return `${isPassed ? `${styles.event} ${styles.event__passed}` : styles.event}`;
  };

  const handleClose = () => onClose();

  return (
    <div className={setPassed()}>
      <h2 className={styles.event__title}>{title}</h2>
      {isPassed && <Notification text={notifications.eventPassed} classes={styles.event__notification} />}
      <div className={styles.event__info}>
        <div className={styles.event__adress}>
          <div className={styles.event__time}>
            <div>{day}</div>
            <div>{date}</div>
            <div>{time}</div>
          </div>
          <div className={styles.event__location}>{location}</div>
        </div>
        <div className={styles.event__descr}>{description}</div>
      </div>
      <div className={`${styles.event__participants} ${styles.participants}`}>
        <h3>Участники</h3>
        <div className={styles.participants__list}>
          {ownerFirst.map((p) => (
            <div key={p.id}>{p.id === owner.id ? `${p.username} - организатор` : p.username}</div>
          ))}
        </div>
      </div>
      <div className={`${styles.event__gallery} ${styles.gallery}`}>
        <div className={styles.gallery__header}>
          <h3>Галерея</h3>
          <div className={styles.gallery__btns}>
            <button className={` ${common.nav__btn} ${common.swiper__btn_prev}`}></button>
            <button className={` ${common.nav__btn} ${common.swiper__btn_next}`}></button>
          </div>
        </div>
        <div className={styles.gallery__slider}>
          <GallerySwiper elements={photos} />
        </div>
      </div>
      {!isPassed && <div className={styles.event__enter}>принять</div>}
      <button className={common.modal__btn_close} onClick={handleClose}></button>
    </div>
  );
};

export default EventInfo;
