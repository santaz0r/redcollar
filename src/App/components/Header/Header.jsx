import { useSelector } from 'react-redux';
import { useState } from 'react';

import Modal from '../Modal/Modal';
import CheckEmailForm from '../form/CheckEmailForm/CheckEmailForm';
import Rclogo from '../../../assets/rclogo.svg';
import { getIsLogin } from '../../store/users';
import UserProfiler from '../UserProfile/UserProfiler';
import CreateEventForm from '../form/CreateEventForm/CreateEventForm';

import styles from './header.module.scss';
import common from '../../../styles/_common.module.scss';
import Congrats from '../Congrats/Congrats';
import moment from 'moment';

const Header = ({ today, handleNext, handlePrev }) => {
  const isLoggin = useSelector(getIsLogin);
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentModal, setCurrentModal] = useState('');

  const [createdEvent, setCreatedEvent] = useState(null);

  const month = moment().isSame(today, 'year') ? today.format('MMMM') : today.format('MMMM YYYY');
  const handleClick = () => {
    setIsModalActive(true);
    setCurrentModal('login');
  };

  const openCreateForm = () => {
    setIsModalActive(true);
    setCurrentModal('create');
  };

  const handleModalClose = () => setIsModalActive(false);
  return (
    <header className={styles.header}>
      <div className={styles.header__item}>
        <div className={styles.header__logo}>
          <Rclogo />
        </div>
        <div className={styles.header__name}>red&nbsp;collar</div>
        <div className={styles.header__app}>
          planner&nbsp;<span>event</span>
        </div>
      </div>
      <div className={styles.header__item}>
        <div className={styles.header__month_nav}>
          <div className={styles.header__month}>{month}</div>
          <button onClick={handlePrev} className={`${styles.header__btn} ${common.nav__btn}`}></button>
          <button onClick={handleNext} className={`${styles.header__btn} ${common.nav__btn}`}></button>
        </div>
        {isLoggin ? (
          <UserProfiler setCurrentModal={openCreateForm} />
        ) : (
          <button onClick={handleClick} className={styles.auth__btn}>
            Войти
          </button>
        )}
      </div>
      {isModalActive && (
        <Modal setActive={setIsModalActive}>
          {currentModal === 'login' && <CheckEmailForm onClose={handleModalClose} setActive={setIsModalActive} />}
          {currentModal === 'create' && (
            <CreateEventForm setCurrentModal={setCurrentModal} onClose={handleModalClose} setEvent={setCreatedEvent} />
          )}
          {currentModal === 'congrats' && (
            <Congrats eventData={createdEvent} onClose={handleModalClose} modalText={'Ура!'} isCreated isUnicorn />
          )}
          {currentModal === 'failed' && (
            <Congrats onClose={handleModalClose} modalText={'Что-то пошло не так'} isFailed />
          )}
        </Modal>
      )}
    </header>
  );
};

export default Header;
