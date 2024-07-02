import { moveToFirst } from '../../utils/moveToFirst';
import { GallerySwiper } from '../Swiper/Swiper';
import styles from './event.module.scss';
import common from '../../../styles/_common.module.scss';
import moment from 'moment';

import MyButton from '../ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEvent } from '../../store/events';
import { getCurrentuserData, getIsLogin } from '../../store/users';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import Confirm from '../Confirm/Confirm';
import UserView from '../ui/UserView/UserView';
import Notification from '../ui/Notification/Notification';
import notifications from '../../utils/notificationsList';

const EventInfo = ({ setCurrentModal, eventData, onClose }) => {
  const [isModalActive, setModalActive] = useState(false);
  // const [currentModal, setCurrentModalConfirm] = useState('');
  const dispatch = useDispatch();
  const { title, description, location, dateStart, owner, participants, photos } = eventData;
  const currentUser = useSelector(getCurrentuserData);
  const isLoggedIn = useSelector(getIsLogin);
  const amIMember = eventData.participants.some((u) => u.id === currentUser?.id);
  const ownerFirst = moveToFirst(participants, owner);
  const day = moment.utc(dateStart).format('dddd');
  const date = moment.utc(dateStart).format('D MMMM');
  const time = moment.utc(dateStart).format('HH:mm');

  const isPassed = moment().isAfter(dateStart);

  const setPassed = () => {
    return `${isPassed ? `${styles.event} ${styles.event__passed}` : styles.event}`;
  };

  const handleClose = () => onClose();
  const handleCloseModals = () => {
    setModalActive(false);
    onClose();
  };

  const handleCloseConfirm = () => setModalActive(false);

  const handleJoin = (eventInfo) => {
    const photosArr = eventInfo.photos ? eventInfo.photos : [];
    const newInfo = {
      ...eventInfo,
      participants: eventInfo.participants.concat(currentUser),
      photos: photosArr,
    };
    dispatch(toggleEvent({ payload: newInfo, setNewModal: setCurrentModal }));
  };

  const handleLeave = (eventInfo) => {
    const photosArr = eventInfo.photos ? eventInfo.photos : [];
    const newInfo = {
      ...eventInfo,
      participants: eventInfo.participants.filter((i) => i.id !== currentUser.id),
      photos: photosArr,
    };
    dispatch(toggleEvent({ payload: newInfo, setNewModal: handleCloseModals, isJoin: false }));
  };

  const handleChangeModal = (data) => setCurrentModal(data);

  return (
    <div className={setPassed()}>
      {isModalActive && (
        <Modal setActive={setModalActive}>
          <Confirm onLeave={() => handleLeave(eventData)} onClose={handleCloseConfirm} />
        </Modal>
      )}
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
            <UserView key={p.id} name={p.username} isOwner={p.id === owner.id} />
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
      {!isPassed && (
        <>
          {isLoggedIn ? (
            <>
              {amIMember ? (
                <div className={styles.event__notice}>
                  Вы присоединились к событию. Если передумали, можете
                  <button onClick={() => setModalActive(true)}>отменить участие.</button>
                </div>
              ) : (
                <MyButton classes={styles.event__join} onClick={() => handleJoin(eventData)}>
                  Присоединиться к событию
                </MyButton>
              )}
            </>
          ) : (
            <div className={styles.event__notice}>
              <button onClick={() => handleChangeModal('login')}>Войдите</button>, чтобы присоединиться к событию
            </div>
          )}
        </>
      )}

      <button className={common.modal__btn_close} onClick={handleClose}></button>
    </div>
  );
};

export default EventInfo;
