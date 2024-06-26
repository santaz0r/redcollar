import rclogo from '../../../assets/rclogo.svg';

import styles from './header.module.scss';

const Header = ({ today, handleNext, handlePrev }) => {
  const month = today.format('MMMM');

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
          <button onClick={handlePrev} className={styles.header__btn}></button>
          <button onClick={handleNext} className={styles.header__btn}></button>
        </div>

        <button className={styles.auth__btn}>Войти</button>
      </div>
    </header>
  );
};

export default Header;
