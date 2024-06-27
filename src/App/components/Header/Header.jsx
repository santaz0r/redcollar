import rclogo from '../../../assets/rclogo.svg';

import styles from './header.module.scss';
import common from '../../../styles/_common.module.scss';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import CheckEmailForm from '../form/CheckEmailForm';

const Header = ({ today, handleNext, handlePrev }) => {
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
          <img src={rclogo} alt="red collar logo" />
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

        <button onClick={handleClick} className={styles.auth__btn}>
          Войти
        </button>
      </div>
      {isModalActive && (
        <Modal setActive={setIsModalActive}>
          <CheckEmailForm onClose={handleModalClose} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
