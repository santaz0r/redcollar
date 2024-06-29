import { useSelector } from 'react-redux';
import { useState } from 'react';

import Modal from '../Modal/Modal';
import CheckEmailForm from '../form/CheckEmailForm';
import Rclogo from '../../../assets/rclogo.svg';
import styles from './header.module.scss';
import common from '../../../styles/_common.module.scss';
import { getCurrentuserData, getIsLogin } from '../../store/users';
import UserProfiler from '../UserProfile/UserProfiler';

const Header = ({ today, handleNext, handlePrev }) => {
  const isLoggin = useSelector(getIsLogin);
  const currentUser = useSelector(getCurrentuserData);
  console.log(isLoggin, currentUser);
  const [isModalActive, setIsModalActive] = useState(false);
  // const [currentModal, setCurrentModal] = useState<'register' | 'login'>('register');
  const month = today.format('MMMM');
  const handleClick = () => {
    setIsModalActive(true);
  };

  const handleModalClose = () => setIsModalActive(false);
  return (
    <header className={styles.header}>
      <div className={styles.header__item}>
        <div className={styles.header__logo}>
          <Rclogo />
        </div>
        <div className={styles.header__name}>red collar</div>
        <div className={styles.header__app}>
          planner <span>event</span>
        </div>
      </div>
      <div className={styles.header__item}>
        <div className={styles.header__month_nav}>
          <div className={styles.header__month}>{month}</div>
          <button onClick={handlePrev} className={`${styles.header__btn} ${common.nav__btn}`}></button>
          <button onClick={handleNext} className={`${styles.header__btn} ${common.nav__btn}`}></button>
        </div>
        {isLoggin ? (
          <UserProfiler />
        ) : (
          // currentUser.username
          <button onClick={handleClick} className={styles.auth__btn}>
            Войти
          </button>
        )}
      </div>
      {isModalActive && (
        <Modal setActive={setIsModalActive}>
          <CheckEmailForm onClose={handleModalClose} setActive={setIsModalActive} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
